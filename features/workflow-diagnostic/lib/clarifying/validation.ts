import type {
  ClarifyingQuestionsSchema,
  QuestionField,
} from "@/features/workflow-diagnostic/types/clarifying-schema";

export type ValidationErrors = Record<string, string>;

export function validateAnswers(
  schema: ClarifyingQuestionsSchema,
  answers: Record<string, unknown>,
  fields: QuestionField[]
) {
  const errors: ValidationErrors = {};

  fields.forEach((field) => {
    const error = validateField(field, answers[field.key]);
    if (error) {
      errors[field.key] = error;
    }
  });

  return errors;
}

function isEmptyValue(value: unknown) {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}

function validateField(field: QuestionField, value: unknown) {
  const validation = field.validation;

  if (validation?.required && isEmptyValue(value)) {
    return "Required";
  }

  if (isEmptyValue(value)) {
    return "";
  }

  if (typeof value === "number") {
    if (Number.isNaN(value)) {
      return validation?.required ? "Required" : "";
    }
    if (validation?.min !== undefined && value < validation.min) {
      return "Too small";
    }
    if (validation?.max !== undefined && value > validation.max) {
      return "Too large";
    }
  }

  if (typeof value === "string") {
    if (validation?.minLength && value.length < validation.minLength) {
      return "Too short";
    }
    if (validation?.maxLength && value.length > validation.maxLength) {
      return "Too long";
    }
    if (validation?.pattern) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        return "Invalid value";
      }
    }
  }

  if (field.inputType === "email" && typeof value === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email";
    }
  }

  if (field.inputType === "url" && typeof value === "string") {
    try {
      new URL(value);
    } catch {
      return "Invalid URL";
    }
  }

  if (field.inputType === "phone" && typeof value === "string") {
    const phoneRegex = /^[0-9+()\s-]{7,}$/;
    if (!phoneRegex.test(value)) {
      return "Invalid phone";
    }
  }

  if (field.inputType === "rating" && typeof value === "number") {
    if (value < 1 || value > 5) {
      return "Invalid value";
    }
  }

  if (field.inputType === "file_ref") {
    if (field.fileRef?.maxSelections && Array.isArray(value)) {
      if (value.length > field.fileRef.maxSelections) {
        return "Too many files";
      }
    }
  }

  return "";
}
