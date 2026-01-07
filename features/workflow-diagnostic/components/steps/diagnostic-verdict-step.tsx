"use client";

import { Button } from "@/components/ui/button";
import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";

export function DiagnosticVerdictStep() {
  const { verdict, goNext, resetDiagnosticFlow } = useDiagnosticFlow();

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {verdict.issues.map((issue) => (
            <div
              key={issue.label}
              className="rounded-2xl border border-border bg-background px-5 py-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {issue.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {issue.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {verdict.insights.map((insight) => (
          <div
            key={insight}
            className="rounded-2xl border border-border bg-background px-5 py-4 text-sm text-foreground"
          >
            {insight}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{verdict.disclaimer}</p>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={goNext}>Proceed to Next Steps</Button>
        <Button variant="secondary" onClick={resetDiagnosticFlow}>
          Restart Audit
        </Button>
      </div>
    </div>
  );
}
