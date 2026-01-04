import Link from "next/link";
import { Manrope } from "next/font/google";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AutomationFlowSection } from "@/components/sections/automation-flow-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const displayFont = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export function HeroSection() {
  return (
    <Section className="min-h-screen py-24 sm:py-28">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Workflow Automation
          </span>
          <h1
            className={cn(
              displayFont.className,
              "mt-6 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
            )}
          >
            One manual process at a time. Eliminated.
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            I design and build simple automation systems that remove repetitive
            admin without adding staff.
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className={cn(buttonVariants({ size: "lg" }))} href="/audit">
              Get a free workflow audit
            </Link>
            <Link
              className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
              href="/quickstart"
            >
              See the QuickStart
            </Link>
          </div>
          <AutomationFlowSection className="mt-10 w-full max-w-2xl lg:w-[50vw] lg:max-w-none" />
        </div>
      </Container>
    </Section>
  );
}
