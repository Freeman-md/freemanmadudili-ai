import type {
  DiagnosticScope as PrismaDiagnosticScope,
  RunStatus as PrismaRunStatus,
} from "@prisma/client";
import type {
  ClarifyingQuestionsSchema,
  QuestionDependency,
  QuestionField,
  QuestionInputType,
  QuestionOption,
  QuestionValidation,
} from "@/features/diagnostics/schema";

export type DiagnosticScope = PrismaDiagnosticScope;
export type RunStatus = PrismaRunStatus;

export type ValidationErrors = Record<string, string>;

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

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

export type {
  QuestionInputType,
  QuestionOption,
  QuestionValidation,
  QuestionDependency,
  QuestionField,
  ClarifyingQuestionsSchema,
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

export type ExtractEvidenceResponse = {
  text: string;
};

export type ProcessEvidenceDecision = "reject" | "clarify" | "proceed";

export type ProcessEvidenceResponse = {
  decision: ProcessEvidenceDecision;
  reason?: string;
  clarifyingSchema?: ClarifyingQuestionsSchema;
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

export type RunInitResponse = {
  runId: string;
  status: RunStatus;
};

export type RunStatusResponse = {
  id: string;
  status: RunStatus;
  scope: DiagnosticScope | null;
  createdAt: string;
  updatedAt: string;
};
