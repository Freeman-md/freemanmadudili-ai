"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { StatusIndicator } from "@/components/ui/status-indicator";
import type { ProcessingStep } from "@/features/workflow-diagnostic/data/processing-steps";
import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";

type InitialProcessingStepProps = {
  steps: ProcessingStep[];
};

const timing = {
  stepDelayMs: 3000,
  advanceDelayMs: 900,
};

export function InitialProcessingStep({ steps }: InitialProcessingStepProps) {
  const { goNext } = useDiagnosticFlow();
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedIndex, setCompletedIndex] = useState(-1);
  const hasAdvancedRef = useRef(false);

  useEffect(() => {
    if (!steps.length) {
      return;
    }

    if (activeIndex >= steps.length) {
      if (!hasAdvancedRef.current) {
        hasAdvancedRef.current = true;
        const timer = setTimeout(() => {
          goNext();
        }, timing.advanceDelayMs);

        return () => clearTimeout(timer);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCompletedIndex(activeIndex);
      setActiveIndex((prev) => prev + 1);
    }, timing.stepDelayMs);

    return () => clearTimeout(timer);
  }, [activeIndex, goNext, steps.length]);

  const visibleSteps = useMemo(() => {
    const lastIndex = Math.min(
      steps.length - 1,
      Math.max(activeIndex, completedIndex)
    );
    return steps.slice(0, lastIndex + 1);
  }, [activeIndex, completedIndex, steps]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h3 className="text-lg font-semibold text-foreground">
          Processing your evidence
        </h3>
      </div>

      <div className="grid gap-3">
        <AnimatePresence>
          {visibleSteps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index <= completedIndex;
            const state = isComplete ? "complete" : isActive ? "active" : "pending";

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <StatusIndicator state={state} size="lg" />
                <span
                  className={
                    isComplete
                      ? "text-foreground"
                      : "text-muted-foreground/80"
                  }
                >
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-sm text-muted-foreground">
        This may take a moment. You don’t need to do anything.
      </p>
    </div>
  );
}
