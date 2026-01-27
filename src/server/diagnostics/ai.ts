import "server-only";

import type {
  ProcessEvidenceInput,
  ProcessEvidenceExtraction,
} from "@/server/diagnostics/schema";

export async function extractDataFromFiles(
  _input: ProcessEvidenceInput
): Promise<ProcessEvidenceExtraction> {
  return { text: "" };
}
