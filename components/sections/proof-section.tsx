import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const proofs = [
  {
    title: "Order follow-up automation",
    problem: "Manual, slow, error-prone order follow-ups across inboxes.",
    system: "Intake sync + auto-triage + routed responses.",
    outcome: "Hours saved weekly and faster response times.",
  },
  {
    title: "Lead qualification routing",
    problem: "Leads stuck in spreadsheets with inconsistent handoffs.",
    system: "Form capture + enrichment + auto-assignment.",
    outcome: "Fewer missed leads and consistent follow-up.",
  },
  {
    title: "Operations task sync",
    problem: "Teams copying data between tools manually.",
    system: "System-to-system sync with approvals.",
    outcome: "Reduced errors and predictable handoffs.",
  },
];

export function ProofSection() {
  return (
    <Section className="bg-card">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2>Proof</h2>
            <p className="mt-3 max-w-2xl">
              Real examples of how manual work can be removed.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Demo projects shown until live client work replaces them.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {proofs.map((proof) => (
            <div
              key={proof.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-background p-6"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>Demo case</span>
                <span>Workflow</span>
              </div>
              <h3 className="mt-4 text-xl">{proof.title}</h3>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Problem: </span>
                  {proof.problem}
                </p>
                <p>
                  <span className="font-semibold text-foreground">System: </span>
                  {proof.system}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Outcome: </span>
                  {proof.outcome}
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-5 text-center text-xs text-muted-foreground">
                Screenshot + Loom thumbnail
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
