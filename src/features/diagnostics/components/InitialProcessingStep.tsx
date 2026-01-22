"use client";

import { useDiagnosticFlow } from "@/features/diagnostics/context";
import type { ProcessingStep } from "@/types";
import { ProcessingFlow } from "@/features/diagnostics/components/ProcessingFlow";

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
