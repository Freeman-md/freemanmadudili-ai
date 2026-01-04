import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const steps = [
  {
    title: "Audit",
    description: "We identify where manual work is costing you time and money.",
  },
  {
    title: "Build",
    description: "I design and implement the automation system.",
  },
  {
    title: "Test",
    description: "We test with real inputs and edge cases.",
  },
  {
    title: "Handover",
    description: "You get a clear walkthrough and a working system.",
  },
];

export function HowItWorksSection() {
  return (
    <Section>
      <Container>
        <div>
          <h2>How it works</h2>
          <p className="mt-3 max-w-2xl">
            A focused process that keeps delivery fast and predictable.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
