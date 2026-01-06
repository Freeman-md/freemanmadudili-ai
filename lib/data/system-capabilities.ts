export type SystemCapability = {
  id: string;
  title: string;
  description: string;
  iconKey: "intake" | "logic" | "integration" | "visibility";
};

export const systemCapabilities: SystemCapability[] = [
  {
    id: "intake-routing",
    title: "Intake & Routing",
    description: "Requests captured and sent where they belong automatically.",
    iconKey: "intake",
  },
  {
    id: "process-logic",
    title: "Process Logic",
    description: "Rules, validations, and conditions replace manual decisions.",
    iconKey: "logic",
  },
  {
    id: "system-integration",
    title: "System Integration",
    description: "Tools stay in sync without copy-paste work.",
    iconKey: "integration",
  },
  {
    id: "visibility-control",
    title: "Visibility & Control",
    description: "Clear logs, alerts, and ownership.",
    iconKey: "visibility",
  },
];
