import { z } from "zod"

export const feedbackSchema = z.object({
    category: z.enum([
        "comunicacao",
        "lideranca",
        "processos",
        "ambiente",
    ]),
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
        .max(300, "Comentário muito longo")
        .optional(),
})