import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";
import { DiagnosticStepContent } from "@/features/workflow-diagnostic/components/diagnostic-step-content";

type DiagnosticFormPanelProps = {
  className?: string;
  steps: DiagnosticStep[];
  activeStep: number;
  currentStep: DiagnosticStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
};

export function DiagnosticFormPanel({
  className,
  steps,
  activeStep,
  currentStep,
  isFirstStep,
  isLastStep,
  onNext,
  onPrevious,
}: DiagnosticFormPanelProps) {
  return (
    <div className={cn("bg-card p-8 place-content-center", className)}>
      <div className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Free workflow diagnostic
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Let us map your workflow
        </h1>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
        <span className="font-semibold text-foreground">{currentStep.title}</span>
      </div>

      <div className="mt-6">
        <DiagnosticStepContent step={currentStep} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          Back
        </Button>
        <Button onClick={onNext} disabled={isLastStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
