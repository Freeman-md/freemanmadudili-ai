import { errorCodeFromStatus, jsonError, jsonOk } from "@/server/api-response";
import { processDiagnosticEvidence } from "@/server/diagnostics/service";

export async function POST(req: Request) {
  const formData = await req.formData().catch(() => null);

  const result = await processDiagnosticEvidence(formData);

  if (!result.ok) {
    return jsonError(
      errorCodeFromStatus(result.status),
      result.error,
      result.status
    );
  }

  return jsonOk(result.data);
}
