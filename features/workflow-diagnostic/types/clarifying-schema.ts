export type QuestionInputType =
  | "single_select"
  | "multi_select"
  | "boolean"
  | "number"
  | "text"
  | "textarea"
  | "date"
  | "time"
  | "datetime"
  | "email"
  | "url"
  | "phone"
  | "file_ref"
  | "rating"
  | "currency";

export type QuestionOption = {
  label: string;
  value: string;
  description?: string;
};

export type QuestionValidation = {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type QuestionDependency = {
  dependsOnKey: string;
  operator: "eq" | "neq" | "in" | "not_in" | "gt" | "gte" | "lt" | "lte";
  value: unknown;
};

export type QuestionField = {
  key: string;
  label: string;
  helpText?: string;
  placeholder?: string;
  inputType: QuestionInputType;
  options?: QuestionOption[];
  defaultValue?: unknown;
  validation?: QuestionValidation;
  ui?: {
    layout?: "stack" | "inline";
    width?: "full" | "half";
  };
  dependency?: QuestionDependency;
  fileRef?: {
    allow: "any" | "csv" | "image" | "pdf" | "email";
    maxSelections?: number;
  };
};

export type ClarifyingQuestionsSchema = {
  schemaVersion: "1.0";
  roundId: string;
  scope:
    | "lead_response"
    | "client_onboarding"
    | "ops_handoff"
    | "reporting_visibility";
  fields: QuestionField[];
  submitLabel?: string;
};

export type ClarifyingAnswersPayload = {
  roundId: string;
  scope: ClarifyingQuestionsSchema["scope"];
  answers: Record<string, unknown>;
  meta?: {
    evidenceFileIds?: string[];
    timezone?: string;
  };
};
