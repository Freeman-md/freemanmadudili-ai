import { updateRunStatus } from "@/server/diagnostics/repo";
import { RunStatus } from "@prisma/client";
import { jsonOk } from "@/server/api-response";

export async function POST(req: Request) {
  const { runId } = await req.json();

  await updateRunStatus(runId, RunStatus.processing);

  return jsonOk({ status: "processing_started" });
}
