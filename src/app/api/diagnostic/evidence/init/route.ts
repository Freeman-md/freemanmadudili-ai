import { NextResponse } from "next/server";

import { initEvidenceUpload } from "@/server/diagnostics/service";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await initEvidenceUpload(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
