import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2>Services</h2>
            <p className="mt-3 max-w-2xl">
              Focused offers to remove manual work without dragging you into a
              long implementation.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Automation QuickStart
            </p>
            <h3 className="mt-3 text-2xl">72-hour setup</h3>
            <p className="mt-4">
              Automate one painful manual process into a simple, reliable
              system.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
              <li>Fixed scope</li>
              <li>Delivered in 48–72 hours</li>
              <li>One process, end-to-end</li>
            </ul>
            <p className="mt-6 text-sm font-semibold text-foreground">
              Price: $497
            </p>
            <div className="mt-6">
              <Link href="/quickstart">
                <Button size="lg">Start QuickStart</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Operations Automation Ecosystem
            </p>
            <h3 className="mt-3 text-2xl">Custom operations build</h3>
            <p className="mt-4">
              Redesign and automate your operations so manual work stops being
              your bottleneck.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
              <li>Workflow audit and bottleneck mapping</li>
              <li>Multiple workflows automated</li>
              <li>Human-in-the-loop approvals</li>
              <li>Monitoring, documentation, and handover</li>
            </ul>
            <p className="mt-6 text-sm font-semibold text-foreground">
              Projects typically start from $3,000+
            </p>
            <div className="mt-6">
              <Link href="/audit">
                <Button size="lg" variant="secondary">
                  Book a workflow audit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
