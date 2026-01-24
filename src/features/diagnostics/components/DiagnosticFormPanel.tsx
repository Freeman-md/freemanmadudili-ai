"use client";

import { motion } from "motion/react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagnosticStepContent } from "@/features/diagnostics/components/DiagnosticStepContent";
import { useDiagnosticFlow } from "@/features/diagnostics/context";
import { scopeValueByLabel } from "@/features/diagnostics/constants";
import type { ApiResponse } from "@/types/api";
import type { RunInitResponse } from "@/types/diagnostics";

type DiagnosticFormPanelProps = {
  className?: string;
};

export function DiagnosticFormPanel({
  className,
}: DiagnosticFormPanelProps) {
  const {
    steps,
    activeStep,
    currentStep,
    isFirstStep,
    selectedScope,
    uploadedFiles,
    setRunId,
    goNext,
    goPrevious,
  } = useDiagnosticFlow();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isScopeStep = currentStep.id === "scope";
  const isEvidenceStep = currentStep.id === "evidence_upload";
  const isScopeDisabled = !selectedScope || isSubmitting;
  const isEvidenceDisabled = uploadedFiles.length === 0 || isSubmitting;
  const handleScopeContinue = async () => {
    if (!isScopeStep) {
      return;
    }

    const scope = selectedScope ? scopeValueByLabel[selectedScope] : undefined;

    if (!scope) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/diagnostic/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope }),
      });
      const payload = (await response.json()) as ApiResponse<RunInitResponse>;

      if (!payload.ok) {
        console.error(payload.error.message);
        return;
      }

      setRunId(payload.data.runId);
      goNext();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEvidenceContinue = () => {
    if (!isEvidenceStep) {
      return;
    }

    goNext();
  };

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
        <DiagnosticStepContent step={currentStep} />
      </div>

      {isScopeStep && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="secondary"
            onClick={goPrevious}
            disabled={isFirstStep || isSubmitting}
          >
            Back
          </Button>
          <Button onClick={handleScopeContinue} disabled={isScopeDisabled}>
            Continue
          </Button>
        </div>
      )}

      {isEvidenceStep && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="secondary"
            onClick={goPrevious}
            disabled={isFirstStep || isSubmitting}
          >
            Back
          </Button>
          <Button onClick={handleEvidenceContinue} disabled={isEvidenceDisabled}>
            Analyze Evidence
          </Button>
        </div>
      )}
    </div>
  );
}
