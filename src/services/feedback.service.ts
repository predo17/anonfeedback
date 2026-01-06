import { httpClient } from "./http"
import type { Feedback } from "@/types/feedback"

export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    const { data } = await httpClient.get("/feedbacks")
    return data
  },

  async create(payload: Omit<Feedback, "id" | "createdAt">) {
    const { data } = await httpClient.post("/feedbacks", payload)
    return data
  },

  async getMetrics() {
    const { data } = await httpClient.get("/feedbacks/metrics")
    return data
  },
}
