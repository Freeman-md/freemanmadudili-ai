"use client";

import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";
import type { ProcessingStep } from "@/features/workflow-diagnostic/data/processing-steps";
import { ProcessingFlow } from "@/features/workflow-diagnostic/components/processing-flow";

type InitialProcessingStepProps = {
  steps: ProcessingStep[];
};

export function InitialProcessingStep({ steps }: InitialProcessingStepProps) {
  const { goNext } = useDiagnosticFlow();

  return (
    <ProcessingFlow
      title="Processing your evidence"
      steps={steps}
      supportingText="This may take a moment. You don’t need to do anything."
      onComplete={goNext}
    />
  );
}
