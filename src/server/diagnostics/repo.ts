import "server-only";

import {
  DiagnosticRun,
  DiagnosticScope,
  EvidenceConfirmPayload,
  EvidenceFile,
  RunStatus,
} from "@/types";
import { prisma } from "@/server/db";

const runs = new Map<string, DiagnosticRun>();
const evidence = new Map<string, EvidenceFile[]>();

export function createRun(scope: DiagnosticScope): DiagnosticRun {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const run: DiagnosticRun = {
        id,
        scope,
        status: RunStatus.CREATED,
        createdAt: now,
        updatedAt: now,
    };

    runs.set(id, run);
    return run;
}

export function getRun(id: string) {
    return runs.get(id) ?? null;
}

export function updateRunStatus(id: string, status: RunStatus) {
    const run = runs.get(id);
    if (!run) return null;

    run.status = status;
    run.updatedAt = new Date().toISOString();
    return run;
}

export function addEvidence(runId: string, file: EvidenceFile) {
    const files = evidence.get(runId) ?? [];
    files.push(file);
    evidence.set(runId, files);
}

export async function findRunById(runId: string) {
  return prisma.diagnostic_runs.findUnique({
    where: { id: runId },
    select: { id: true },
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
