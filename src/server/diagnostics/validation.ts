import "server-only";

import { MAX_EVIDENCE_FILE_BYTES } from "@/features/diagnostics/constants";
import type { ServiceResult } from "@/types/diagnostics";
import type {
  EvidenceConfirmPayload,
  EvidenceInitPayload,
  ProcessEvidenceMetadata,
  ProcessEvidencePayload,
  RunInitPayload,
  RunStatusQuery,
} from "@/server/diagnostics/schema";
import { ProcessEvidenceMetadataSchema } from "@/server/diagnostics/schema";
import { isValidSha256 } from "@/lib/utils";

export function validateEvidenceConfirmPayload(
  payload: EvidenceConfirmPayload
): ServiceResult<null> {
  if (!payload.runId || !Array.isArray(payload.files) || payload.files.length === 0) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  for (const file of payload.files) {
    if (!file.fileId || !file.storageKey || !file.filename || !file.mimeType) {
      return { ok: false, status: 400, error: "Missing file metadata" };
    }

    if (!Number.isFinite(file.sizeBytes) || file.sizeBytes <= 0) {
      return { ok: false, status: 400, error: "Invalid file size" };
    }

    if (file.sizeBytes > MAX_EVIDENCE_FILE_BYTES) {
      return { ok: false, status: 413, error: "File exceeds 5MB limit" };
    }

    if (!isValidSha256(file.sha256)) {
      return { ok: false, status: 400, error: "Invalid sha256" };
    }

    const expectedPrefix = `diagnostics/${payload.runId}/`;
    if (!file.storageKey.startsWith(expectedPrefix)) {
      return { ok: false, status: 400, error: "Invalid storage key" };
    }
  }

  return { ok: true, data: null };
}

export function validateEvidenceInitPayload(
  payload: EvidenceInitPayload
): ServiceResult<null> {
  if (!payload.runId || !Array.isArray(payload.files) || payload.files.length === 0) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  for (const file of payload.files) {
    if (!file.filename || !file.mimeType || !file.sha256) {
      return { ok: false, status: 400, error: "Missing file metadata" };
    }

    if (!Number.isFinite(file.sizeBytes) || file.sizeBytes <= 0) {
      return { ok: false, status: 400, error: "Invalid file size" };
    }

    if (file.sizeBytes > MAX_EVIDENCE_FILE_BYTES) {
      return { ok: false, status: 413, error: "File exceeds 5MB limit" };
    }

    if (!isValidSha256(file.sha256)) {
      return { ok: false, status: 400, error: "Invalid sha256" };
    }
  }

  return { ok: true, data: null };
}

export function validateRunInitPayload(
  payload: RunInitPayload
): ServiceResult<null> {
  if (payload.scope === undefined || payload.scope === null) {
    return { ok: true, data: null };
  }

  if (typeof payload.scope !== "string" || payload.scope.length === 0) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  return { ok: true, data: null };
}

export function validateRunStatusQuery(
  payload: RunStatusQuery
): ServiceResult<null> {
  if (!payload.runId || typeof payload.runId !== "string") {
    return { ok: false, status: 400, error: "Missing runId" };
  }

  return { ok: true, data: null };
}

export function validateProcessEvidencePayload(
  payload: ProcessEvidencePayload
): ServiceResult<null> {
  if (!payload.scope || !Array.isArray(payload.files) || payload.files.length === 0) {
    return { ok: false, status: 400, error: "Invalid payload" };
  }

  for (const file of payload.files) {
    if (!file.id || !file.name || !file.mimeType) {
      return { ok: false, status: 400, error: "Missing file metadata" };
    }

    if (!Number.isFinite(file.sizeBytes) || file.sizeBytes <= 0) {
      return { ok: false, status: 400, error: "Invalid file size" };
    }
  }

  return { ok: true, data: null };
}

export function validateProcessEvidenceRequest({
  scope,
  metadataRaw,
  files,
}: {
  scope: unknown;
  metadataRaw: unknown;
  files: File[];
}): ServiceResult<{ scope: string; metadata: ProcessEvidenceMetadata }> {
  if (typeof scope !== "string" || typeof metadataRaw !== "string") {
    return { ok: false, status: 400, error: "Missing payload fields" };
  }

  let metadata: ProcessEvidenceMetadata;

  try {
    metadata = JSON.parse(metadataRaw) as ProcessEvidenceMetadata;
  } catch {
    return { ok: false, status: 400, error: "Invalid metadata" };
  }

  const parsedMetadata = ProcessEvidenceMetadataSchema.safeParse(metadata);

  if (!parsedMetadata.success) {
    return { ok: false, status: 400, error: "Invalid metadata" };
  }

  if (files.length === 0) {
    return { ok: false, status: 400, error: "No files received" };
  }

  if (parsedMetadata.data.length !== files.length) {
    return { ok: false, status: 400, error: "Metadata mismatch" };
  }

  return { ok: true, data: { scope, metadata: parsedMetadata.data } };
}
