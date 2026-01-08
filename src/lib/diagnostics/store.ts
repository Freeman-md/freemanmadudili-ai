import { DiagnosticRun, EvidenceFile, DiagnosticArtifact } from "./types";
import { RunStatus } from "./states";

const runs = new Map<string, DiagnosticRun>();
const evidence = new Map<string, EvidenceFile[]>();
const artifacts = new Map<string, DiagnosticArtifact[]>();

export function createRun(scope: string | null): DiagnosticRun {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const run: DiagnosticRun = {
    id,
    scope,
    status: RunStatus.CREATED,
    createdAt: now,
    updatedAt: now,
  };

  runs.set(id, run);
  return run;
}

export function getRun(id: string) {
  return runs.get(id) ?? null;
}

export function updateRunStatus(id: string, status: RunStatus) {
  const run = runs.get(id);
  if (!run) return null;

  run.status = status;
  run.updatedAt = new Date().toISOString();
  return run;
}

export function addEvidence(runId: string, file: EvidenceFile) {
  const files = evidence.get(runId) ?? [];
  files.push(file);
  evidence.set(runId, files);
}