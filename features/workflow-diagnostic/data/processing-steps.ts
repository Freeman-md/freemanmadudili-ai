export type ProcessingStep = {
  id: string;
  label: string;
};

export const processingSteps: ProcessingStep[] = [
  {
    id: "scan",
    label: "Scanning uploaded files",
  },
  {
    id: "identify",
    label: "Identifying file types and sources",
  },
  {
    id: "categorise",
    label: "Categorising evidence by workflow stage",
  },
  {
    id: "prepare",
    label: "Preparing contextual analysis",
  },
];
