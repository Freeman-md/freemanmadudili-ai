import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

type ServicePanelProps = {
  title: string;
  badge: string;
  description: string;
  traits: string[];
  href: string;
  emphasis?: boolean;
  metaLine?: string;
  ctaLabel: string;
};

function ServicePanel({
  title,
  badge,
  description,
  traits,
  href,
  emphasis,
  metaLine,
  ctaLabel,
}: ServicePanelProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/70 bg-white/70 p-8 text-left transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_40px_-32px_rgba(15,23,42,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f7f4] sm:p-10",
        emphasis && "border-slate-300/80 bg-white shadow-[0_10px_35px_-26px_rgba(15,23,42,0.45)]"
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-500">
            {badge}
          </span>
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {title}
            </h3>
            <p className="mt-3 text-base text-slate-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="shrink-0 whitespace-nowrap text-xs font-medium text-slate-500 opacity-0 transition duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-primary/80 group-hover:opacity-100">
            {ctaLabel}
          </span>
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-primary/30 group-hover:text-primary/80 group-hover:shadow-sm">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {metaLine ? (
          <p className="text-sm font-medium text-slate-500">{metaLine}</p>
        ) : null}
        <ul className="space-y-3 text-sm text-slate-600">
          {traits.map((trait) => (
            <li key={trait} className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 text-primary/70">
                <Check className="h-3 w-3" />
              </span>
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <Section className="relative overflow-hidden bg-[#f8f7f4] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-80px] top-1/3 h-52 w-52 rounded-full bg-slate-200/60 blur-2xl" />
        <div className="absolute bottom-10 left-[-60px] h-44 w-44 rounded-full bg-slate-100/80 blur-2xl" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            SERVICES
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Two ways to remove manual work
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Start with one process, or fix the system behind it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ServicePanel
            title="Automation QuickStart"
            badge="72-hour setup"
            description="One manual process automated end-to-end in 72 hours."
            traits={["Fixed scope", "Fast delivery", "No long-term commitment"]}
            href="/quickstart"
            metaLine="$497 · fixed price"
            ctaLabel="View details"
          />
          <ServicePanel
            title="Operations Automation Ecosystem"
            badge="Audit + custom build"
            description="Multiple workflows redesigned so manual work stops being a bottleneck."
            traits={[
              "Workflow audit",
              "Multiple automations",
              "Long-term clarity",
            ]}
            href="/audit"
            emphasis
            metaLine="Audit first. Custom scope and quote after."
            ctaLabel="Start with audit"
          />
        </div>
      </Container>
    </Section>
  );
}
