import { NextResponse } from "next/server";
import { initDiagnosticRun } from "@/server/diagnostics/service";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await initDiagnosticRun(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
