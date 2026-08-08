"use client"

import { useCallback, useMemo, useReducer } from "react"
import { FLOWS, type FlowId, type FlowStep } from "@/lib/chat-flows"
import type { ChatAnswers, Screen } from "./types"

interface ChatState {
  screen: Screen
  stepIndex: number
  answers: ChatAnswers
  displayAnswers: ChatAnswers
  submitted: boolean
}

const initialState: ChatState = {
  screen: "menu",
  stepIndex: 0,
  answers: {},
  displayAnswers: {},
  submitted: false,
}

type Action =
  | { type: "GO_TO_MENU" }
  | { type: "SELECT_FLOW"; screen: Screen }
  | { type: "ANSWER"; stepId: string; value: string; display: string }
  | { type: "SKIP"; stepId: string }
  | { type: "BACK" }
  | { type: "EDIT_STEP"; index: number }
  | { type: "SUBMIT" }
  | { type: "RESTART_FLOW" }

function omit(record: ChatAnswers, keys: string[]): ChatAnswers {
  const next = { ...record }
  for (const key of keys) delete next[key]
  return next
}

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case "GO_TO_MENU":
      return initialState
    case "SELECT_FLOW":
      return {
        screen: action.screen,
        stepIndex: 0,
        answers: {},
        displayAnswers: {},
        submitted: false,
      }
    case "ANSWER":
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
        answers: { ...state.answers, [action.stepId]: action.value },
        displayAnswers: { ...state.displayAnswers, [action.stepId]: action.display },
      }
    case "SKIP":
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
        answers: omit(state.answers, [action.stepId]),
        displayAnswers: omit(state.displayAnswers, [action.stepId]),
      }
    case "BACK": {
      if (state.stepIndex === 0) return state
      const flow = FLOWS[state.screen as FlowId]
      const prevStep = flow?.steps[state.stepIndex - 1]
      if (!prevStep) return { ...state, stepIndex: state.stepIndex - 1 }
      return {
        ...state,
        stepIndex: state.stepIndex - 1,
        answers: omit(state.answers, [prevStep.id]),
        displayAnswers: omit(state.displayAnswers, [prevStep.id]),
      }
    }
    case "EDIT_STEP": {
      const flow = FLOWS[state.screen as FlowId]
      if (!flow) return state
      const idsToClear = flow.steps.slice(action.index).map((s) => s.id)
      return {
        ...state,
        stepIndex: action.index,
        answers: omit(state.answers, idsToClear),
        displayAnswers: omit(state.displayAnswers, idsToClear),
        submitted: false,
      }
    }
    case "SUBMIT":
      return { ...state, submitted: true }
    case "RESTART_FLOW":
      return {
        ...state,
        stepIndex: 0,
        answers: {},
        displayAnswers: {},
        submitted: false,
      }
    default:
      return state
  }
}

export function useChatFlow() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const flow =
    state.screen === "reservation" || state.screen === "order" ? FLOWS[state.screen] : undefined

  const currentStep: FlowStep | undefined = flow ? flow.steps[state.stepIndex] : undefined
  const isSummary = !!flow && state.stepIndex >= flow.steps.length && !state.submitted
  const isLargeGroup = state.screen === "reservation" && state.answers.guests === "7+"

  const selectFlow = useCallback((screen: Screen) => dispatch({ type: "SELECT_FLOW", screen }), [])
  const goToMenu = useCallback(() => dispatch({ type: "GO_TO_MENU" }), [])
  const answer = useCallback(
    (stepId: string, value: string, display: string) =>
      dispatch({ type: "ANSWER", stepId, value, display }),
    [],
  )
  const skip = useCallback((stepId: string) => dispatch({ type: "SKIP", stepId }), [])
  const back = useCallback(() => dispatch({ type: "BACK" }), [])
  const editStep = useCallback((index: number) => dispatch({ type: "EDIT_STEP", index }), [])
  const submit = useCallback(() => dispatch({ type: "SUBMIT" }), [])
  const restartFlow = useCallback(() => dispatch({ type: "RESTART_FLOW" }), [])

  return useMemo(
    () => ({
      state,
      flow,
      currentStep,
      isSummary,
      isLargeGroup,
      selectFlow,
      goToMenu,
      answer,
      skip,
      back,
      editStep,
      submit,
      restartFlow,
    }),
    [
      state,
      flow,
      currentStep,
      isSummary,
      isLargeGroup,
      selectFlow,
      goToMenu,
      answer,
      skip,
      back,
      editStep,
      submit,
      restartFlow,
    ],
  )
}
