import type { ClarifyingQuestionsSchema } from "@/features/workflow-diagnostic/types/clarifying-schema";

const roundOneFields: ClarifyingQuestionsSchema["fields"] = [
  {
    key: "response_owner",
    label: "Who owns first response?",
    inputType: "single_select",
    options: [
      { label: "Sales rep", value: "sales" },
      { label: "Founder", value: "founder" },
      { label: "Operations", value: "ops" },
    ],
    validation: { required: true },
  },
  {
    key: "no_response_action",
    label: "What happens if no one responds?",
    inputType: "single_select",
    options: [
      { label: "Lead is lost", value: "lost" },
      { label: "Manual follow-up later", value: "follow_up" },
      { label: "Auto reminder", value: "auto_reminder" },
    ],
    validation: { required: true },
    dependency: {
      dependsOnKey: "response_owner",
      operator: "neq",
      value: "ops",
    },
  },
  {
    key: "leads_last_7_days",
    label: "Leads in last 7 days",
    inputType: "number",
    validation: { required: true, min: 0 },
    placeholder: "0",
  },
  {
    key: "approval_manual",
    label: "Is approval manually updated?",
    inputType: "boolean",
    validation: { required: true },
  },
  {
    key: "handoff_channels",
    label: "Where are responses logged?",
    inputType: "multi_select",
    options: [
      { label: "CRM", value: "crm" },
      { label: "Email", value: "email" },
      { label: "Spreadsheet", value: "sheet" },
    ],
    validation: { required: true },
  },
  {
    key: "handoff_file_ref",
    label: "Which file shows handoff time?",
    inputType: "file_ref",
    fileRef: {
      allow: "any",
      maxSelections: 1,
    },
    validation: { required: true },
  },
];

const roundTwoFields: ClarifyingQuestionsSchema["fields"] = [
  {
    key: "response_time_rating",
    label: "Rate current response speed",
    inputType: "rating",
    validation: { required: true, min: 1, max: 5 },
  },
  {
    key: "response_time_goal",
    label: "Target response time (hours)",
    inputType: "number",
    validation: { required: true, min: 0 },
  },
  {
    key: "handoff_notes",
    label: "Anything that slows the handoff?",
    inputType: "textarea",
    validation: { maxLength: 200 },
    placeholder: "Short note only",
  },
];

export const mockClarifyingSchemas: ClarifyingQuestionsSchema[] = [
  {
    schemaVersion: "1.0",
    roundId: "round_1",
    scope: "lead_response",
    fields: roundOneFields,
  },
  {
    schemaVersion: "1.0",
    roundId: "round_2",
    scope: "lead_response",
    fields: roundTwoFields,
  },
  {
    schemaVersion: "1.0",
    roundId: "round_3",
    scope: "lead_response",
    fields: roundTwoFields,
    submitLabel: "Submit for deeper analysis",
  },
];

export const mockClarifyingRoundOrder = mockClarifyingSchemas.map(
  (schema) => schema.roundId
);

export function getNextMockRoundId(currentRoundId: string) {
  const currentIndex = mockClarifyingRoundOrder.indexOf(currentRoundId);
  if (currentIndex === -1) {
    return null;
  }
  return mockClarifyingRoundOrder[currentIndex + 1] ?? null;
}

export function getMockClarifyingSchema(
  roundId: string,
  scope: ClarifyingQuestionsSchema["scope"]
) {
  const baseSchema = mockClarifyingSchemas.find(
    (schema) => schema.roundId === roundId
  );

  if (!baseSchema) {
    throw new Error(`Missing clarifying schema for ${roundId}`);
  }

  return {
    ...baseSchema,
    scope,
  };
}
