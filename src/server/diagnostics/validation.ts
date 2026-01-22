import "server-only";

import { MAX_EVIDENCE_FILE_BYTES } from "@/features/diagnostics/constants";
import type { EvidenceConfirmPayload } from "@/types";

export type ValidationResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export function validateEvidenceConfirmPayload(
  payload: EvidenceConfirmPayload
): ValidationResult {
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

  return { ok: true };
}

function isValidSha256(value: string) {
  return /^[a-f0-9]{64}$/i.test(value);
}
