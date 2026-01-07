export type DiagnosticStep = {
  id: string;
  title: string;
  description: string;
};

export const diagnosticSteps: DiagnosticStep[] = [
  {
    id: "intro",
    title: "Welcome",
    description: "A quick, structured walkthrough to map your workflow.",
  },
  {
    id: "process",
    title: "Process snapshot",
    description: "Placeholder: capture the manual process at a high level.",
  },
  {
    id: "tools",
    title: "Tools involved",
    description: "Placeholder: list the tools or systems in use.",
  },
  {
    id: "volume",
    title: "Volume and frequency",
    description: "Placeholder: estimate how often the process occurs.",
  },
  {
    id: "bottlenecks",
    title: "Bottlenecks",
    description: "Placeholder: identify where the process slows down.",
  },
  {
    id: "outcome",
    title: "Desired outcome",
    description: "Placeholder: define the target outcome for automation.",
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "Placeholder: note urgency or ideal delivery timing.",
  },
  {
    id: "review",
    title: "Review",
    description: "Placeholder: confirm details before submission.",
  },
];
