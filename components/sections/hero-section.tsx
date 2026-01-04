import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <Section className="pt-12">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Automation systems
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl">
              I build automation systems that remove manual work.
            </h1>
            <p className="mt-4 max-w-xl">
              I turn repetitive admin into a simple system so your business runs
              smoothly without more staff.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/audit">
                <Button size="lg">Get a free workflow audit</Button>
              </Link>
              <Link href="/quickstart">
                <Button size="lg" variant="secondary">
                  See the Automation QuickStart
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-10">
              <div className="grid gap-4">
                <div className="h-3 w-24 rounded-full bg-border" />
                <div className="h-3 w-40 rounded-full bg-border" />
                <div className="grid gap-3 rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span>Automation flow</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Live
                    </span>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">
                        Intake captured
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">
                        Processed and routed
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span className="text-sm text-foreground">
                        Outcome delivered
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Placeholder visualization for system overview.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-full border border-border bg-background sm:block" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
