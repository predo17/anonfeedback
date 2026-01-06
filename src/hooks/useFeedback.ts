import { useCallback, useEffect, useState } from "react"
import { feedbackService } from "@/services/feedback.service"
import type { Feedback, FeedbackFormData } from "@/types/feedback"

interface UseFeedbackReturn {
  feedbacks: Feedback[]
  isLoading: boolean
  error: string | null
  loadFeedbacks: () => Promise<void>
  createFeedback: (data: FeedbackFormData) => Promise<void>
}

export function useFeedback(): UseFeedbackReturn {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadFeedbacks = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const data = await feedbackService.getAll()
      setFeedbacks(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createFeedback = useCallback(
    async (payload: FeedbackFormData) => {
      try {
        setIsLoading(true)
        setError(null)

        const created = await feedbackService.create(payload)
        setFeedbacks((prev) => [created, ...prev])
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    loadFeedbacks()
  }, [loadFeedbacks])

  return {
    feedbacks,
    isLoading,
    error,
    loadFeedbacks,
    createFeedback,
  }
}
