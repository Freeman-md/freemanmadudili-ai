import "server-only";

import type {
  EvidenceInitResponse,
  EvidenceInitUpload,
  ExtractEvidenceResponse,
  RunInitResponse,
  RunStatusResponse,
  ServiceResult,
} from "@/types/diagnostics";
import { DiagnosticScope, RunStatus } from "@prisma/client";

import { config } from "@/server/config";
import {
  createRunRecord,
  findExistingEvidenceBySha,
  findRunById,
  findRunStatusById,
  insertEvidenceAndUpdateRun,
} from "@/server/diagnostics/repo";
import {
  EvidenceConfirmPayload,
  EvidenceConfirmPayloadSchema,
  EvidenceInitPayload,
  EvidenceInitPayloadSchema,
  RunInitPayload,
  RunInitPayloadSchema,
  RunStatusQuery,
  RunStatusQuerySchema,
} from "@/server/diagnostics/schema";
import {
  validateEvidenceConfirmPayload,
  validateEvidenceInitPayload,
  validateProcessEvidenceRequest,
  validateRunInitPayload,
  validateRunStatusQuery,
} from "@/server/diagnostics/validation";
import { createSignedUploadUrl } from "@/server/storage";
import { SIGNED_UPLOAD_URL_TTL_SECONDS } from "@/features/diagnostics/constants";
import { extractDataFromFiles } from "@/server/diagnostics/ai";
import { buildProcessEvidenceInput } from "@/server/diagnostics/parsers";

export async function initDiagnosticRun(
  input: unknown
): Promise<ServiceResult<RunInitResponse>> {
  const parsed = RunInitPayloadSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  const payload = parsed.data as RunInitPayload;
  const validation = validateRunInitPayload(payload);

  if (!validation.ok) {
    return validation;
  }

  const run = await createRunRecord(payload.scope ?? null);

  return { ok: true, data: { runId: run.id, status: run.status } };
}


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
    RunStatus.evidence_uploaded
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

export async function getDiagnosticRunStatus(
  input: unknown
): Promise<ServiceResult<{ run: RunStatusResponse }>> {
  const parsed = RunStatusQuerySchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, status: 400, error: "Missing runId" };
  }

  const payload = parsed.data as RunStatusQuery;
  const validation = validateRunStatusQuery(payload);

  if (!validation.ok) {
    return validation;
  }

  const run = await findRunStatusById(payload.runId);

  if (!run) {
    return { ok: false, status: 404, error: "Not found" };
  }

  return {
    ok: true,
    data: {
      run: {
        id: run.id,
        status: run.status,
        scope: run.scope ?? null,
        createdAt: run.createdAt.toISOString(),
        updatedAt: run.updatedAt.toISOString(),
      },
    },
  };
}

export async function processDiagnosticEvidence(
  input: unknown
): Promise<ServiceResult<ExtractEvidenceResponse>> {
  if (!input || !(input instanceof FormData)) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  const scope = input.get("scope");
  const metadataRaw = input.get("metadata");
  const files = input.getAll("files").filter((item): item is File => item instanceof File);

  const validation = validateProcessEvidenceRequest({
    scope,
    metadataRaw,
    files,
  });

  if (!validation.ok) {
    return validation;
  }

  const payload = await buildProcessEvidenceInput({
    scope: validation.data.scope as DiagnosticScope,
    metadata: validation.data.metadata,
    files,
  });

  if (!payload.files.length) {
    return { ok: false, status: 400, error: "Missing file contents" };
  }

  const extraction = await extractDataFromFiles(payload);

  return { ok: true, data: { text: extraction.text } };
}
