import "server-only";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import type {
  ProcessEvidenceInput,
  ProcessEvidenceExtraction,
} from "@/server/diagnostics/schema";
import { ProcessEvidenceExtractionSchema } from "@/server/diagnostics/schema";
import { buildEvidenceExtractionContent } from "@/server/diagnostics/parsers";

export async function extractDataFromFiles(
  input: ProcessEvidenceInput
): Promise<ProcessEvidenceExtraction> {
  const systemPrompt = [
    "You are a workflow diagnostic analyst.",
    "You will receive uploaded files and a workflow scope.",
    "Extract the raw text content and any visible labels or headings.",
    "Do not summarize, interpret, or provide recommendations.",
    "Return a single unstructured text output that combines all files.",
  ].join(" ");
  
  const userInput = buildEvidenceExtractionContent(input);

  const { object } = await generateObject<ProcessEvidenceExtraction>({
    model: openai("gpt-5o-mini"),
    system: systemPrompt,
    schema: ProcessEvidenceExtractionSchema,
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  return object;
}
