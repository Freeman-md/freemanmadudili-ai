import "server-only";

import { z } from "zod";

export const DiagnosticScopeSchema = z.enum([
  "lead_response",
  "client_onboarding",
  "ops_handoff",
  "reporting_visibility",
]);

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

export type EvidenceConfirmPayloadInput = z.input<
  typeof EvidenceConfirmPayloadSchema
>;

export type RunInitPayloadInput = z.input<typeof RunInitPayloadSchema>;

export type RunStatusQueryInput = z.input<typeof RunStatusQuerySchema>;

export type EvidenceInitPayloadInput = z.input<
  typeof EvidenceInitPayloadSchema
>;
