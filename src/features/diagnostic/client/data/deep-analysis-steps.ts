import type { ProcessingStep } from "@/features/diagnostic/client/data/processing-steps";

export const deepAnalysisSteps: ProcessingStep[] = [
  { id: "timestamps", label: "Extracting timestamps and metadata" },
  { id: "patterns", label: "Analysing workflow behaviour patterns" },
  { id: "delays", label: "Detecting delays and failure points" },
  { id: "synthesis", label: "Synthesising diagnostic insights" },
];
