import { supabase } from './http';
import type {
  Feedback,
  FeedbackFormData,
  FeedbackFilters,
  FeedbackMetrics,
  FeedbackCategory,
} from '@/types/feedback';

// Tipo para resultado de operações
type ServiceResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

export class FeedbackService {
  private static checkSupabase(): { success: false; error: string } | null {
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase não está configurado. Verifique as variáveis de ambiente.',
      };
    }
    return null;
  }

  static async createFeedback(data: FeedbackFormData): Promise<ServiceResult<Feedback>> {
    const supabaseError = this.checkSupabase();
    if (supabaseError) return supabaseError;

    try {
      const { data: feedback, error } = await supabase!
        .from('feedbacks')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar feedback:', error);
        return {
          success: false,
          error: error.message || 'Erro ao enviar feedback. Tente novamente.',
        };
      }

      if (!feedback) {
        return {
          success: false,
          error: 'Nenhum dado retornado do servidor.',
        };
      }

      return {
        success: true,
        data: feedback,
      };
    } catch (err) {
      console.error('Erro inesperado ao criar feedback:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro inesperado ao enviar feedback.',
      };
    }
  }

  static async getFeedbacks(filters?: FeedbackFilters): Promise<ServiceResult<Feedback[]>> {
    const supabaseError = this.checkSupabase();
    if (supabaseError) return supabaseError;

    try {
      let query = supabase!.from('feedbacks').select('*');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.rating) {
        query = query.eq('rating', filters.rating);
      }

      const sortBy = filters?.sortBy || 'created_at';
      const sortOrder = filters?.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar feedbacks:', error);
        return {
          success: false,
          error: error.message || 'Erro ao carregar feedbacks. Tente novamente.',
        };
      }

      return {
        success: true,
        data: data || [],
      };
    } catch (err) {
      console.error('Erro inesperado ao buscar feedbacks:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro inesperado ao carregar feedbacks.',
      };
    }
  }

  static async getMetrics(): Promise<ServiceResult<FeedbackMetrics>> {
    const supabaseError = this.checkSupabase();
    if (supabaseError) return supabaseError;

    try {
      const { data: feedbacks, error } = await supabase!
        .from('feedbacks')
        .select('*');

      if (error) {
        console.error('Erro ao buscar métricas:', error);
        return {
          success: false,
          error: error.message || 'Erro ao carregar métricas. Tente novamente.',
        };
      }

      const total = feedbacks?.length || 0;
      const averageRating =
        total > 0
          ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / total
          : 0;

      const categories: FeedbackCategory[] = [
        'comunicacao',
        'lideranca',
        'processos',
        'ambiente',
      ];

      const byCategory = categories.reduce(
        (acc, category) => {
          const categoryFeedbacks = feedbacks?.filter(
            (f) => f.category === category
          ) || [];
          const count = categoryFeedbacks.length;
          const average =
            count > 0
              ? categoryFeedbacks.reduce((sum, f) => sum + f.rating, 0) / count
              : 0;

          acc[category] = { count, average };
          return acc;
        },
        {} as FeedbackMetrics['byCategory']
      );

      return {
        success: true,
        data: {
          total,
          averageRating,
          byCategory,
        },
      };
    } catch (err) {
      console.error('Erro inesperado ao buscar métricas:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro inesperado ao carregar métricas.',
      };
    }
  }
}