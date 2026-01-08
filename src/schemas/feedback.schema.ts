import { z } from "zod"

export const FeedbackCategory = [
    "comunicacao",
    "lideranca",
    "processos",
    "ambiente"
] as const;

export const feedbackSchema = z.object({
    category: z.enum(FeedbackCategory, {
        error: 'Selecione uma categoria',
    }),
    rating: z
        .number()
        .refine((value) => !isNaN(value), {
            message: "Avaliação obrigatória",
        })
        .refine((value) => value >= 1 && value <= 5, {
            message: "Avaliação deve ser entre 1 e 5",
        }),
    comment: z
        .string()
        .min(5, "Comentário muito curto")
        .max(1000, "Comentário muito longo")
        .optional(),
})

export type FeedbackFormSchema = z.infer<typeof feedbackSchema>;