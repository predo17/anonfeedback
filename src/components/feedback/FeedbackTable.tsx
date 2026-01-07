import { useFeedback } from "@/hooks/useFeedback"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function FeedbackTable() {
  const { feedbacks, isLoading, error } = useFeedback()

  if (isLoading) {
    return <Skeleton className="h-40 w-full" />
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (feedbacks.length === 0) {
    return <p className="text-muted-foreground">Nenhum feedback recebido.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Categoria</TableHead>
          <TableHead>Avaliação</TableHead>
          <TableHead>Comentário</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbacks.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell>
              <Badge variant="outline">{feedback.category}</Badge>
            </TableCell>
            <TableCell>{feedback.rating}</TableCell>
            <TableCell>{feedback.comment || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
