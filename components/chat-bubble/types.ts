export type Screen = "menu" | "reservation" | "order" | "hours" | "call"

export interface ChatAnswers {
  [stepId: string]: string
}
