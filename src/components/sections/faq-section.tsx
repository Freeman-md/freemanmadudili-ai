"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { faqItems } from "@/constants/site";
import { cn } from "@/lib/utils";

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
  const [activeFaqId, setActiveFaqId] = useState(faqItems[0]?.id ?? "");
  const activeIndex = faqItems.findIndex((faq) => faq.id === activeFaqId);

  const goToIndex = (index: number) => {
    const safeIndex = (index + faqItems.length) % faqItems.length;
    setActiveFaqId(faqItems[safeIndex].id);
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
          {faqItems.map((faq) => (
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
