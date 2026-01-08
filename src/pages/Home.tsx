import { FeedbackForm } from '@/components/feedback';

export function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Sua Opinião é Importante
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compartilhe seu feedback de forma anônima e ajude-nos a melhorar
            continuamente nossos processos e ambiente de trabalho.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}