"use client";

import { useState } from "react";

import { scopeValueByLabel } from "@/features/diagnostics/constants";
import { useDiagnosticFlow } from "@/features/diagnostics/context";
import type { ApiResponse } from "@/types/api";
import type { RunInitResponse } from "@/types/diagnostics";

export function useDiagnosticActions() {
  const {
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

  return {
    isScopeStep,
    isEvidenceStep,
    isScopeDisabled,
    isEvidenceDisabled,
    isSubmitting,
    isFirstStep,
    handleScopeContinue,
    handleEvidenceContinue,
    goPrevious,
  };
}
