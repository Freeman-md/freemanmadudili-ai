import { NextResponse } from "next/server";
import { addEvidence, updateRunStatus } from "@/features/diagnostics/server/store";
import { RunStatus } from "@/types";

export async function POST(req: Request) {
  const formData = await req.formData();
  const runId = formData.get("runId") as string;

  if (!runId) {
    return NextResponse.json({ error: "Missing runId" }, { status: 400 });
  }

  addEvidence(runId, {
    id: crypto.randomUUID(),
    runId,
    filename: "placeholder",
    mimeType: "application/octet-stream",
    storageKey: "temp",
    uploadedAt: new Date().toISOString(),
  });

  updateRunStatus(runId, RunStatus.EVIDENCE_UPLOADED);

  return NextResponse.json({ ok: true });
}
