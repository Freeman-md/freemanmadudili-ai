export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

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
