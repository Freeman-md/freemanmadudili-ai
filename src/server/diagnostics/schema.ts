import "server-only";

import { z } from "zod";
import { DiagnosticScope } from "@prisma/client";

export const DiagnosticScopeSchema = z.enum(DiagnosticScope);

export const RunInitPayloadSchema = z.object({
  scope: DiagnosticScopeSchema.nullable().optional(),
});

export const RunStatusQuerySchema = z.object({
  runId: z.string().min(1),
});

export const EvidenceConfirmFileSchema = z.object({
  fileId: z.string().min(1),
  storageKey: z.string().min(1),
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number(),
  sha256: z.string().min(1),
});

export const EvidenceConfirmPayloadSchema = z.object({
  runId: z.string().min(1),
  files: z.array(EvidenceConfirmFileSchema).min(1),
});

export const EvidenceInitFileSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number(),
  sha256: z.string().min(1),
});

export const EvidenceInitPayloadSchema = z.object({
  runId: z.string().min(1),
  files: z.array(EvidenceInitFileSchema).min(1),
});

export const ProcessEvidenceFileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number(),
});

export const ProcessEvidencePayloadSchema = z.object({
  scope: DiagnosticScopeSchema,
  files: z.array(ProcessEvidenceFileSchema).min(1),
});

export const ProcessEvidenceMetadataSchema = z.array(ProcessEvidenceFileSchema).min(1);

export const ProcessEvidenceExtractionSchema = z.object({
  text: z.string(),
});

export type EvidenceConfirmPayload = z.infer<typeof EvidenceConfirmPayloadSchema>;
export type EvidenceConfirmFile = z.infer<typeof EvidenceConfirmFileSchema>;
export type EvidenceInitPayload = z.infer<typeof EvidenceInitPayloadSchema>;
export type EvidenceInitFile = z.infer<typeof EvidenceInitFileSchema>;
export type ProcessEvidencePayload = z.infer<typeof ProcessEvidencePayloadSchema>;
export type ProcessEvidenceFile = z.infer<typeof ProcessEvidenceFileSchema>;
export type ProcessEvidenceMetadata = z.infer<typeof ProcessEvidenceMetadataSchema>;
export type ProcessEvidenceExtraction = z.infer<typeof ProcessEvidenceExtractionSchema>;
export type RunInitPayload = z.infer<typeof RunInitPayloadSchema>;
export type RunStatusQuery = z.infer<typeof RunStatusQuerySchema>;

export type ProcessEvidenceFileWithBuffer = ProcessEvidenceFile & {
  buffer: Buffer;
};

export type ProcessEvidenceInput = {
  scope: DiagnosticScope;
  files: ProcessEvidenceFileWithBuffer[];
};
