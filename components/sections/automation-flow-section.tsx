"use client"

import { motion } from "motion/react";

const steps = [
  "Intake captured",
  "Processed and routed",
  "Outcome delivered",
];

type AutomationFlowSectionProps = {
  className?: string;
};

export function AutomationFlowSection({ className }: AutomationFlowSectionProps) {
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
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background px-5 py-4"
              animate={{ opacity: [0.35, 1, 1, 0.35], y: [6, 0, 0, 6] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 0.4,
                delay: index * 0.4,
                ease: "easeInOut",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-foreground">
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
