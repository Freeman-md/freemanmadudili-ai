import { NextResponse } from "next/server";

import { prisma } from "@/lib/server/db/client";
import type {
  EvidenceConfirmPayload,
  EvidenceStatus,
} from "@/types";
import { RunStatus } from "@/types";
import { MAX_EVIDENCE_FILE_BYTES } from "@/features/diagnostics/constants";
import { isValidSha256 } from "@/features/diagnostics/shared/lib/evidence";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as EvidenceConfirmPayload | null;

  if (!body?.runId || !Array.isArray(body.files) || body.files.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  for (const file of body.files) {
    if (!file.fileId || !file.storageKey || !file.filename || !file.mimeType) {
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

    const expectedPrefix = `diagnostics/${body.runId}/`;
    if (!file.storageKey.startsWith(expectedPrefix)) {
      return NextResponse.json({ error: "Invalid storage key" }, { status: 400 });
    }
  }

  const run = await prisma.diagnostic_runs.findUnique({
    where: { id: body.runId },
    select: { id: true },
  });

  if (!run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  const shaValues = body.files.map((file) => file.sha256);
  const existing = await prisma.evidence_files.findMany({
    where: {
      runId: body.runId,
      sha256: { in: shaValues },
    },
    select: { sha256: true },
  });

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "Duplicate evidence detected" },
      { status: 409 }
    );
  }

  const uploadedStatus: EvidenceStatus = "uploaded";

  await prisma.$transaction(async (tx) => {
    await tx.evidence_files.createMany({
      data: body.files.map((file) => ({
        id: file.fileId,
        runId: body.runId,
        filename: file.filename,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
        storageKey: file.storageKey,
        sha256: file.sha256,
        status: uploadedStatus,
      })),
    });

    await tx.diagnostic_runs.update({
      where: { id: body.runId },
      data: { status: RunStatus.EVIDENCE_UPLOADED },
    });
  });

  return NextResponse.json({ ok: true, count: body.files.length });
}
