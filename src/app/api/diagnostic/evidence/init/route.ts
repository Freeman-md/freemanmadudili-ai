import { NextResponse } from "next/server";

import { config } from "@/server/config";
import { createSignedUploadUrl } from "@/lib/server/storage/client";
import type {
  EvidenceInitPayload,
  EvidenceInitUpload,
} from "@/types";
import {
  MAX_EVIDENCE_FILE_BYTES,
  SIGNED_UPLOAD_URL_TTL_SECONDS,
} from "@/features/diagnostics/constants";
import { isValidSha256 } from "@/features/diagnostics/shared/lib/evidence";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as EvidenceInitPayload | null;

  if (!body?.runId || !Array.isArray(body.files) || body.files.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const uploads: EvidenceInitUpload[] = [];

  for (const file of body.files) {
    if (!file.filename || !file.mimeType || !file.sha256) {
      return NextResponse.json({ error: "Missing file metadata" }, { status: 400 });
    }

    if (!Number.isFinite(file.sizeBytes) || file.sizeBytes <= 0) {
      return NextResponse.json({ error: "Invalid file size" }, { status: 400 });
    }

    if (file.sizeBytes > MAX_EVIDENCE_FILE_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 5MB limit" },
        { status: 413 }
      );
    }

    if (!isValidSha256(file.sha256)) {
      return NextResponse.json({ error: "Invalid sha256" }, { status: 400 });
    }

    const fileId = crypto.randomUUID();
    const storagePath = `diagnostics/${body.runId}/${fileId}`;
    const signed = await createSignedUploadUrl({
      bucket: config.STORAGE_BUCKET,
      path: storagePath,
    });

    uploads.push({
      fileId,
      storageKey: storagePath,
      signedUrl: signed.signedUrl,
      expiresIn: SIGNED_UPLOAD_URL_TTL_SECONDS,
    });
  }

  return NextResponse.json({ runId: body.runId, uploads });
}
