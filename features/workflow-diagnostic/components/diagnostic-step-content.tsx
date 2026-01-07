import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";
import { LandingStep } from "./steps/landing-step";

type DiagnosticStepContentProps = {
  step: DiagnosticStep;
  onNext: () => void
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

export function DiagnosticStepContent({ step, onNext }: DiagnosticStepContentProps) {
  if (step.id === "landing") {
    return <LandingStep onNext={onNext} />;
  }

  return <PlaceholderStep title={step.title} />;
}
