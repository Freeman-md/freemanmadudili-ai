"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";
import { DiagnosticStepContent } from "@/features/workflow-diagnostic/components/diagnostic-step-content";

type DiagnosticFormPanelProps = {
  className?: string;
  steps: DiagnosticStep[];
  activeStep: number;
  currentStep: DiagnosticStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
};

export function DiagnosticFormPanel({
  className,
  steps,
  activeStep,
  currentStep,
  isFirstStep,
  isLastStep,
  onNext,
  onPrevious,
}: DiagnosticFormPanelProps) {
  return (
    <div className={cn("rounded-3xl bg-card p-8 place-content-center", className)}>
      <div className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Free workflow diagnostic
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Let us map your workflow
        </h1>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step{" "}
          <motion.span
            key={`form-step-${activeStep}`}
            className="inline-block font-semibold text-foreground"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {activeStep + 1}
          </motion.span>{" "}
          of {steps.length}
        </span>
        <motion.span
          key={`form-title-${currentStep.id}`}
          className="font-semibold text-foreground"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {currentStep.title}
        </motion.span>
      </div>

      <div className="mt-6">
        <DiagnosticStepContent onNext={onNext} step={currentStep} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          Back
        </Button>
        <Button onClick={onNext} disabled={isLastStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
