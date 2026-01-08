import type {
  QuestionDependency,
  QuestionField,
} from "@/features/diagnostics/client/types/clarifying-schema";

export function isFieldVisible(
  field: QuestionField,
  answers: Record<string, unknown>
) {
  if (!field.dependency) {
    return true;
  }

  return evaluateDependency(field.dependency, answers);
}

function evaluateDependency(
  dependency: QuestionDependency,
  answers: Record<string, unknown>
) {
  const actualValue = answers[dependency.dependsOnKey];
  const expectedValue = dependency.value;

  switch (dependency.operator) {
    case "eq":
      return actualValue === expectedValue;
    case "neq":
      return actualValue !== expectedValue;
    case "in":
      return Array.isArray(expectedValue)
        ? expectedValue.includes(actualValue)
        : false;
    case "not_in":
      return Array.isArray(expectedValue)
        ? !expectedValue.includes(actualValue)
        : true;
    case "gt":
      return Number(actualValue) > Number(expectedValue);
    case "gte":
      return Number(actualValue) >= Number(expectedValue);
    case "lt":
      return Number(actualValue) < Number(expectedValue);
    case "lte":
      return Number(actualValue) <= Number(expectedValue);
    default:
      return true;
  }
}
