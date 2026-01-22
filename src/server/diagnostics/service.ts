import "server-only";

import type {
  EvidenceConfirmPayload,
  EvidenceInitPayload,
  EvidenceInitResponse,
  EvidenceInitUpload,
  ServiceResult,
} from "@/types";
import { RunStatus } from "@/types";

import { config } from "@/server/config";
import {
  findExistingEvidenceBySha,
  findRunById,
  insertEvidenceAndUpdateRun,
} from "@/server/diagnostics/repo";
import {
  EvidenceConfirmPayloadSchema,
  EvidenceInitPayloadSchema,
} from "@/server/diagnostics/schema";
import {
  validateEvidenceConfirmPayload,
  validateEvidenceInitPayload,
} from "@/server/diagnostics/validation";
import { createSignedUploadUrl } from "@/server/storage";
import { SIGNED_UPLOAD_URL_TTL_SECONDS } from "@/features/diagnostics/constants";

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

export async function initEvidenceUpload(
  input: unknown
): Promise<ServiceResult<EvidenceInitResponse>> {
  const parsed = EvidenceInitPayloadSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  const payload = parsed.data as EvidenceInitPayload;
  const validation = validateEvidenceInitPayload(payload);

  if (!validation.ok) {
    return validation;
  }

  const uploads: EvidenceInitUpload[] = [];

  for (const file of payload.files) {
    const fileId = crypto.randomUUID();
    const storagePath = `diagnostics/${payload.runId}/${fileId}`;
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

  return { ok: true, data: { runId: payload.runId, uploads } };
}
