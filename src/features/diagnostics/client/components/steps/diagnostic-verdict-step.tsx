"use client";

import { Button } from "@/components/ui/button";
import { useDiagnosticFlow } from "@/features/diagnostics/client/context/diagnostic-flow-context";

export function DiagnosticVerdictStep() {
  const { verdict, goNext, resetDiagnosticFlow } = useDiagnosticFlow();

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Quantified Issues
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Reframed Insights
        </p>
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
      </div>

      <p className="text-sm text-muted-foreground">{verdict.disclaimer}</p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={resetDiagnosticFlow}>
          Restart Audit
        </Button>
        <Button onClick={goNext}>Proceed to Next Steps</Button>
      </div>
    </div>
  );
}
