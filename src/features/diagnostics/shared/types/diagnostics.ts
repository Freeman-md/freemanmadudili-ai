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

export type DiagnosticRun = {
  id: string;
  status: RunStatus;
  scope: string | null;
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
