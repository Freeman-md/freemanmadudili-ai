import { NextResponse } from "next/server";
import { createRun } from "@/lib/diagnostics/store";

export async function POST(req: Request) {
  const body = await req.json();
  const scope = body.scope ?? null;

  const run = createRun(scope);

  return NextResponse.json({
    runId: run.id,
    status: run.status,
  });
}