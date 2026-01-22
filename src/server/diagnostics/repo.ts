import "server-only";

import { RunStatus } from "@prisma/client";
import type { EvidenceConfirmPayload, RunInitPayload } from "@/server/diagnostics/schema";
import { prisma } from "@/server/db";

export async function createRunRecord(scope: RunInitPayload["scope"]) {
  return prisma.diagnostic_runs.create({
    data: {
      scope,
      status: RunStatus.created,
    },
    select: {
      id: true,
      status: true,
    },
  });
}

export async function updateRunStatus(runId: string, status: RunStatus) {
  return prisma.diagnostic_runs.update({
    where: { id: runId },
    data: { status },
    select: { id: true, status: true },
  });
}

export async function findRunById(runId: string) {
  return prisma.diagnostic_runs.findUnique({
    where: { id: runId },
    select: { id: true },
  });
}

export async function findRunStatusById(runId: string) {
  return prisma.diagnostic_runs.findUnique({
    where: { id: runId },
    select: {
      id: true,
      status: true,
      scope: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function findExistingEvidenceBySha(
  runId: string,
  shaValues: string[]
) {
  return prisma.evidence_files.findMany({
    where: {
      runId,
      sha256: { in: shaValues },
    },
    select: { sha256: true },
  });
}

export async function insertEvidenceAndUpdateRun(
  runId: string,
  files: EvidenceConfirmPayload["files"],
  status: RunStatus
) {
  await prisma.$transaction(async (transaction) => {
    await transaction.evidence_files.createMany({
      data: files.map((file) => ({
        id: file.fileId,
        runId,
        filename: file.filename,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
        storageKey: file.storageKey,
        sha256: file.sha256,
        status: "uploaded",
      })),
    });

    await transaction.diagnostic_runs.update({
      where: { id: runId },
      data: { status },
    });
  });
}
