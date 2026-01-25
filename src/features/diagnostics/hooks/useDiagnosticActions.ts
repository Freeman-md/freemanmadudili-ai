"use client";

import { useState } from "react";

import { scopeValueByLabel } from "@/features/diagnostics/constants";
import { useDiagnosticFlow } from "@/features/diagnostics/context";

export function useDiagnosticActions() {
  const {
    currentStep,
    isFirstStep,
    selectedScope,
    uploadedFiles,
    goNext,
    goPrevious,
  } = useDiagnosticFlow();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isScopeStep = currentStep.id === "scope";
  const isEvidenceStep = currentStep.id === "evidence_upload";
  const isScopeDisabled = !selectedScope || isSubmitting;
  const isEvidenceDisabled = uploadedFiles.length === 0 || isSubmitting;

  const handleScopeContinue = () => {
    if (!isScopeStep) {
      return;
    }

    goNext();
  };

  const handleEvidenceContinue = async () => {
    if (!isEvidenceStep) {
      return;
    }

    const scope = selectedScope ? scopeValueByLabel[selectedScope] : undefined;

    if (!scope) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/diagnostic/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope,
          files: uploadedFiles.map((file) => ({
            id: file.id,
            name: file.file?.name ?? file.name,
            mimeType: file.file?.type ?? "application/octet-stream",
            sizeBytes: file.file?.size ?? 0,
          })),
        }),
      });
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setIsSubmitting(false);
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
