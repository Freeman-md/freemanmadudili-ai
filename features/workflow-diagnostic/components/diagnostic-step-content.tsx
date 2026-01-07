import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";

type DiagnosticStepContentProps = {
  step: DiagnosticStep;
};

function IntroStep() {
  return (
    <div className="grid gap-3">
      <h3 className="text-lg font-semibold text-foreground">
        Welcome to the workflow diagnostic
      </h3>
      <p className="text-sm text-muted-foreground">
        This short intake maps the manual process you want to fix. You can stop
        at any time and return later.
      </p>
    </div>
  );
}

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
  if (step.id === "intro") {
    return <IntroStep />;
  }

  return <PlaceholderStep title={step.title} />;
}
