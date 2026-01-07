export type DiagnosticStep = {
  id: string;
  title: string;
  description: string;
};

export const diagnosticSteps: DiagnosticStep[] = [
  {
    id: "landing",
    title: "Workflow Diagnostic",
    description: "We diagnose one workflow using real evidence and return a clear verdict, not a solution.",
  },
  {
    id: "scope",
    title: "Select Workflow Scope",
    description: "Choose the single workflow you want us to analyse.",
  },
  {
    id: "evidence_upload",
    title: "Upload Evidence",
    description: "Upload real artefacts such as screenshots, CSVs, or CRM exports related to this workflow.",
  },
  {
    id: "initial_processing",
    title: "Processing Evidence",
    description: "We are scanning, categorising, and structuring your uploaded evidence.",
  },
  {
    id: "clarifying_inputs",
    title: "Clarifying Questions",
    description: "Answer a few concise questions generated from your evidence to remove ambiguity.",
  },
  {
    id: "deep_analysis",
    title: "Deep Diagnostic Analysis",
    description: "Multiple agents analyse patterns, delays, and failure points in your workflow.",
  },
  {
    id: "verdict",
    title: "Diagnostic Verdict",
    description: "Review the quantified issues and the real underlying causes identified.",
  },
  {
    id: "decision",
    title: "Choose Your Path",
    description: "Decide whether to do nothing, start a QuickStart, or book an ecosystem audit.",
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "We’ve sent the relevant details to your email based on your selection.",
  },
];