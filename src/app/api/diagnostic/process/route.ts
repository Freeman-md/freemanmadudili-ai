import { errorCodeFromStatus, jsonError, jsonOk } from "@/server/api-response";
import { processDiagnosticEvidence } from "@/server/diagnostics/service";
import { validateProcessEvidenceRequest } from "@/server/diagnostics/validation";
import { buildProcessEvidenceInput } from "@/server/diagnostics/parsers";
import { DiagnosticScope } from "@/types/diagnostics";

export async function POST(req: Request) {
  const formData = await req.formData().catch(() => null);

  if (!formData) {
    return jsonError("bad_request", "Invalid payload", 400);
  }

  const scope = formData.get("scope");
  const metadataRaw = formData.get("metadata");
  const files = formData
    .getAll("files")
    .filter((item): item is File => item instanceof File);

  const validation = validateProcessEvidenceRequest({
    scope,
    metadataRaw,
    files,
  });

  if (!validation.ok) {
    return jsonError(
      errorCodeFromStatus(validation.status),
      validation.error,
      validation.status
    );
  }

  const payload = await buildProcessEvidenceInput({
    scope: validation.data.scope as DiagnosticScope,
    metadata: validation.data.metadata,
    files,
  });

  const result = await processDiagnosticEvidence(payload);

  if (!result.ok) {
    return jsonError(
      errorCodeFromStatus(result.status),
      result.error,
      result.status
    );
  }

  return jsonOk(result.data);
}
