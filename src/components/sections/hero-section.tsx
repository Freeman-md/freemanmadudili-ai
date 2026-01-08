import Link from "next/link";
import { Ubuntu } from "next/font/google";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const displayFont = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export function HeroSection() {
  return (
    <Section className="py-24">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Workflow Automation
          </span>
          <h1
            className={cn(
              displayFont.className,
              "mt-6 text-5xl font-extrabold leading-[1.05] text-muted-foreground sm:text-6xl lg:text-7xl"
            )}
          >
            One <span className="text-foreground">manual</span> process at a time.{" "}
            <span className="text-foreground">Eliminated.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-normal text-muted-foreground">
            I remove the repetitive admin slowing your business down, without hiring more staff.
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
        </div>
      </Container>
    </Section>
  );
}
