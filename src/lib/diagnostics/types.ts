import { ArtifactType } from "./artifacts";
import { RunStatus } from "./states";

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