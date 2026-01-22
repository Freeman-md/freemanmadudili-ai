"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDiagnosticFlow } from "@/features/diagnostics/context";
import { scopeOptions } from "@/features/diagnostics/constants";
import { cn } from "@/lib/utils";

export function ScopeStep() {
  const { selectedScope, setScope } = useDiagnosticFlow();

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Select the single workflow you want diagnosed.
      </p>
      <RadioGroup
        value={selectedScope ?? ""}
        onValueChange={setScope}
        className="grid gap-3"
      >
        {scopeOptions.map((option) => {
          const isSelected = selectedScope === option;

          return (
            <Label
              key={option}
              className={cn(
                "flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition",
                isSelected && "border-primary/30 bg-primary/5"
              )}
            >
              <RadioGroupItem value={option} />
              {option}
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
