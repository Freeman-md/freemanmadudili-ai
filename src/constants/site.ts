import { AutomationFlowStep, FaqItem, ProofItem, ServiceItem, SystemCapability } from "@/types/site";

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

export const faqItems: FaqItem[] = [
  {
    id: "who-its-for",
    question: "Who is this actually for?",
    answer:
      "This is for growing businesses where manual steps keep interrupting work. If one or more processes rely on people copying data, replying repeatedly, or checking multiple tools, you are a good fit.",
  },
  {
    id: "quickstart-scope",
    question: "What exactly do I get with the Automation QuickStart?",
    answer:
      "One clearly defined manual process automated end-to-end. That includes intake, validation, routing, and logging. The scope is fixed so delivery stays fast and predictable.",
  },
  {
    id: "timeline",
    question: "How fast can this be delivered?",
    answer:
      "QuickStart automations are delivered within 72 hours once access and inputs are provided. Larger ecosystem projects follow a structured timeline after the audit.",
  },
  {
    id: "tools",
    question: "What tools or platforms do you work with?",
    answer:
      "We work with modern business tools such as CRMs, forms, spreadsheets, email systems, internal dashboards, and custom integrations. The focus is always on reliability, not novelty.",
  },
  {
    id: "ecosystem-audit",
    question: "What is the difference between the free audit and the full audit?",
    answer:
      "The free workflow audit identifies obvious bottlenecks and quick wins. The full audit is a paid, in-depth review of your operations used to design a complete automation plan and produce an accurate project quote.",
  },
  {
    id: "pricing-ecosystem",
    question: "How is the Ecosystem project priced?",
    answer:
      "Ecosystem work is quoted after the full audit. Pricing depends on the number of workflows, complexity, and operational risk. This avoids vague estimates and unexpected scope changes.",
  },
  {
    id: "ownership",
    question: "Will my team be able to manage the system after delivery?",
    answer:
      "Yes. Every system includes documentation and a walkthrough so your team understands how it works and how to operate it confidently.",
  },
  {
    id: "security",
    question: "How do you handle access and security?",
    answer:
      "We use least-privilege access, document all permissions, and remove access once work is complete. Security and clarity are non-negotiable.",
  },
  {
    id: "retainers",
    question: "Do you offer ongoing support or retainers?",
    answer:
      "Retainers are optional and only offered after delivery. Most clients start with a one-off build and decide later if ongoing support is needed.",
  },
  {
    id: "results",
    question: "What kind of results should I expect?",
    answer:
      "Fewer manual steps, fewer errors, and clearer operational flow. The goal is not automation for its own sake, but removing friction that slows your business down.",
  },
];

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

export const serviceItems: ServiceItem[] = [
  {
    title: "Automation QuickStart",
    badge: "72-hour setup",
    description: "One manual process automated end-to-end in 72 hours.",
    traits: ["Fixed scope", "Fast delivery", "No long-term commitment"],
    href: "/quickstart",
    metaLine: "$497 · fixed price",
    ctaLabel: "View details",
  },
  {
    title: "Operations Automation Ecosystem",
    badge: "Audit + custom build",
    description:
      "Multiple workflows redesigned so manual work stops being a bottleneck.",
    traits: ["Workflow audit", "Multiple automations", "Long-term clarity"],
    href: "/audit",
    emphasis: true,
    metaLine: "Audit first. Custom scope and quote after.",
    ctaLabel: "Start with audit",
  },
];

export const systemCapabilities: SystemCapability[] = [
  {
    id: "intake-routing",
    title: "Intake & Routing",
    description: "Requests captured and sent where they belong automatically.",
    iconKey: "intake",
  },
  {
    id: "process-logic",
    title: "Process Logic",
    description: "Rules, validations, and conditions replace manual decisions.",
    iconKey: "logic",
  },
  {
    id: "system-integration",
    title: "System Integration",
    description: "Tools stay in sync without copy-paste work.",
    iconKey: "integration",
  },
  {
    id: "visibility-control",
    title: "Visibility & Control",
    description: "Clear logs, alerts, and ownership.",
    iconKey: "visibility",
  },
];

export const whoSignals = [
  "Answering the same messages manually, every day",
  "Losing leads because follow-ups are inconsistent",
  "Copying data between tools by hand",
  "Operations held together by spreadsheets",
];
