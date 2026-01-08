"use client";

import { Container } from "@/components/layout/container";
import { DiagnosticFormPanel } from "@/features/workflow-diagnostic/components/diagnostic-form-panel";
import { DiagnosticMediaPanel } from "@/features/workflow-diagnostic/components/diagnostic-media-panel";
import { DiagnosticFlowProvider } from "@/features/workflow-diagnostic/context/diagnostic-flow-context";
import { diagnosticSteps } from "@/features/workflow-diagnostic/data/steps";

export function WorkflowDiagnosticPage() {
  return (
    <DiagnosticFlowProvider steps={diagnosticSteps}>
      <div className="min-h-screen bg-white">
        <Container className="px-0! py-8 lg:py-0">
          <div className="grid lg:min-h-screen lg:grid-cols-[2fr_3fr]">
            <DiagnosticMediaPanel className="order-1" />
            <DiagnosticFormPanel className="order-2" />
          </div>
        </Container>
      </div>
    </DiagnosticFlowProvider>
  );
}
