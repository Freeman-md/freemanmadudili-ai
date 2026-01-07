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
    <div className="min-h-screen bg-background">
      <Container className="p-0!">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr] min-h-screen">
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
