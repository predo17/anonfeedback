import type { FeedbackCategory } from '@/types/feedback';

export const categoryLabels: Record<FeedbackCategory, string> = {
  comunicacao: 'Comunicação',
  lideranca: 'Liderança',
  processos: 'Processos',
  ambiente: 'Ambiente',
};

export const categoryColors: Record<FeedbackCategory, string> = {
  comunicacao: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  lideranca: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  processos: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  ambiente: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};
