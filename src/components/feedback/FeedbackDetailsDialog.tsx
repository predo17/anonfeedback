import type { Feedback } from '@/types/feedback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { categoryLabels, categoryColors } from '@/utils/categoryLabels';

interface FeedbackDetailsDialogProps {
  feedback: Feedback | null;
  open: boolean;
  onClose: () => void;
}

export function FeedbackDetailsDialog({
  feedback,
  open,
  onClose,
}: FeedbackDetailsDialogProps) {
  if (!feedback) return null;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Feedback</DialogTitle>
          <DialogDescription>
            Enviado em {formatDate(feedback.created_at)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Categoria
            </label>
            <div className="mt-1">
              <Badge
                className={categoryColors[feedback.category]}
                variant="secondary"
              >
                {categoryLabels[feedback.category]}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Avaliação
            </label>
            <div className="mt-1 flex items-center gap-2">
              {renderStars(feedback.rating)}
              <span className="text-sm text-muted-foreground">
                ({feedback.rating}/5)
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Comentário
            </label>
            <div className="mt-1 rounded-md border p-4 bg-muted/50">
              <p className="text-sm whitespace-pre-wrap">{feedback.comment}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
