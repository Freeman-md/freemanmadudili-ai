import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <Section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Ready to remove one manual process?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Start with a free audit or automate one process in 72 hours.
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
