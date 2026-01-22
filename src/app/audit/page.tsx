import { WorkflowDiagnosticPage } from "@/features/diagnostics/components/WorkflowDiagnosticPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Free Workflow Diagnostic",
  description:
    "A short, structured workflow diagnostic to identify automation opportunities.",
};

export default function AuditPage() {
  return <WorkflowDiagnosticPage />;
}
