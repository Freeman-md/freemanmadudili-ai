"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { DiagnosticStep } from "@/features/workflow-diagnostic/data/steps";

type DiagnosticFlowState = {
  steps: DiagnosticStep[];
  activeStep: number;
};

type DiagnosticFlowAction =
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "GO_TO"; index: number };

type DiagnosticFlowContextValue = {
  steps: DiagnosticStep[];
  activeStep: number;
  currentStep: DiagnosticStep;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goNext: () => void;
  goPrevious: () => void;
  goToStep: (index: number) => void;
};

const DiagnosticFlowContext = createContext<DiagnosticFlowContextValue | null>(
  null
);

function diagnosticFlowReducer(
  state: DiagnosticFlowState,
  action: DiagnosticFlowAction
): DiagnosticFlowState {
  switch (action.type) {
    case "NEXT": {
      return {
        ...state,
        activeStep: Math.min(state.activeStep + 1, state.steps.length - 1),
      };
    }
    case "PREVIOUS": {
      return {
        ...state,
        activeStep: Math.max(state.activeStep - 1, 0),
      };
    }
    case "GO_TO": {
      const clampedIndex = Math.min(
        Math.max(action.index, 0),
        state.steps.length - 1
      );
      return { ...state, activeStep: clampedIndex };
    }
    default:
      return state;
  }
}

type DiagnosticFlowProviderProps = {
  steps: DiagnosticStep[];
  children: ReactNode;
};

export function DiagnosticFlowProvider({
  steps,
  children,
}: DiagnosticFlowProviderProps) {
  const [state, dispatch] = useReducer(diagnosticFlowReducer, {
    steps,
    activeStep: 0,
  });

  const value = useMemo<DiagnosticFlowContextValue>(() => {
    const totalSteps = state.steps.length;
    const currentStep = state.steps[state.activeStep];

    return {
      steps: state.steps,
      activeStep: state.activeStep,
      currentStep,
      totalSteps,
      isFirstStep: state.activeStep === 0,
      isLastStep: state.activeStep === totalSteps - 1,
      goNext: () => dispatch({ type: "NEXT" }),
      goPrevious: () => dispatch({ type: "PREVIOUS" }),
      goToStep: (index: number) => dispatch({ type: "GO_TO", index }),
    };
  }, [state]);

  return (
    <DiagnosticFlowContext.Provider value={value}>
      {children}
    </DiagnosticFlowContext.Provider>
  );
}

export function useDiagnosticFlow() {
  const context = useContext(DiagnosticFlowContext);

  if (!context) {
    throw new Error("useDiagnosticFlow must be used within DiagnosticFlowProvider");
  }

  return context;
}
