export type DiagnosticDecisionKey =
  | "do_nothing"
  | "quickstart"
  | "ecosystem_audit";

export type DiagnosticDecision = {
  key: DiagnosticDecisionKey;
  selectedAt?: string;
};
