"use client";

import { useDiagnosticFlow } from "@/features/diagnostics/context";
import { ProcessingFlow } from "@/features/diagnostics/components/ProcessingFlow";
import { deepAnalysisSteps } from "@/features/diagnostics/constants";

export function DeepAnalysisStep() {
  const { goNext } = useDiagnosticFlow();

  return (
    <ProcessingFlow
      title="Deep diagnostic analysis in progress"
      steps={deepAnalysisSteps}
      supportingText="This may take a moment. You don’t need to do anything."
      onComplete={goNext}
    />
  );
}
