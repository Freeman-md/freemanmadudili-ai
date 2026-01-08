"use client";

import { useEffect, useMemo } from "react";

import { ClarifyingQuestionsForm } from "@/features/diagnostic/client/components/clarifying-questions/ClarifyingQuestionsForm";
import {
  getMockClarifyingSchema,
  getNextMockRoundId,
} from "@/features/diagnostic/client/data/mock-clarifying-schema";
import { useDiagnosticFlow } from "@/features/diagnostic/client/context/diagnostic-flow-context";
import type { ClarifyingAnswersPayload } from "@/features/diagnostic/client/types/clarifying-schema";

const scopeMap: Record<string, ClarifyingAnswersPayload["scope"]> = {
  "Lead Response": "lead_response",
  "Client Onboarding": "client_onboarding",
  "Ops Handoff": "ops_handoff",
  "Reporting / Visibility": "reporting_visibility",
};

export function ClarifyingQuestionsStep() {
  const {
    selectedScope,
    activeClarifyingRoundId,
    clarifyingSchemasByRound,
    clarifyingRoundOrder,
    setClarifyingSchema,
    setActiveClarifyingRound,
    goToStep,
    steps,
    goNext,
  } = useDiagnosticFlow();

  const scope = useMemo(() => {
    return scopeMap[selectedScope ?? ""] ?? "lead_response";
  }, [selectedScope]);

  useEffect(() => {
    if (!activeClarifyingRoundId) {
      const schema = getMockClarifyingSchema("round_1", scope);
      setClarifyingSchema(schema);
      setActiveClarifyingRound(schema.roundId);
    }
  }, [activeClarifyingRoundId, scope, setActiveClarifyingRound, setClarifyingSchema]);

  const schema = activeClarifyingRoundId
    ? clarifyingSchemasByRound[activeClarifyingRoundId]
    : undefined;

  if (!schema) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading clarifying questions…
      </div>
    );
  }

  const handleSubmit = (payload: ClarifyingAnswersPayload) => {
    console.log("Clarifying answers payload", payload);

    const nextRoundId = getNextMockRoundId(schema.roundId);

    if (nextRoundId) {
      const nextSchema = getMockClarifyingSchema(nextRoundId, scope);
      setClarifyingSchema(nextSchema);
      setActiveClarifyingRound(nextSchema.roundId);
      return;
    }

    goNext();
  };

  const currentRoundIndex = clarifyingRoundOrder.indexOf(schema.roundId);
  const previousRoundId =
    currentRoundIndex > 0 ? clarifyingRoundOrder[currentRoundIndex - 1] : null;
  const evidenceIndex = steps.findIndex((step) => step.id === "evidence_upload");

  const handleBack = () => {
    if (previousRoundId) {
      setActiveClarifyingRound(previousRoundId);
      return;
    }

    if (evidenceIndex >= 0) {
      goToStep(evidenceIndex);
    }
  };

  const submitLabel = getNextMockRoundId(schema.roundId)
    ? "Submit & Continue"
    : schema.submitLabel ?? "Submit for deeper analysis";

  return (
    <ClarifyingQuestionsForm
      schema={{ ...schema, submitLabel }}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}
