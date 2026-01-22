"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useDiagnosticFlow } from "@/features/diagnostics/context";
import type {
  ClarifyingAnswersPayload,
  ClarifyingQuestionsSchema,
} from "@/types";
import { isFieldVisible } from "@/features/diagnostics/utils";
import {
  validateAnswers,
} from "@/features/diagnostics/utils";
import { QuestionFieldRenderer } from "@/features/diagnostics/components/QuestionFieldRenderer";

type ClarifyingQuestionsFormProps = {
  schema: ClarifyingQuestionsSchema;
  onSubmit: (payload: ClarifyingAnswersPayload) => void;
  onBack?: () => void;
};

export function ClarifyingQuestionsForm({
  schema,
  onSubmit,
  onBack,
}: ClarifyingQuestionsFormProps) {
  const {
    clarifyingAnswersByRound,
    setClarifyingAnswer,
    uploadedFiles,
  } = useDiagnosticFlow();
  const [showErrors, setShowErrors] = useState(false);

  const answers = useMemo(
    () => clarifyingAnswersByRound[schema.roundId] ?? {},
    [clarifyingAnswersByRound, schema.roundId]
  );

  const visibleFields = useMemo(
    () => schema.fields.filter((field) => isFieldVisible(field, answers)),
    [answers, schema.fields]
  );

  const validationErrors = useMemo(
    () => validateAnswers(schema, answers, visibleFields),
    [answers, schema, visibleFields]
  );

  const isSubmitDisabled = Object.keys(validationErrors).length > 0;
  const submitLabel = schema.submitLabel ?? "Submit for deeper analysis";

  const handleSubmit = () => {
    setShowErrors(true);
    if (isSubmitDisabled) {
      return;
    }

    const payload: ClarifyingAnswersPayload = {
      roundId: schema.roundId,
      scope: schema.scope,
      answers: buildAnswerPayload(schema, answers),
      meta: {
        evidenceFileIds: uploadedFiles.map((file) => file.id),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    onSubmit(payload);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {visibleFields.map((field) => {
          const fieldValue = answers[field.key];
          const error = showErrors ? validationErrors[field.key] : "";
          const widthClass =
            field.ui?.width === "half" ? "sm:col-span-1" : "sm:col-span-2";

          return (
            <div key={field.key} className={widthClass}>
              <QuestionFieldRenderer
                field={field}
                value={fieldValue}
                error={error}
                uploadedFiles={uploadedFiles}
                onChange={(value) =>
                  setClarifyingAnswer(schema.roundId, field.key, value)
                }
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {onBack ? (
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}

function buildAnswerPayload(
  schema: ClarifyingQuestionsSchema,
  answers: Record<string, unknown>
) {
  return schema.fields.reduce<Record<string, unknown>>((acc, field) => {
    const value = answers[field.key];
    if (value !== undefined && !Number.isNaN(value as number)) {
      acc[field.key] = answers[field.key];
    }
    return acc;
  }, {});
}
