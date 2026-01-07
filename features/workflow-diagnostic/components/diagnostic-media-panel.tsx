"use client";

import { useState } from "react";
import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ProgressDots } from "@/features/workflow-diagnostic/components/progress-dots";
import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";

type DiagnosticMediaPanelProps = {
  className?: string;
};

type MediaCardProps = {
  step: {
    id: string;
    title: string;
    description: string;
  };
  activeStep: number;
  totalSteps: number;
  showDots: boolean;
  className?: string;
};

function MediaCard({ step, activeStep, totalSteps, showDots, className }: MediaCardProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-80 overflow-hidden bg-muted",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Workflow visual (placeholder)
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="rounded-2xl bg-background p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Step{" "}
            <motion.span
              key={`media-step-${activeStep}`}
              className="inline-block text-foreground"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeStep + 1}
            </motion.span>{" "}
            of {totalSteps}
          </p>
          <motion.h3
            key={`media-title-${step.id}`}
            className="mt-2 text-lg font-semibold text-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step.title}
          </motion.h3>
          <motion.p
            key={`media-desc-${step.id}`}
            className="mt-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {step.description}
          </motion.p>
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
}: DiagnosticMediaPanelProps) {
  const { currentStep, activeStep, totalSteps } = useDiagnosticFlow();
  const [openItem, setOpenItem] = useState<string | undefined>("media");
  const isOpen = openItem === "media";

  return (
    <div className={cn("w-full", className)}>
      <div className="hidden lg:h-full lg:block">
        <MediaCard
          step={currentStep}
          activeStep={activeStep}
          totalSteps={totalSteps}
          showDots
        />
      </div>

      <div className="lg:hidden">
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
        >
          <AccordionItem
            value="media"
            className="rounded-none border-b border-border bg-transparent px-0"
          >
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4">
                <motion.span
                  key={`accordion-title-${currentStep.id}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {currentStep.title}
                </motion.span>
                {!isOpen ? (
                  <motion.span
                    key={`accordion-step-${activeStep}`}
                    className="text-xs font-semibold text-muted-foreground"
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    Step {activeStep + 1}
                  </motion.span>
                ) : null}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
              <MediaCard
                className="min-h-65"
                step={currentStep}
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
