"use client";

import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";
import { ProgressDots } from "@/features/workflow-diagnostic/components/progress-dots";

type DiagnosticMediaPanelProps = {
  className?: string;
  step: DiagnosticStep;
  activeStep: number;
  totalSteps: number;
};

type MediaCardProps = {
  step: DiagnosticStep;
  activeStep: number;
  totalSteps: number;
  showDots: boolean;
  className?: string;
};

function MediaCard({ step, activeStep, totalSteps, showDots, className }: MediaCardProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[320px] overflow-hidden rounded-3xl bg-muted",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Workflow visual (placeholder)
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="rounded-2xl bg-background p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Step {activeStep + 1} of {totalSteps}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          {showDots ? (
            <ProgressDots className="mt-4" total={totalSteps} activeIndex={activeStep} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function DiagnosticMediaPanel({
  className,
  step,
  activeStep,
  totalSteps,
}: DiagnosticMediaPanelProps) {
  const [openItem, setOpenItem] = useState<string | undefined>("media");
  const isOpen = openItem === "media";

  return (
    <div className={cn("w-full", className)}>
      <div className="hidden h-full lg:block">
        <MediaCard step={step} activeStep={activeStep} totalSteps={totalSteps} showDots />
      </div>

      <div className="lg:hidden">
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
        >
          <AccordionItem value="media" className="border border-border rounded-2xl bg-card px-4">
            <AccordionTrigger className="py-3 text-sm font-semibold text-foreground hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4">
                <span>{step.title}</span>
                {!isOpen ? (
                  <span className="text-xs font-semibold text-muted-foreground">
                    Step {activeStep + 1}
                  </span>
                ) : null}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <MediaCard
                className="min-h-[260px]"
                step={step}
                activeStep={activeStep}
                totalSteps={totalSteps}
                showDots={isOpen}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
