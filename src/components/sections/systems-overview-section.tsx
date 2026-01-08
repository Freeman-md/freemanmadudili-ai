import {
  ArrowRightLeft,
  Eye,
  Network,
  SlidersHorizontal,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { systemCapabilities } from "@/lib/data/system-capabilities";
import { cn } from "@/lib/utils";

const capabilityIcons = {
  intake: ArrowRightLeft,
  logic: SlidersHorizontal,
  integration: Network,
  visibility: Eye,
};

const capabilityPositions = [
  "lg:col-start-2 lg:row-start-1 lg:justify-self-center",
  "lg:col-start-1 lg:row-start-2 lg:justify-self-end",
  "lg:col-start-3 lg:row-start-2 lg:justify-self-start",
  "lg:col-start-2 lg:row-start-3 lg:justify-self-center",
];

type CapabilityCardProps = {
  title: string;
  description: string;
  icon: keyof typeof capabilityIcons;
  className?: string;
};

function CapabilityCard({
  title,
  description,
  icon,
  className,
}: CapabilityCardProps) {
  const Icon = capabilityIcons[icon];

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-left text-slate-700",
        className
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-primary/70">
        <Icon className="h-4 w-4" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export function SystemsOverviewSection() {
  return (
    <Section className="bg-[#f6f7f3] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
            OUR APPROACH
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            From manual steps to a system that runs itself
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Replace fragile workflows with connected, reliable automation.
          </p>
        </div>

        <div className="relative mt-12 lg:min-h-[520px]">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <span className="absolute left-1/2 top-1/2 h-[360px] w-px -translate-x-1/2 -translate-y-1/2 bg-slate-200/80" />
            <span className="absolute left-1/2 top-1/2 h-px w-[520px] -translate-x-1/2 -translate-y-1/2 bg-slate-200/80" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
            <div className="order-first md:col-span-2 lg:order-none lg:col-start-2 lg:row-start-2 lg:row-end-3">
              <div className="relative mx-auto flex h-56 w-56 items-center justify-center overflow-visible rounded-[32px] border border-slate-200 bg-white text-center shadow-[0_30px_70px_-55px_rgba(15,23,42,0.45)]">
                <div className="pointer-events-none absolute -inset-7 rounded-full border border-dashed border-slate-300/60 motion-safe:animate-[spin_24s_linear_infinite]" />
                <div className="pointer-events-none absolute -inset-3 rounded-full border border-slate-200/70 motion-safe:animate-[spin_36s_linear_infinite]" />
                <div className="relative space-y-2 px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                    Automation Core
                  </p>
                  <p className="text-sm text-slate-600">
                    Orchestrated, connected workflows
                  </p>
                </div>
              </div>
            </div>

            {systemCapabilities.map((capability, index) => (
              <CapabilityCard
                key={capability.id}
                title={capability.title}
                description={capability.description}
                icon={capability.iconKey}
                className={capabilityPositions[index]}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
