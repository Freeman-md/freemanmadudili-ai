import { initDiagnosticRun } from "@/server/diagnostics/service";
import {
  errorCodeFromStatus,
  jsonError,
  jsonOk,
} from "@/server/api-response";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await initDiagnosticRun(body);

  if (!result.ok) {
    return jsonError(
      errorCodeFromStatus(result.status),
      result.error,
      result.status
    );
  }

  return jsonOk(result.data);
}
