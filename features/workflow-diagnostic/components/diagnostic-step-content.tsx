import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";
import { LandingStep } from "./steps/landing-step";
import { ScopeStep } from "./steps/scope-step";

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

  return <PlaceholderStep title={step.title} />;
}
