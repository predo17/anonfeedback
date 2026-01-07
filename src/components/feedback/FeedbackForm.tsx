import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { feedbackSchema } from "@/schemas/feedback.schema"
import type { FeedbackFormData } from "@/types/feedback"
import { useFeedback } from "@/hooks/useFeedback"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export function FeedbackForm() {
  const { createFeedback, isLoading } = useFeedback()

  const form = useForm<FeedbackFormData>({
   resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: undefined,
      rating: 3,
      comment: "",
    },
  })

  const onSubmit = async (data: FeedbackFormData) => {
    await createFeedback(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Categoria */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="comunicacao">Comunicação</SelectItem>
                  <SelectItem value="lideranca">Liderança</SelectItem>
                  <SelectItem value="processos">Processos</SelectItem>
                  <SelectItem value="ambiente">Ambiente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avaliação */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avaliação</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(v) => field.onChange(Number(v))}
                  defaultValue={String(field.value)}
                  className="flex gap-4"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FormItem key={value} className="flex items-center gap-2">
                      <FormControl>
                        <RadioGroupItem value={String(value)} />
                      </FormControl>
                      <FormLabel>{value}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comentário */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentário</FormLabel>
              <FormControl>
                <Textarea placeholder="Escreva seu feedback" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar feedback"}
        </Button>
      </form>
    </Form>
  )
}
