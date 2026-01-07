"use client";

import { Container } from "@/components/layout/container";
import { DiagnosticFormPanel } from "@/features/workflow-diagnostic/components/diagnostic-form-panel";
import { DiagnosticMediaPanel } from "@/features/workflow-diagnostic/components/diagnostic-media-panel";
import { diagnosticSteps } from "@/features/workflow-diagnostic/data/steps";
import { useDiagnosticSteps } from "@/features/workflow-diagnostic/hooks/use-diagnostic-steps";

export function WorkflowDiagnosticPage() {
  const {
    activeStep,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goNext,
    goPrevious,
  } = useDiagnosticSteps(diagnosticSteps);

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8 lg:py-0 px-0!">
        <div className="grid lg:min-h-screen lg:grid-cols-[2fr_3fr] lg:gap-8">
          <DiagnosticMediaPanel
            className="order-1"
            step={currentStep}
            activeStep={activeStep}
            totalSteps={totalSteps}
          />
          <DiagnosticFormPanel
            className="order-2"
            steps={diagnosticSteps}
            activeStep={activeStep}
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onNext={goNext}
            onPrevious={goPrevious}
          />
        </div>
      </Container>
    </div>
  );
}
