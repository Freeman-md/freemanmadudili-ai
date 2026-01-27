import "server-only";

import { extractPdfText, extractSpreadsheetText } from "@/lib/utils";

import type {
  ProcessEvidenceInput,
  ProcessEvidenceMetadata,
} from "@/server/diagnostics/schema";
import type { ProcessEvidenceFileWithBuffer } from "@/server/diagnostics/schema";
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

export async function extractEvidenceText(
  files: ProcessEvidenceFileWithBuffer[]
) {
  const chunks: string[] = [];

  for (const file of files) {
    if (file.mimeType === "application/pdf" || file.name.endsWith(".pdf")) {
      const text = await extractPdfText(file.buffer);
      if (text) {
        chunks.push(text);
      }
      continue;
    }

    if (file.mimeType === "text/csv" || file.name.endsWith(".csv")) {
      chunks.push(file.buffer.toString("utf-8"));
      continue;
    }

    if (
      file.mimeType === "application/vnd.ms-excel" ||
      file.mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx")
    ) {
      const csv = extractSpreadsheetText(file.buffer);
      if (csv) {
        chunks.push(csv);
      }
      continue;
    }
  }

  return chunks.join("\n\n").trim();
}
