import type { DiagnosticDecisionKey } from "@/features/diagnostic/client/types/decision";

export type DecisionOption = {
  key: DiagnosticDecisionKey;
  title: string;
  intents: string[];
  buttonLabel: string;
  accent?: boolean;
};

export const decisionOptions: DecisionOption[] = [
  {
    key: "do_nothing",
    title: "Do nothing",
    intents: [
      "We’ll send your diagnostic verdict to your email.",
      "No follow-up. No pitch.",
    ],
    buttonLabel: "Send Email Verdict",
  },
  {
    key: "quickstart",
    title: "QuickStart",
    intents: ["Fix the diagnosed issue only.", "Narrow scope. Clear outcome."],
    buttonLabel: "Start QuickStart",
    accent: true,
  },
  {
    key: "ecosystem_audit",
    title: "Ecosystem Audit",
    intents: ["Book a live audit to map the full system."],
    buttonLabel: "Book Audit Call",
  },
];
