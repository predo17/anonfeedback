import { useState } from 'react';
import { useFeedbacks } from '@/hooks/useFeedback';
import type { FeedbackCategory, FeedbackFilters } from '@/types/feedback';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Filter, RefreshCw, Eye } from 'lucide-react';
import { formatRelativeDate } from '@/utils/formatDate';
import { categoryLabels, categoryColors } from '@/utils/categoryLabels';
import { FeedbackDetailsDialog } from './FeedbackDetailsDialog';
import type { Feedback } from '@/types/feedback';

export function FeedbackTable() {
  const [filters, setFilters] = useState<FeedbackFilters>({
    sortBy: 'created_at',
    sortOrder: 'desc',
  });
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const { feedbacks, loading, error, refetch } = useFeedbacks(filters);

  const handleCategoryFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value === 'all' ? undefined : (value as FeedbackCategory),
    }));
  };

  const handleRatingFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      rating: value === 'all' ? undefined : parseInt(value),
    }));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            Erro ao carregar feedbacks: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Feedbacks Recebidos</CardTitle>
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select
                value={filters.category || 'all'}
                onValueChange={handleCategoryFilter}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas categorias</SelectItem>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select
              value={filters.rating?.toString() || 'all'}
              onValueChange={handleRatingFilter}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Avaliação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas avaliações</SelectItem>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} {rating === 1 ? 'estrela' : 'estrelas'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 flex-1" />
                </div>
              ))}
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum feedback encontrado com os filtros selecionados.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Comentário</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbacks.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>
                        <Badge
                          className={
                            categoryColors[feedback.category]
                          }
                          variant="secondary"
                        >
                          {categoryLabels[feedback.category]}
                        </Badge>
                      </TableCell>
                      <TableCell>{renderStars(feedback.rating)}</TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{feedback.comment}</p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatRelativeDate(feedback.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFeedback(feedback)}
                          className='cursor-pointer'
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <FeedbackDetailsDialog
        feedback={selectedFeedback}
        open={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </>
  );
}
