export type FeedbackCategory = 'comunicacao' | 'lideranca' | 'processos' | 'ambiente';

export interface Feedback {
  id: string;
  category: FeedbackCategory;
  rating: number;
  comment: string;
  created_at: string;
}

export interface FeedbackFormData {
  category: FeedbackCategory;
  rating: number;
  comment: string;
}

export interface FeedbackMetrics {
  total: number;
  averageRating: number;
  byCategory: {
    [key in FeedbackCategory]: {
      count: number;
      average: number;
    };
  };
}

export interface FeedbackFilters {
  category?: FeedbackCategory;
  rating?: number;
  sortBy?: 'created_at' | 'rating';
  sortOrder?: 'asc' | 'desc';
}
