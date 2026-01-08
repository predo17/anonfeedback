import { useState, useEffect, useCallback } from 'react';
import { FeedbackService } from '@/services/feedback.service';
import type { Feedback, FeedbackFilters, FeedbackMetrics } from '@/types/feedback';

export function useFeedbacks(filters?: FeedbackFilters) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await FeedbackService.getFeedbacks(filters);
    
    if (result.success) {
      setFeedbacks(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return {
    feedbacks,
    loading,
    error,
    refetch: fetchFeedbacks,
  };
}

export function useFeedbackMetrics() {
  const [metrics, setMetrics] = useState<FeedbackMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await FeedbackService.getMetrics();
    
    if (result.success) {
      setMetrics(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  };
}