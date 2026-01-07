"use client";

import { useEffect, useMemo } from "react";

import { ClarifyingQuestionsForm } from "@/features/workflow-diagnostic/components/clarifying-questions/ClarifyingQuestionsForm";
import { getMockClarifyingSchema } from "@/features/workflow-diagnostic/data/mock-clarifying-schema";
import { useDiagnosticFlow } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";
import type { ClarifyingAnswersPayload } from "@/features/workflow-diagnostic/types/clarifying-schema";

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

    if (schema.roundId === "round_1") {
      const nextSchema = getMockClarifyingSchema("round_2", scope);
      setClarifyingSchema(nextSchema);
      setActiveClarifyingRound(nextSchema.roundId);
      return;
    }

    goNext();
  };

  const evidenceIndex = steps.findIndex((step) => step.id === "evidence_upload");
  const handleBack = () => {
    if (evidenceIndex >= 0) {
      goToStep(evidenceIndex);
    }
  };

  return (
    <ClarifyingQuestionsForm
      schema={schema}
      onSubmit={handleSubmit}
      onBack={schema.roundId === "round_1" ? handleBack : undefined}
    />
  );
}
