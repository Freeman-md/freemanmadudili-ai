import {
  Database,
  FileSpreadsheet,
  FileText,
  Image,
  MessageSquare,
} from "lucide-react";

import type {
  ClarifyingQuestionsSchema,
  DiagnosticDecisionKey,
  DiagnosticScope,
  DiagnosticStep,
  DiagnosticVerdict,
  ProcessingStep,
} from "@/types/diagnostics";

export const diagnosticSteps: DiagnosticStep[] = [
  {
    id: "landing",
    title: "Workflow Diagnostic",
    description:
      "We diagnose one workflow using real evidence and return a clear verdict, not a solution.",
  },
  {
    id: "scope",
    title: "Select Workflow Scope",
    description: "Choose the single workflow you want us to analyse.",
  },
  {
    id: "evidence_upload",
    title: "Upload Evidence",
    description:
      "Upload real artefacts such as screenshots, CSVs, or CRM exports related to this workflow.",
  },
  {
    id: "initial_processing",
    title: "Processing Evidence",
    description:
      "We are scanning, categorising, and structuring your uploaded evidence.",
  },
  {
    id: "clarifying_inputs",
    title: "Clarifying Questions",
    description:
      "Answer a few concise questions generated from your evidence to remove ambiguity.",
  },
  {
    id: "deep_analysis",
    title: "Deep Diagnostic Analysis",
    description:
      "Multiple agents analyse patterns, delays, and failure points in your workflow.",
  },
  {
    id: "verdict",
    title: "Diagnostic Verdict",
    description:
      "Review the quantified issues and the real underlying causes identified.",
  },
  {
    id: "decision",
    title: "Choose Your Path",
    description:
      "Decide whether to do nothing, start a QuickStart, or book an ecosystem audit.",
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "We’ve sent the relevant details to your email based on your selection.",
  },
];

export const processingSteps: ProcessingStep[] = [
  { id: "scan", label: "Scanning uploaded files" },
  { id: "identify", label: "Identifying file types and sources" },
  { id: "categorise", label: "Categorising evidence by workflow stage" },
  { id: "prepare", label: "Preparing contextual analysis" },
];

export const deepAnalysisSteps: ProcessingStep[] = [
  { id: "timestamps", label: "Extracting timestamps and metadata" },
  { id: "patterns", label: "Analysing workflow behaviour patterns" },
  { id: "delays", label: "Detecting delays and failure points" },
  { id: "synthesis", label: "Synthesising diagnostic insights" },
];

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

export const expectationBullets = [
  "We diagnose one workflow only",
  "You’ll submit real evidence",
  "You’ll receive a verdict, not a solution",
];

export const landingHints = ["🕒 Takes ~5-7 minutes", "No signup required"];

const roundOneFields: ClarifyingQuestionsSchema["fields"] = [
  {
    key: "response_owner",
    label: "Who owns first response?",
    inputType: "single_select",
    options: [
      { label: "Sales rep", value: "sales" },
      { label: "Founder", value: "founder" },
      { label: "Operations", value: "ops" },
    ],
    validation: { required: true },
  },
  {
    key: "no_response_action",
    label: "What happens if no one responds?",
    inputType: "single_select",
    options: [
      { label: "Lead is lost", value: "lost" },
      { label: "Manual follow-up later", value: "follow_up" },
      { label: "Auto reminder", value: "auto_reminder" },
    ],
    validation: { required: true },
    dependency: {
      dependsOnKey: "response_owner",
      operator: "neq",
      value: "ops",
    },
  },
  {
    key: "leads_last_7_days",
    label: "Leads in last 7 days",
    inputType: "number",
    validation: { required: true, min: 0 },
    placeholder: "0",
  },
  {
    key: "approval_manual",
    label: "Is approval manually updated?",
    inputType: "boolean",
    validation: { required: true },
  },
  {
    key: "handoff_channels",
    label: "Where are responses logged?",
    inputType: "multi_select",
    options: [
      { label: "CRM", value: "crm" },
      { label: "Email", value: "email" },
      { label: "Spreadsheet", value: "sheet" },
    ],
    validation: { required: true },
  },
  {
    key: "handoff_file_ref",
    label: "Which file shows handoff time?",
    inputType: "file_ref",
    fileRef: {
      allow: "any",
      maxSelections: 1,
    },
    validation: { required: true },
  },
];

