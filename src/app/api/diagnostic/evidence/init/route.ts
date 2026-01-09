import { NextResponse } from "next/server";

import { config } from "@/lib/config";
import { createSignedUploadUrl } from "@/lib/server/storage/client";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const SIGNED_URL_TTL_SECONDS = 600;

type EvidenceInitFile = {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
};

type EvidenceInitPayload = {
  runId: string;
  files: EvidenceInitFile[];
};

function isValidSha256(value: string) {
  return /^[a-f0-9]{64}$/i.test(value);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as EvidenceInitPayload | null;

  if (!body?.runId || !Array.isArray(body.files) || body.files.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const uploads = [] as Array<{
    fileId: string;
    storageKey: string;
    signedUrl: string;
    expiresIn: number;
  }>;

  for (const file of body.files) {
    if (!file.filename || !file.mimeType || !file.sha256) {
      return NextResponse.json({ error: "Missing file metadata" }, { status: 400 });
    }

    if (!Number.isFinite(file.sizeBytes) || file.sizeBytes <= 0) {
      return NextResponse.json({ error: "Invalid file size" }, { status: 400 });
    }

    if (file.sizeBytes > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 5MB limit" },
        { status: 413 }
      );
    }

    if (!isValidSha256(file.sha256)) {
      return NextResponse.json({ error: "Invalid sha256" }, { status: 400 });
    }

    const fileId = crypto.randomUUID();
    const storageKey = `diagnostics/${body.runId}/${fileId}`;
    const signed = await createSignedUploadUrl({
      bucket: config.STORAGE_BUCKET,
      key: storageKey,
      contentType: file.mimeType,
      expiresIn: SIGNED_URL_TTL_SECONDS,
    });

    uploads.push({
      fileId,
      storageKey,
      signedUrl: signed.signedUrl,
      expiresIn: signed.expiresIn,
    });
  }

  return NextResponse.json({ runId: body.runId, uploads });
}
