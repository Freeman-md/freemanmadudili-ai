export type AutomationFlowStep = {
  title: string;
  description: string;
};

export const automationFlowSteps: AutomationFlowStep[] = [
  {
    title: "Intake",
    description:
      "Capture requests and requirements with no manual back-and-forth.",
  },
  {
    title: "Build",
    description:
      "Design and implement the automation based on the agreed workflow.",
  },
  {
    title: "Test",
    description: "Validate the system end-to-end to ensure reliability.",
  },
  {
    title: "Handover",
    description: "Deliver documentation and walk-through for confident usage.",
  },
];
