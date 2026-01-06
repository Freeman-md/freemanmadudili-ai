"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: "who-its-for",
    question: "Who is this actually for?",
    answer:
      "This is for growing businesses where manual steps keep interrupting work. If one or more processes rely on people copying data, replying repeatedly, or checking multiple tools, you are a good fit.",
  },
  {
    id: "quickstart-scope",
    question: "What exactly do I get with the Automation QuickStart?",
    answer:
      "One clearly defined manual process automated end-to-end. That includes intake, validation, routing, and logging. The scope is fixed so delivery stays fast and predictable.",
  },
  {
    id: "timeline",
    question: "How fast can this be delivered?",
    answer:
      "QuickStart automations are delivered within 72 hours once access and inputs are provided. Larger ecosystem projects follow a structured timeline after the audit.",
  },
  {
    id: "tools",
    question: "What tools or platforms do you work with?",
    answer:
      "We work with modern business tools such as CRMs, forms, spreadsheets, email systems, internal dashboards, and custom integrations. The focus is always on reliability, not novelty.",
  },
  {
    id: "ecosystem-audit",
    question: "What is the difference between the free audit and the full audit?",
    answer:
      "The free workflow audit identifies obvious bottlenecks and quick wins. The full audit is a paid, in-depth review of your operations used to design a complete automation plan and produce an accurate project quote.",
  },
  {
    id: "pricing-ecosystem",
    question: "How is the Ecosystem project priced?",
    answer:
      "Ecosystem work is quoted after the full audit. Pricing depends on the number of workflows, complexity, and operational risk. This avoids vague estimates and unexpected scope changes.",
  },
  {
    id: "ownership",
    question: "Will my team be able to manage the system after delivery?",
    answer:
      "Yes. Every system includes documentation and a walkthrough so your team understands how it works and how to operate it confidently.",
  },
  {
    id: "security",
    question: "How do you handle access and security?",
    answer:
      "We use least-privilege access, document all permissions, and remove access once work is complete. Security and clarity are non-negotiable.",
  },
  {
    id: "retainers",
    question: "Do you offer ongoing support or retainers?",
    answer:
      "Retainers are optional and only offered after delivery. Most clients start with a one-off build and decide later if ongoing support is needed.",
  },
  {
    id: "results",
    question: "What kind of results should I expect?",
    answer:
      "Fewer manual steps, fewer errors, and clearer operational flow. The goal is not automation for its own sake, but removing friction that slows your business down.",
  },
];

type FaqCardProps = {
  question: string;
  answer: string;
  isActive: boolean;
  onSelect: () => void;
};

function FaqCard({ question, answer, isActive, onSelect }: FaqCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-expanded={isActive}
      className={cn(
        "mb-6 w-full break-inside-avoid rounded-2xl border p-6 text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2]",
        isActive
          ? "border-primary/40 bg-primary text-white"
          : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300/80"
      )}
    >
      <div className="text-base font-normal leading-7 sm:text-lg">
        {question}
      </div>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isActive ? "grid-rows-[1fr] opacity-90" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              "mt-3 text-sm font-normal leading-6",
              isActive ? "text-white/90" : "text-slate-500"
            )}
          >
            {answer}
          </p>
        </div>
      </div>
    </button>
  );
}

export function FaqSection() {
  const [activeFaqId, setActiveFaqId] = useState(faqs[0]?.id ?? "");
  const activeIndex = faqs.findIndex((faq) => faq.id === activeFaqId);

  const goToIndex = (index: number) => {
    const safeIndex = (index + faqs.length) % faqs.length;
    setActiveFaqId(faqs[safeIndex].id);
  };

  return (
    <Section className="bg-[#f7f6f2] py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              <span className="block">Frequently Asked</span>
              <span className="block text-primary">Questions</span>
            </h2>
          </div>
          <div className="space-y-6">
            <p className="max-w-md text-base leading-7 text-slate-600">
              Clear answers to the questions that come up before we start.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goToIndex(activeIndex - 1)}
                aria-label="Previous FAQ"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 transition duration-300 ease-out hover:border-slate-300/80 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goToIndex(activeIndex + 1)}
                aria-label="Next FAQ"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 transition duration-300 ease-out hover:border-slate-300/80 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 columns-1 gap-6 md:columns-2 xl:columns-3">
          {faqs.map((faq) => (
            <FaqCard
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isActive={faq.id === activeFaqId}
              onSelect={() => setActiveFaqId(faq.id)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
