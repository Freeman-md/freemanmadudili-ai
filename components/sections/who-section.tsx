import { Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { whoSignals } from "@/lib/data/who-signals";

export function WhoSection() {
  return (
    <Section className="bg-[#f8f7f4] py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            You&rsquo;ll recognize this if&hellip;
          </h2>
          <p className="mt-4 text-lg font-normal text-slate-600">
            Manual steps keep breaking the flow of work that should run
            automatically.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Start with one process. Fix the rest later.
          </p>
        </div>
        <div className="mx-auto mt-10 grid md:grid-cols-2 max-w-3xl gap-4">
          {whoSignals.map((item) => (
            <div
              key={item}
              className="group flex items-center gap-5 rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-4 text-left transition duration-200 ease-out hover:border-slate-300/80"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shrink-0">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-base font-medium text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
