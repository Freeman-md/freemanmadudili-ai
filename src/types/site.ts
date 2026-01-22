export type AutomationFlowStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ServiceItem = {
  title: string;
  badge: string;
  description: string;
  traits: string[];
  href: string;
  emphasis?: boolean;
  metaLine?: string;
  ctaLabel: string;
};

export type ProofItem = {
  id: string;
  title: string;
  shortDescription: string;
  context: string;
  imageSrc: string;
  detailedDescription: {
    problem: string;
    automated: string;
    outcome: string;
  };
};

export type SystemCapability = {
  id: string;
  title: string;
  description: string;
  iconKey: "intake" | "logic" | "integration" | "visibility";
};
