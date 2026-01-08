-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('created', 'evidence_uploaded', 'processing', 'awaiting_clarifying_answers', 'deep_analysis', 'report_ready', 'emailed', 'failed');

-- CreateEnum
CREATE TYPE "DiagnosticScope" AS ENUM ('lead_response', 'client_onboarding', 'ops_handoff', 'reporting_visibility');

-- CreateEnum
CREATE TYPE "ArtifactType" AS ENUM ('normalized_evidence', 'clarifying_questions', 'clarifying_answers', 'analysis', 'verdict', 'report');

-- CreateEnum
CREATE TYPE "EvidenceStatus" AS ENUM ('uploaded', 'parsing', 'parsed', 'failed');

-- CreateEnum
CREATE TYPE "ClarifyingRoundStatus" AS ENUM ('pending', 'answered', 'expired');

-- CreateTable
CREATE TABLE "diagnostic_runs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scope" "DiagnosticScope",
    "status" "RunStatus" NOT NULL,
    "userEmail" TEXT,
    "metadataJson" JSONB,

    CONSTRAINT "diagnostic_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_files" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "sha256" TEXT,
    "status" "EvidenceStatus" NOT NULL,
    "parsedMetaJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidence_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "run_artifacts" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "kind" "ArtifactType" NOT NULL,
    "version" INTEGER NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "run_artifacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "run_events" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "seq" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "payloadJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "run_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clarifying_rounds" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "roundId" INTEGER NOT NULL,
    "schemaJson" JSONB NOT NULL,
    "status" "ClarifyingRoundStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clarifying_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clarifying_answers" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "roundId" INTEGER NOT NULL,
    "answersJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clarifying_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "evidence_files_runId_idx" ON "evidence_files"("runId");

-- CreateIndex
CREATE INDEX "run_artifacts_runId_idx" ON "run_artifacts"("runId");

-- CreateIndex
CREATE INDEX "run_events_runId_idx" ON "run_events"("runId");

-- CreateIndex
CREATE UNIQUE INDEX "run_events_runId_seq_key" ON "run_events"("runId", "seq");

-- CreateIndex
CREATE INDEX "clarifying_rounds_runId_idx" ON "clarifying_rounds"("runId");

-- CreateIndex
CREATE INDEX "clarifying_answers_runId_idx" ON "clarifying_answers"("runId");

-- AddForeignKey
ALTER TABLE "evidence_files" ADD CONSTRAINT "evidence_files_runId_fkey" FOREIGN KEY ("runId") REFERENCES "diagnostic_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_artifacts" ADD CONSTRAINT "run_artifacts_runId_fkey" FOREIGN KEY ("runId") REFERENCES "diagnostic_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_events" ADD CONSTRAINT "run_events_runId_fkey" FOREIGN KEY ("runId") REFERENCES "diagnostic_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clarifying_rounds" ADD CONSTRAINT "clarifying_rounds_runId_fkey" FOREIGN KEY ("runId") REFERENCES "diagnostic_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clarifying_answers" ADD CONSTRAINT "clarifying_answers_runId_fkey" FOREIGN KEY ("runId") REFERENCES "diagnostic_runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
