import { z } from "zod";

export const QuestionInputTypeSchema = z.enum([
  "single_select",
  "multi_select",
  "boolean",
  "number",
  "text",
  "textarea",
  "date",
  "time",
  "datetime",
  "email",
  "url",
  "phone",
  "file_ref",
  "rating",
  "currency",
]);

export const QuestionOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().optional(),
});

export const QuestionValidationSchema = z.object({
  required: z.boolean().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
});

export const QuestionDependencySchema = z.object({
  dependsOnKey: z.string().min(1),
  operator: z.enum(["eq", "neq", "in", "not_in", "gt", "gte", "lt", "lte"]),
  value: z.unknown(),
});

export const QuestionFieldSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  helpText: z.string().optional(),
  placeholder: z.string().optional(),
  inputType: QuestionInputTypeSchema,
  options: z.array(QuestionOptionSchema).optional(),
  defaultValue: z.unknown().optional(),
  validation: QuestionValidationSchema.optional(),
  ui: z
    .object({
      layout: z.enum(["stack", "inline"]).optional(),
      width: z.enum(["full", "half"]).optional(),
    })
    .optional(),
  dependency: QuestionDependencySchema.optional(),
  fileRef: z
    .object({
      allow: z.enum(["any", "csv", "image", "pdf", "email"]),
      maxSelections: z.number().optional(),
    })
    .optional(),
});

export const ClarifyingQuestionsSchemaSchema = z.object({
  schemaVersion: z.literal("1.0"),
  roundId: z.string().min(1),
  scope: z.enum([
    "lead_response",
    "client_onboarding",
    "ops_handoff",
    "reporting_visibility",
  ]),
  fields: z.array(QuestionFieldSchema),
  submitLabel: z.string().optional(),
});

export type QuestionInputType = z.infer<typeof QuestionInputTypeSchema>;
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;
export type QuestionValidation = z.infer<typeof QuestionValidationSchema>;
export type QuestionDependency = z.infer<typeof QuestionDependencySchema>;
export type QuestionField = z.infer<typeof QuestionFieldSchema>;
export type ClarifyingQuestionsSchema = z.infer<typeof ClarifyingQuestionsSchemaSchema>;
