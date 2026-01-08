import { supabase } from './http';
import type {
  Feedback,
  FeedbackFormData,
  FeedbackFilters,
  FeedbackMetrics,
  FeedbackCategory,
} from '@/types/feedback';

export class FeedbackService {
  static async createFeedback(data: FeedbackFormData): Promise<Feedback> {
    const { data: feedback, error } = await supabase
      .from('feedbacks')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return feedback;
  }

  static async getFeedbacks(filters?: FeedbackFilters): Promise<Feedback[]> {
    let query = supabase.from('feedbacks').select('*');

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

    if (error) throw error;
    return data || [];
  }

  static async getMetrics(): Promise<FeedbackMetrics> {
    const { data: feedbacks, error } = await supabase
      .from('feedbacks')
      .select('*');

    if (error) throw error;

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
        const categoryFeedbacks = feedbacks.filter(
          (f) => f.category === category
        );
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
      total,
      averageRating,
      byCategory,
    };
  }
}