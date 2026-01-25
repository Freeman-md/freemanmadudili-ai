import { errorCodeFromStatus, jsonError, jsonOk } from "@/server/api-response";
import { processDiagnosticEvidence } from "@/server/diagnostics/service";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
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
