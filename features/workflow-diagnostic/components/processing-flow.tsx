"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { StatusIndicator } from "@/components/ui/status-indicator";
import type { ProcessingStep } from "@/features/workflow-diagnostic/data/processing-steps";

type ProcessingFlowProps = {
  title: string;
  steps: ProcessingStep[];
  supportingText?: string;
  onComplete: () => void;
};

const timing = {
  stepDelayMs: 1200,
  advanceDelayMs: 900,
};

export function ProcessingFlow({
  title,
  steps,
  supportingText,
  onComplete,
}: ProcessingFlowProps) {
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
          onComplete();
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
  }, [activeIndex, onComplete, steps.length]);

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
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
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

      {supportingText ? (
        <p className="text-sm text-muted-foreground">{supportingText}</p>
      ) : null}
    </div>
  );
}
