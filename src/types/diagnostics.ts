export type ValidationErrors = Record<string, string>;

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

export enum RunStatus {
  CREATED = "created",
  EVIDENCE_UPLOADED = "evidence_uploaded",
  PROCESSING = "processing",
  AWAITING_CLARIFYING_ANSWERS = "awaiting_clarifying_answers",
  DEEP_ANALYSIS = "deep_analysis",
  REPORT_READY = "report_ready",
  EMAILED = "emailed",
  FAILED = "failed",
}

export enum ArtifactType {
  NORMALIZED_EVIDENCE = "normalized_evidence",
  CLARIFYING_QUESTIONS = "clarifying_questions",
  CLARIFYING_ANSWERS = "clarifying_answers",
  ANALYSIS = "analysis",
  VERDICT = "verdict",
  REPORT = "report",
}

export type DiagnosticScope =
  | "lead_response"
  | "client_onboarding"
  | "ops_handoff"
  | "reporting_visibility";

export type DiagnosticFile = {
  id: string;
  name: string;
  extension: string;
  file: File;
};

export type DecisionOption = {
  key: DiagnosticDecisionKey;
  title: string;
  intents: string[];
  buttonLabel: string;
  accent?: boolean;
};

export type EvidenceStatus = "uploaded" | "parsing" | "parsed" | "failed";

export type ClarifyingRoundStatus = "pending" | "answered" | "expired";

export type DiagnosticRun = {
  id: string;
  status: RunStatus;
  scope: DiagnosticScope;
  createdAt: string;
  updatedAt: string;
};

export type EvidenceFile = {
  id: string;
  runId: string;
  filename: string;
  mimeType: string;
  storageKey: string;
  uploadedAt: string;
};

export type ClarifyingRound = {
  id: string;
  runId: string;
  questions: unknown;
  answers: unknown | null;
  createdAt: string;
};

export type DiagnosticArtifact = {
  id: string;
  runId: string;
  type: ArtifactType;
  payload: unknown;
  createdAt: string;
};

export type DiagnosticStep = {
  id: string;
  title: string;
  description: string;
};

export type ProcessingStep = {
  id: string;
  label: string;
};

export type DiagnosticIssue = {
  label: string;
  value: string;
};

export type DiagnosticVerdict = {
  issues: DiagnosticIssue[];
  insights: string[];
  disclaimer: string;
};

export type DiagnosticDecisionKey =
  | "do_nothing"
  | "quickstart"
  | "ecosystem_audit";

export type DiagnosticDecision = {
  key: DiagnosticDecisionKey;
  selectedAt?: string;
};

export type QuestionInputType =
  | "single_select"
  | "multi_select"
  | "boolean"
  | "number"
  | "text"
  | "textarea"
  | "date"
  | "time"
  | "datetime"
  | "email"
  | "url"
  | "phone"
  | "file_ref"
  | "rating"
  | "currency";

export type QuestionOption = {
  label: string;
  value: string;
  description?: string;
};

export type QuestionValidation = {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type QuestionDependency = {
  dependsOnKey: string;
  operator: "eq" | "neq" | "in" | "not_in" | "gt" | "gte" | "lt" | "lte";
  value: unknown;
};

export type QuestionField = {
  key: string;
  label: string;
  helpText?: string;
  placeholder?: string;
  inputType: QuestionInputType;
  options?: QuestionOption[];
  defaultValue?: unknown;
  validation?: QuestionValidation;
  ui?: {
    layout?: "stack" | "inline";
    width?: "full" | "half";
  };
  dependency?: QuestionDependency;
  fileRef?: {
    allow: "any" | "csv" | "image" | "pdf" | "email";
    maxSelections?: number;
  };
};

export type ClarifyingQuestionsSchema = {
  schemaVersion: "1.0";
  roundId: string;
  scope: DiagnosticScope;
  fields: QuestionField[];
  submitLabel?: string;
};

export type ClarifyingAnswersPayload = {
  roundId: string;
  scope: ClarifyingQuestionsSchema["scope"];
  answers: Record<string, unknown>;
  meta?: {
    evidenceFileIds?: string[];
    timezone?: string;
  };
};

export type EvidenceInitFile = {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
};

export type EvidenceInitPayload = {
  runId: string;
  files: EvidenceInitFile[];
};

export type EvidenceInitUpload = {
  fileId: string;
  storageKey: string;
  signedUrl: string;
  expiresIn: number;
};

export type EvidenceInitResponse = {
  runId: string;
  uploads: EvidenceInitUpload[];
};

export type EvidenceConfirmFile = {
  fileId: string;
  storageKey: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
};

export type EvidenceConfirmPayload = {
  runId: string;
  files: EvidenceConfirmFile[];
};

export type RunInitPayload = {
  scope?: DiagnosticScope | null;
};

export type RunInitResponse = {
  runId: string;
  status: RunStatus;
};

export type RunStatusQuery = {
  runId: string;
};

export type RunStatusResponse = {
  id: string;
  status: RunStatus;
  scope: DiagnosticScope | null;
  createdAt: string;
  updatedAt: string;
};
