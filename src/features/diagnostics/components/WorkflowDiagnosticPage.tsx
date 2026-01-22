"use client";

import { Container } from "@/components/layout/container";
import { DiagnosticFormPanel } from "@/features/diagnostics/components/DiagnosticFormPanel";
import { DiagnosticMediaPanel } from "@/features/diagnostics/components/DiagnosticMediaPanel";
import { DiagnosticFlowProvider } from "@/features/diagnostics/context";
import { diagnosticSteps } from "@/features/diagnostics/constants";

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
