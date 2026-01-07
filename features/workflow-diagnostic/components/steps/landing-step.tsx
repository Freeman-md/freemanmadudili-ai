"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";

type ExpectationListProps = {
    items: string[];
    className?: string;
};

export const expectationBullets = [
    "We diagnose one workflow only",
    "You’ll submit real evidence",
    "You’ll receive a verdict, not a solution",
];

export const landingHints = ["🕒 Takes ~5-7 minutes", "No signup required"];


export function LandingStep() {
   const { goNext } = useDiagnosticFlow();

   return (
     <div className="grid gap-6">
        <ExpectationList items={expectationBullets} />

        <div className="grid gap-3">
            <Button className="w-full" onClick={goNext}>
                Start Diagnostic
            </Button>
            <div className="text-center text-xs text-muted-foreground">
                <p>{landingHints[0]}</p>
                <p>{landingHints[1]}</p>
            </div>
        </div>
    </div>
   )
}

export function ExpectationList({ items, className }: ExpectationListProps) {
    return (
        <div className={cn("grid gap-3", className)}>
            {items.map((item) => (
                <div key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
            ))}
        </div>
    );
}
