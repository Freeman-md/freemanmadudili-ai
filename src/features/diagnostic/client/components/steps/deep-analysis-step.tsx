"use client";

import { useDiagnosticFlow } from "@/features/diagnostic/client/context/diagnostic-flow-context";
import { ProcessingFlow } from "@/features/diagnostic/client/components/processing-flow";
import { deepAnalysisSteps } from "@/features/diagnostic/client/data/deep-analysis-steps";

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
