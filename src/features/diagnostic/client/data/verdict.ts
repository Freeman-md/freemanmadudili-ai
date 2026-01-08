export type DiagnosticIssue = {
  label: string;
  value: string;
};

export type DiagnosticVerdict = {
  issues: DiagnosticIssue[];
  insights: string[];
  disclaimer: string;
};

export const defaultVerdict: DiagnosticVerdict = {
  issues: [
    { label: "Avg. handoff delay", value: "4h 12m" },
    { label: "Failure rate", value: "18%" },
    { label: "Manual touches per lead", value: "6" },
  ],
  insights: [
    "Manual ownership, not tooling, is the primary bottleneck.",
    "Lack of real-time visibility causes reactive failures.",
  ],
  disclaimer: "Diagnosis only. No solution or implementation is provided here.",
};
