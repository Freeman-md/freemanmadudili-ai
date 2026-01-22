import "server-only";

import type { EvidenceConfirmPayload, ServiceResult } from "@/types";
import { RunStatus } from "@/types";

import {
  findExistingEvidenceBySha,
  findRunById,
  insertEvidenceAndUpdateRun,
} from "@/server/diagnostics/repo";
import { EvidenceConfirmPayloadSchema } from "@/server/diagnostics/schema";
import { validateEvidenceConfirmPayload } from "@/server/diagnostics/validation";

export async function confirmEvidenceUpload(
  input: unknown
): Promise<ServiceResult<{ count: number }>> {
  const parsed = EvidenceConfirmPayloadSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  const payload = parsed.data as EvidenceConfirmPayload;
  
  const validation = validateEvidenceConfirmPayload(payload);

  if (!validation.ok) {
    return validation;
  }

  const run = await findRunById(payload.runId);

  if (!run) {
    return { ok: false, status: 404, error: "Run not found" };
  }

  const shaValues = payload.files.map((file) => file.sha256);
  const existing = await findExistingEvidenceBySha(payload.runId, shaValues);

  if (existing.length > 0) {
    return { ok: false, status: 409, error: "Duplicate evidence detected" };
  }

  await insertEvidenceAndUpdateRun(
    payload.runId,
    payload.files,
    RunStatus.EVIDENCE_UPLOADED
  );

  return { ok: true, data: { count: payload.files.length } };
}
