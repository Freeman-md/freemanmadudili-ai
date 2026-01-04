"use client"

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const steps = [
  {
    title: "Intake captured",
    description:
      "Incoming requests are collected instantly with no manual handling.",
  },
  {
    title: "Processed and routed",
    description:
      "Data is validated and sent to the right place automatically.",
  },
  {
    title: "Outcome delivered",
    description: "The result is logged, notified, and ready to use.",
  },
];

const timing = {
  intervalMs: 1800,
  transitionSeconds: 0.35,
  ease: "easeInOut" as const,
};

const stepVariants = {
  inactive: {
    opacity: 0.45,
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    borderColor: "rgba(229, 231, 235, 1)",
  },
  active: {
    opacity: 1,
    scale: 1.02,
    boxShadow:
      "0 12px 24px rgba(17, 24, 39, 0.08), 0 0 0 1px rgba(37, 99, 235, 0.2), 0 0 24px rgba(37, 99, 235, 0.12)",
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
      setActiveStep((current) => (current + 1) % steps.length);
    }, timing.intervalMs);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="rounded-3xl border border-border bg-card p-10">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Automation flow</span>
          <motion.span
            className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Live
          </motion.span>
        </div>

        <div className="mt-8 grid gap-3">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
            <motion.div
              key={step.title}
              className="rounded-2xl border bg-background px-3 py-4"
              animate={isActive ? "active" : "inactive"}
              variants={stepVariants}
              transition={{
                duration: timing.transitionSeconds,
                ease: timing.ease,
              }}
            >
              <div className="grid gap-1">
                <p className="text-sm font-semibold leading-5 text-foreground">
                  {step.title}
                </p>
                {isActive ? (
                  <motion.p
                    key={`desc-${index}-${activeStep}`}
                    className="text-sm leading-6 text-muted-foreground"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{
                      duration: 2,
                      ease: timing.ease,
                    }}
                  >
                    {step.description}
                  </motion.p>
                ) : (
                  <p className="text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
