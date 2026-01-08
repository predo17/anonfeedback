import { useState } from "react";
import { useForm } from "react-hook-form";
import { feedbackSchema, type FeedbackFormSchema } from "@/schemas/feedback.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackService } from "@/services/feedback.service";

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { categoryLabels } from '@/utils/categoryLabels';
import { Star } from "lucide-react";

export function FeedbackForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedRating, setSelectedRating] = useState<number>(0);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FeedbackFormSchema>({
        resolver: zodResolver(feedbackSchema),
    });

    const category = watch("category");
    const rating = watch("rating");

    const onSubmit = async (data: FeedbackFormSchema) => {
        setIsSubmitting(true);
        
        const result = await FeedbackService.createFeedback({ 
            ...data, 
            comment: data.comment ?? "" 
        });
        
        if (result.success) {
            toast.success('Feedback enviado com sucesso!', {
                description: 'Obrigado por compartilhar sua opinião.',
            });
            reset();
            setSelectedRating(0);
        } else {
            toast.error('Erro ao enviar feedback', {
                description: result.error,
            });
        }
        
        setIsSubmitting(false);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Enviar seu feedback</CardTitle>
                <CardDescription>
                    Sua opinião é importante. Compartilhe seu feedback de forma anônima e segura.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                            value={category}
                            onValueChange={(value) => setValue("category", value as FeedbackFormSchema['category'], { shouldValidate: true })}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(categoryLabels).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.category && <span className="text-sm text-destructive">{errors.category.message}</span>}

                    </div>

                    <div className="space-y-2">
                        <Label>Avaliação</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <Button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setSelectedRating(value);
                                        setValue("rating", value, { shouldValidate: true });
                                    }}
                                    className="transition-transform hover:scale-105 cursor-pointer"
                                >
                                    <Star className={`w-8 h-8 ${(rating || selectedRating) >= value
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                        }`} />
                                </Button>
                            ))}
                        </div>

                        {errors.rating && <span className="text-sm text-destructive">{errors.rating.message}</span>}

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment">Comentario</Label>
                        <Textarea
                            id="comment"
                            placeholder="Deixe seu comentario aqui..."
                            {...register("comment")}
                        />

                        {errors.comment && <span className="text-sm text-destructive">{errors.comment.message}</span>}

                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
                    </Button>

                </form>
            </CardContent>
        </Card>
    )
};