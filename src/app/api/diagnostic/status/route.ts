import { NextResponse } from "next/server";
import { getDiagnosticRunStatus } from "@/server/diagnostics/service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const runId = searchParams.get("runId");

  const result = await getDiagnosticRunStatus({ runId });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data.run);
}
