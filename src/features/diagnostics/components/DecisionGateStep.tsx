"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { decisionOptions, type DecisionOption } from "@/features/diagnostics/constants";
import { useDiagnosticFlow } from "@/features/diagnostics/context";

export function DecisionGateStep() {
  const { decision, setDecision, goNext, goPrevious } = useDiagnosticFlow();

  const handleSelect = (option: DecisionOption) => {
    setDecision({ key: option.key, selectedAt: new Date().toISOString() });
    goNext();
  };

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        {decisionOptions.map((option) => {
          const isSelected = decision?.key === option.key;

          return (
            <div
              key={option.key}
              className={cn(
                "flex h-full flex-col gap-5 rounded-2xl border border-border bg-background p-6 transition",
                option.accent && "border-primary/40 bg-primary/5",
                isSelected && "border-primary/60 shadow-sm"
              )}
            >
              <div className="grid gap-3">
                <p className="text-base font-semibold text-foreground">
                  {option.title}
                </p>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {option.intents.map((intent) => (
                    <li key={intent}>{intent}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  className="w-full"
                  variant={option.accent ? "default" : "secondary"}
                  onClick={() => handleSelect(option)}
                >
                  {option.buttonLabel}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Button variant="secondary" onClick={goPrevious}>
          Back
        </Button>
      </div>
    </div>
  );
}