const roundTwoFields: ClarifyingQuestionsSchema["fields"] = [
  {
    key: "response_time_rating",
    label: "Rate current response speed",
    inputType: "rating",
    validation: { required: true, min: 1, max: 5 },
  },
  {
    key: "response_time_goal",
    label: "Target response time (hours)",
    inputType: "number",
    validation: { required: true, min: 0 },
  },
  {
    key: "handoff_notes",
    label: "Anything that slows the handoff?",
    inputType: "textarea",
    validation: { maxLength: 200 },
    placeholder: "Short note only",
  },
];

export const mockClarifyingSchemas: ClarifyingQuestionsSchema[] = [
  {
    schemaVersion: "1.0",
    roundId: "round_1",
    scope: "lead_response",
    fields: roundOneFields,
  },
  {
    schemaVersion: "1.0",
    roundId: "round_2",
    scope: "lead_response",
    fields: roundTwoFields,
  },
  {
    schemaVersion: "1.0",
    roundId: "round_3",
    scope: "lead_response",
    fields: roundTwoFields,
    submitLabel: "Submit for deeper analysis",
  },
];

const mockClarifyingRoundOrder = mockClarifyingSchemas.map(
  (schema) => schema.roundId
);

export function getNextMockRoundId(currentRoundId: string) {
  const currentIndex = mockClarifyingRoundOrder.indexOf(currentRoundId);
  if (currentIndex === -1) {
    return null;
  }
  return mockClarifyingRoundOrder[currentIndex + 1] ?? null;
}

export function getMockClarifyingSchema(
  roundId: string,
  scope: ClarifyingQuestionsSchema["scope"]
) {
  const baseSchema = mockClarifyingSchemas.find(
    (schema) => schema.roundId === roundId
  );

  if (!baseSchema) {
    throw new Error(`Missing clarifying schema for ${roundId}`);
  }

  return {
    ...baseSchema,
    scope,
  };
}

export const evidenceTypes = [
  { label: "Screenshots (PNG, JPG)", icon: Image },
  { label: "CSV files", icon: FileSpreadsheet },
  { label: "CRM exports", icon: Database },
  { label: "PDF files", icon: FileText },
  { label: "Email or WhatsApp views", icon: MessageSquare },
];

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

type ScopeEntry = {
  label: string;
  value: DiagnosticScope;
};

const scopeEntries: ScopeEntry[] = [
  { label: "Lead Response", value: "lead_response" },
  { label: "Client Onboarding", value: "client_onboarding" },
  { label: "Ops Handoff", value: "ops_handoff" },
  { label: "Reporting / Visibility", value: "reporting_visibility" },
];

export const scopeOptions = scopeEntries.map((entry) => entry.label);

export const scopeValueByLabel = scopeEntries.reduce<Record<string, DiagnosticScope>>(
  (acc, entry) => {
    acc[entry.label] = entry.value;
    return acc;
  },
  {}
);

export const MAX_EVIDENCE_FILE_BYTES = 5 * 1024 * 1024;
export const SIGNED_UPLOAD_URL_TTL_SECONDS = 600;

export const ACCEPTED_EVIDENCE_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "csv",
  "pdf",
  "xlsx",
  "xls",
  "eml",
  "msg",
];

export const ACCEPTED_EVIDENCE_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "text/csv",
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "message/rfc822",
];

export const EVIDENCE_ACCEPT = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "text/csv": [".csv"],
  "application/pdf": [".pdf"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "message/rfc822": [".eml"],
  "application/vnd.ms-outlook": [".msg"],
} as const;
