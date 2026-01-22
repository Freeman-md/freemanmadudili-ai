import { NextResponse } from "next/server";
import { updateRunStatus } from "@/server/diagnostics/repo";
import { RunStatus } from "@/types";

export async function POST(req: Request) {
  const { runId } = await req.json();

  updateRunStatus(runId, RunStatus.PROCESSING);

  return NextResponse.json({
    status: "processing_started",
  });
}
