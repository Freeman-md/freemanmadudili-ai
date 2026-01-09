import type { ServiceItem } from "@/lib/types";

export const serviceItems: ServiceItem[] = [
  {
    title: "Automation QuickStart",
    badge: "72-hour setup",
    description: "One manual process automated end-to-end in 72 hours.",
    traits: ["Fixed scope", "Fast delivery", "No long-term commitment"],
    href: "/quickstart",
    metaLine: "$497 · fixed price",
    ctaLabel: "View details",
  },
  {
    title: "Operations Automation Ecosystem",
    badge: "Audit + custom build",
    description:
      "Multiple workflows redesigned so manual work stops being a bottleneck.",
    traits: ["Workflow audit", "Multiple automations", "Long-term clarity"],
    href: "/audit",
    emphasis: true,
    metaLine: "Audit first. Custom scope and quote after.",
    ctaLabel: "Start with audit",
  },
];
