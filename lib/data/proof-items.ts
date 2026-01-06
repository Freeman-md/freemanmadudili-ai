export type ProofItem = {
  id: string;
  title: string;
  shortDescription: string;
  context: string;
  imageSrc: string;
  detailedDescription: {
    problem: string;
    automated: string;
    outcome: string;
  };
};

export const proofItems: ProofItem[] = [
  {
    id: "lead-intake",
    title: "Lead intake routing",
    shortDescription: "Capture, score, and route leads automatically.",
    context: "Lead intake automation",
    imageSrc: "/proofs/lead-intake.svg",
    detailedDescription: {
      problem: "Inbound leads were stuck in forms and inboxes with no routing.",
      automated: "Unified intake, enrichment, and assignment rules.",
      outcome: "Faster response times and zero missed leads.",
    },
  },
  {
    id: "order-followup",
    title: "Order follow-up system",
    shortDescription: "Auto-triaged follow-ups with clear owner handoff.",
    context: "Customer ops workflow",
    imageSrc: "/proofs/order-followup.svg",
    detailedDescription: {
      problem: "Manual follow-ups were inconsistent and easy to miss.",
      automated: "Trigger-based reminders with escalation logic.",
      outcome: "Fewer delays and predictable customer updates.",
    },
  },
  {
    id: "onboarding",
    title: "Client onboarding flow",
    shortDescription: "Documents, tasks, and approvals in one stream.",
    context: "Onboarding automation",
    imageSrc: "/proofs/onboarding.svg",
    detailedDescription: {
      problem: "New clients needed multiple touchpoints and manual tracking.",
      automated: "Checklist-driven onboarding with automated status updates.",
      outcome: "Shorter onboarding cycles and clearer ownership.",
    },
  },
  {
    id: "ops-reporting",
    title: "Operations reporting sync",
    shortDescription: "Daily reporting without spreadsheet wrangling.",
    context: "Internal ops reporting",
    imageSrc: "/proofs/ops-reporting.svg",
    detailedDescription: {
      problem: "Teams copied data between tools by hand every day.",
      automated: "Scheduled syncs into a unified reporting view.",
      outcome: "Cleaner reporting and fewer data errors.",
    },
  },
];
