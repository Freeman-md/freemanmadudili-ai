import { NextResponse } from "next/server";
import { updateRunStatus } from "@/features/diagnostics/server/store";
import { RunStatus } from "@/features/diagnostics/shared/types";

export async function POST(req: Request) {
  const { runId } = await req.json();

  updateRunStatus(runId, RunStatus.PROCESSING);

  return NextResponse.json({
    status: "processing_started",
  });
}
