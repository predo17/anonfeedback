import { useFeedbackMetrics } from '@/hooks/useFeedback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { categoryLabels } from '@/utils/categoryLabels';

export function FeedbackMetrics() {
  const { metrics, loading, error } = useFeedbackMetrics();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="text-center text-destructive">
        Erro ao carregar métricas: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Feedbacks</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total}</div>
            <p className="text-xs text-muted-foreground">Feedbacks recebidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.averageRating.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">De 5.0 estrelas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Categoria</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryLabels[
                Object.entries(metrics.byCategory).sort(
                  ([, a], [, b]) => b.average - a.average
                )[0]?.[0] as keyof typeof categoryLabels
              ] || '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {Object.entries(metrics.byCategory)
                .sort(([, a], [, b]) => b.average - a.average)[0]?.[1]
                .average.toFixed(1) || '-'}{' '}
              estrelas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Por Categoria</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(metrics.byCategory).length}
            </div>
            <p className="text-xs text-muted-foreground">Categorias ativas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(metrics.byCategory).map(([key, data]) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                {categoryLabels[key as keyof typeof categoryLabels]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold">{data.average.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">({data.count})</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.count} {data.count === 1 ? 'feedback' : 'feedbacks'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
