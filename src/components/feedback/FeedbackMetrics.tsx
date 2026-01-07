import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useFeedback } from "@/hooks/useFeedback"

export function FeedbackMetrics() {
  const { feedbacks } = useFeedback()

  const average =
    feedbacks.reduce((acc, f) => acc + f.rating, 0) /
    (feedbacks.length || 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Média geral</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="text-2xl font-bold">
        {average.toFixed(1)}
      </CardContent>
    </Card>
  )
}
