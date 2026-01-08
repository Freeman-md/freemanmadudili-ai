"use client";

import { useMemo, useState } from "react";

import type { DiagnosticStep } from "@/features/diagnostic/client/data/steps";

type StepState = {
  activeStep: number;
  currentStep: DiagnosticStep;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goNext: () => void;
  goPrevious: () => void;
  goToStep: (index: number) => void;
};

export function useDiagnosticSteps(steps: DiagnosticStep[]): StepState {
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = steps.length;
  const currentStep = useMemo(() => steps[activeStep], [steps, activeStep]);

  const goNext = () => {
    setActiveStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const goPrevious = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const goToStep = (index: number) => {
    const clampedIndex = Math.min(Math.max(index, 0), totalSteps - 1);
    setActiveStep(clampedIndex);
  };

  return {
    activeStep,
    currentStep,
    totalSteps,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === totalSteps - 1,
    goNext,
    goPrevious,
    goToStep,
  };
}
