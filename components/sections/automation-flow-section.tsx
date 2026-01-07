"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { automationFlowSteps } from "@/lib/data/automation-flow-steps";
import { cn } from "@/lib/utils";

const timing = {
  intervalMs: 1800,
  transitionSeconds: 0.35,
  ease: "easeInOut" as const,
};

const stepVariants = {
  inactive: {
    opacity: 0.6,
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    borderColor: "rgba(229, 231, 235, 1)",
  },
  active: {
    opacity: 1,
    scale: 1.01,
    boxShadow: "0 10px 24px rgba(17, 24, 39, 0.08)",
    borderColor: "rgba(37, 99, 235, 0.25)",
  },
};

type AutomationFlowSectionProps = {
  className?: string;
};

export function AutomationFlowSection({ className }: AutomationFlowSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % automationFlowSteps.length);
    }, timing.intervalMs);

    return () => clearInterval(timer);
  }, []);

  return (
    <Section className={cn("bg-background", className)}>
      <Container>
        <div className="text-center">
          <h2>How it works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Intake → Build → Test → Handover
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex h-full min-h-[360px] items-center justify-center rounded-3xl border border-border bg-card p-8 text-sm font-semibold text-muted-foreground">
            Workflow visual (placeholder)
          </div>

          <div className="flex h-full flex-col justify-between">
            <div className="grid gap-4">
              {automationFlowSteps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <motion.div
                    key={step.title}
                    className="rounded-2xl border bg-background px-5 py-4"
                    animate={isActive ? "active" : "inactive"}
                    variants={stepVariants}
                    transition={{
                      duration: timing.transitionSeconds,
                      ease: timing.ease,
                    }}
                  >
                    <div className="grid grid-cols-[32px_1fr] items-start gap-4">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-muted-foreground"
                        )}
                      >
                        {index + 1}
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-semibold text-foreground">
                          {step.title}
                        </p>
                        <motion.p
                          className="text-sm leading-6 text-muted-foreground"
                          animate={{ opacity: isActive ? 1 : 0.35 }}
                          transition={{
                            duration: timing.transitionSeconds,
                            ease: timing.ease,
                          }}
                        >
                          {step.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                className={cn(buttonVariants({ variant: "primary" }))}
                href="/audit"
              >
                Get a free workflow audit
              </Link>
              <span className="text-xs text-muted-foreground">
                🕒 Takes ~5-7 minutes
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
