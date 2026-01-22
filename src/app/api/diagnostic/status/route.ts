import { getDiagnosticRunStatus } from "@/server/diagnostics/service";
import {
  errorCodeFromStatus,
  jsonError,
  jsonOk,
} from "@/server/api-response";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const runId = searchParams.get("runId");

  const result = await getDiagnosticRunStatus({ runId });

  if (!result.ok) {
    return jsonError(
      errorCodeFromStatus(result.status),
      result.error,
      result.status
    );
  }

  return jsonOk(result.data.run);
}
