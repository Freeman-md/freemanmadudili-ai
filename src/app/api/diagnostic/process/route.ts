import { NextResponse } from "next/server";
import { updateRunStatus } from "@/lib/diagnostics/store";
import { RunStatus } from "@/lib/diagnostics/states";

export async function POST(req: Request) {
  const { runId } = await req.json();

  updateRunStatus(runId, RunStatus.PROCESSING);

  return NextResponse.json({
    status: "processing_started",
  });
}