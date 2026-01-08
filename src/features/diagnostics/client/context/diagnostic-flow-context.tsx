"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { DiagnosticStep } from "@/features/diagnostics/client/data/steps";
import type { ClarifyingQuestionsSchema } from "@/features/diagnostics/client/types/clarifying-schema";
import {
  defaultVerdict,
  type DiagnosticVerdict,
} from "@/features/diagnostics/client/data/verdict";
import type { DiagnosticDecision } from "@/features/diagnostics/client/types/decision";

type DiagnosticFlowState = {
  steps: DiagnosticStep[];
  activeStep: number;
  selectedScope: string | null;
  uploadedFiles: DiagnosticFile[];
  clarifyingSchemasByRound: Record<string, ClarifyingQuestionsSchema>;
  clarifyingAnswersByRound: Record<string, Record<string, unknown>>;
  activeClarifyingRoundId?: string;
  clarifyingRoundOrder: string[];
  verdict: DiagnosticVerdict;
  decision: DiagnosticDecision | null;
};

export type DiagnosticFile = {
  id: string;
  name: string;
  extension: string;
  file: File;
};

type DiagnosticFlowAction =
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "GO_TO"; index: number }
  | { type: "SET_SCOPE"; scope: string }
  | { type: "ADD_FILES"; files: DiagnosticFile[] }
  | { type: "REMOVE_FILE"; id: string }
  | { type: "SET_CLARIFYING_SCHEMA"; schema: ClarifyingQuestionsSchema }
  | { type: "SET_ACTIVE_CLARIFYING_ROUND"; roundId: string }
  | { type: "SET_CLARIFYING_ANSWER"; roundId: string; key: string; value: unknown }
  | { type: "RESET_CLARIFYING_ROUND"; roundId?: string }
  | { type: "SET_VERDICT"; verdict: DiagnosticVerdict }
  | { type: "SET_DECISION"; decision: DiagnosticDecision }
  | { type: "RESET_DIAGNOSTIC_FLOW" };

