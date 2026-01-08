import type { Metadata } from "next";

import { WorkflowDiagnosticPage } from "@/features/diagnostic/client/components/workflow-diagnostic-page";

export const metadata: Metadata = {
  title: "Free Workflow Diagnostic",
  description:
    "A short, structured workflow diagnostic to identify automation opportunities.",
};

export default function AuditPage() {
  return <WorkflowDiagnosticPage />;
}
