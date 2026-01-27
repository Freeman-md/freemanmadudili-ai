import "server-only";

import type { ProcessEvidenceInput, ProcessEvidenceMetadata } from "@/server/diagnostics/schema";
import { DiagnosticScope } from "@prisma/client";

export async function buildProcessEvidenceInput({
  scope,
  metadata,
  files,
}: {
  scope: DiagnosticScope;
  metadata: ProcessEvidenceMetadata;
  files: File[];
}): Promise<ProcessEvidenceInput> {
  return {
    scope,
    files: await Promise.all(
      files.map(async (file, index) => {
        const meta = metadata[index];
        return {
          id: meta.id,
          name: meta.name ?? file.name,
          mimeType: meta.mimeType ?? file.type ?? "application/octet-stream",
          sizeBytes: meta.sizeBytes ?? file.size,
          buffer: Buffer.from(await file.arrayBuffer()),
        };
      })
    ),
  };
}
