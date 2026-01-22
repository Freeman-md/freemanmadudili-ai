import { NextResponse } from "next/server";
import { updateRunStatus } from "@/server/diagnostics/repo";
import { RunStatus } from "@prisma/client";

export async function POST(req: Request) {
  const { runId } = await req.json();

  await updateRunStatus(runId, RunStatus.processing);

  return NextResponse.json({
    status: "processing_started",
  });
}
