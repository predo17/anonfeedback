import { z } from "zod"
import { feedbackSchema } from "@/schemas/feedback.schema"

export type FeedbackFormData = z.infer<typeof feedbackSchema>

export type FeedbackCategory =
  | "comunicacao"
  | "lideranca"
  | "processos"
  | "ambiente"

export interface Feedback extends FeedbackFormData {
  id: string
  createdAt: string
}
