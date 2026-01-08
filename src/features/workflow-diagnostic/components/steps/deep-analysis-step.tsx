"use client";

import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";
import { ProcessingFlow } from "@/features/workflow-diagnostic/components/processing-flow";
import { deepAnalysisSteps } from "@/features/workflow-diagnostic/data/deep-analysis-steps";

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
