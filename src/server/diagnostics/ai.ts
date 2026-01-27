import "server-only";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import type {
  ProcessEvidenceInput,
  ProcessEvidenceExtraction,
} from "@/server/diagnostics/schema";
import { ProcessEvidenceExtractionSchema } from "@/server/diagnostics/schema";

const SYSTEM_PROMPT = [
  "You are a workflow diagnostic analyst.",
  "You will receive uploaded files and a workflow scope.",
  "Extract the raw text content and any visible labels or headings.",
  "Do not summarize, interpret, or provide recommendations.",
  "Return a single unstructured text output that combines all files.",
].join(" ");

function buildUserContent(input: ProcessEvidenceInput) {
  const files = input.files.map((file) => ({
    type: "file" as const,
    data: file.buffer,
    mimeType: file.mimeType,
  }));

  return [
    {
      type: "text" as const,
      text: `Scope: ${input.scope}\nExtract text from the attached files.`,
    },
    ...files,
  ];
}

export async function extractDataFromFiles(
  input: ProcessEvidenceInput
): Promise<ProcessEvidenceExtraction> {
  const { object } = await generateObject<ProcessEvidenceExtraction>({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    schema: ProcessEvidenceExtractionSchema,
    messages: [
      {
        role: "user",
        content: buildUserContent(input),
      },
    ],
  });

  return object;
}
