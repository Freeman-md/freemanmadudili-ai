import type { DiagnosticStep } from "@/types/diagnostics";
import { LandingStep } from "./LandingStep";
import { ScopeStep } from "./ScopeStep";
import { EvidenceUploadStep } from "./EvidenceUploadStep";
import { InitialProcessingStep } from "./InitialProcessingStep";
import { processingSteps } from "@/features/diagnostics/constants";
import { ClarifyingQuestionsStep } from "./ClarifyingQuestionsStep";
import { DeepAnalysisStep } from "./DeepAnalysisStep";
import { DiagnosticVerdictStep } from "./DiagnosticVerdictStep";
import { DecisionGateStep } from "./DecisionGateStep";

type DiagnosticStepContentProps = {
  step: DiagnosticStep;
};

function PlaceholderStep({ title }: { title: string }) {
  return (
    <div className="grid gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-5">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">
        Placeholder content for the next step. This will be added shortly.
      </p>
    </div>
  );
}

export function DiagnosticStepContent({ step }: DiagnosticStepContentProps) {
  if (step.id === "landing") {
    return <LandingStep />;
  }

  if (step.id === "scope") {
    return <ScopeStep />;
  }

  if (step.id === "evidence_upload") {
    return <EvidenceUploadStep />;
  }

  if (step.id === "initial_processing") {
    return <InitialProcessingStep steps={processingSteps} />;
  }

  if (step.id === "clarifying_inputs") {
    return <ClarifyingQuestionsStep />;
  }

  if (step.id === "deep_analysis") {
    return <DeepAnalysisStep />;
  }

  if (step.id === "verdict") {
    return <DiagnosticVerdictStep />;
  }

  if (step.id === "decision") {
    return <DecisionGateStep />;
  }

  return <PlaceholderStep title={step.title} />;
}