type DiagnosticFlowContextValue = {
  steps: DiagnosticStep[];
  activeStep: number;
  currentStep: DiagnosticStep;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  selectedScope: string | null;
  uploadedFiles: DiagnosticFile[];
  clarifyingSchemasByRound: Record<string, ClarifyingQuestionsSchema>;
  clarifyingAnswersByRound: Record<string, Record<string, unknown>>;
  activeClarifyingRoundId?: string;
  clarifyingRoundOrder: string[];
  verdict: DiagnosticVerdict;
  decision: DiagnosticDecision | null;
  goNext: () => void;
  goPrevious: () => void;
  goToStep: (index: number) => void;
  setScope: (scope: string) => void;
  addFiles: (files: DiagnosticFile[]) => void;
  removeFile: (id: string) => void;
  setClarifyingSchema: (schema: ClarifyingQuestionsSchema) => void;
  setActiveClarifyingRound: (roundId: string) => void;
  setClarifyingAnswer: (roundId: string, key: string, value: unknown) => void;
  resetClarifyingRound: (roundId?: string) => void;
  setVerdict: (verdict: DiagnosticVerdict) => void;
  setDecision: (decision: DiagnosticDecision) => void;
  resetDiagnosticFlow: () => void;
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
    case "SET_SCOPE": {
      return { ...state, selectedScope: action.scope };
    }
    case "ADD_FILES": {
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...action.files],
      };
    }
    case "REMOVE_FILE": {
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter((file) => file.id !== action.id),
      };
    }
    case "SET_CLARIFYING_SCHEMA": {
      const isExistingRound = state.clarifyingRoundOrder.includes(
        action.schema.roundId
      );
      return {
        ...state,
        clarifyingSchemasByRound: {
          ...state.clarifyingSchemasByRound,
          [action.schema.roundId]: action.schema,
        },
        clarifyingRoundOrder: isExistingRound
          ? state.clarifyingRoundOrder
          : [...state.clarifyingRoundOrder, action.schema.roundId],
      };
    }
    case "SET_ACTIVE_CLARIFYING_ROUND": {
      return {
        ...state,
        activeClarifyingRoundId: action.roundId,
      };
    }
    case "SET_CLARIFYING_ANSWER": {
      const currentRoundAnswers =
        state.clarifyingAnswersByRound[action.roundId] ?? {};

      return {
        ...state,
        clarifyingAnswersByRound: {
          ...state.clarifyingAnswersByRound,
          [action.roundId]: {
            ...currentRoundAnswers,
            [action.key]: action.value,
          },
        },
      };
    }
    case "RESET_CLARIFYING_ROUND": {
      if (!action.roundId) {
        return {
          ...state,
          clarifyingSchemasByRound: {},
          clarifyingAnswersByRound: {},
          activeClarifyingRoundId: undefined,
          clarifyingRoundOrder: [],
        };
      }

      const { [action.roundId]: _, ...remainingSchemas } =
        state.clarifyingSchemasByRound;
      const { [action.roundId]: __, ...remainingAnswers } =
        state.clarifyingAnswersByRound;
      const remainingRounds = state.clarifyingRoundOrder.filter(
        (roundId) => roundId !== action.roundId
      );

      return {
        ...state,
        clarifyingSchemasByRound: remainingSchemas,
        clarifyingAnswersByRound: remainingAnswers,
        clarifyingRoundOrder: remainingRounds,
        activeClarifyingRoundId:
          state.activeClarifyingRoundId === action.roundId
            ? undefined
            : state.activeClarifyingRoundId,
      };
    }
    case "SET_VERDICT": {
      return { ...state, verdict: action.verdict };
    }
    case "SET_DECISION": {
      return { ...state, decision: action.decision };
    }
    case "RESET_DIAGNOSTIC_FLOW": {
      return {
        ...state,
        activeStep: 0,
        selectedScope: null,
        uploadedFiles: [],
        clarifyingSchemasByRound: {},
        clarifyingAnswersByRound: {},
        activeClarifyingRoundId: undefined,
        clarifyingRoundOrder: [],
        verdict: defaultVerdict,
        decision: null,
      };
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
    selectedScope: null,
    uploadedFiles: [],
    clarifyingSchemasByRound: {},
    clarifyingAnswersByRound: {},
    activeClarifyingRoundId: undefined,
    clarifyingRoundOrder: [],
    verdict: defaultVerdict,
    decision: null,
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
      selectedScope: state.selectedScope,
      uploadedFiles: state.uploadedFiles,
      clarifyingSchemasByRound: state.clarifyingSchemasByRound,
      clarifyingAnswersByRound: state.clarifyingAnswersByRound,
      activeClarifyingRoundId: state.activeClarifyingRoundId,
      clarifyingRoundOrder: state.clarifyingRoundOrder,
      verdict: state.verdict,
      decision: state.decision,
      goNext: () => dispatch({ type: "NEXT" }),
      goPrevious: () => dispatch({ type: "PREVIOUS" }),
      goToStep: (index: number) => dispatch({ type: "GO_TO", index }),
      setScope: (scope: string) => dispatch({ type: "SET_SCOPE", scope }),
      addFiles: (files: DiagnosticFile[]) => dispatch({ type: "ADD_FILES", files }),
      removeFile: (id: string) => dispatch({ type: "REMOVE_FILE", id }),
      setClarifyingSchema: (schema: ClarifyingQuestionsSchema) =>
        dispatch({ type: "SET_CLARIFYING_SCHEMA", schema }),
      setActiveClarifyingRound: (roundId: string) =>
        dispatch({ type: "SET_ACTIVE_CLARIFYING_ROUND", roundId }),
      setClarifyingAnswer: (roundId: string, key: string, value: unknown) =>
        dispatch({ type: "SET_CLARIFYING_ANSWER", roundId, key, value }),
      resetClarifyingRound: (roundId?: string) =>
        dispatch({ type: "RESET_CLARIFYING_ROUND", roundId }),
      setVerdict: (verdict: DiagnosticVerdict) =>
        dispatch({ type: "SET_VERDICT", verdict }),
      setDecision: (decision: DiagnosticDecision) =>
        dispatch({ type: "SET_DECISION", decision }),
      resetDiagnosticFlow: () => dispatch({ type: "RESET_DIAGNOSTIC_FLOW" }),
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
