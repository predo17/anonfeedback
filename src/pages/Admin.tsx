import { FeedbackMetrics, FeedbackTable } from '@/components/feedback';

export function Admin() {
    return (
        <div className="min-h-[calc(100vh-73px)] bg-muted/20">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Dashboard Admin</h2>
                    <p className="text-muted-foreground">
                        Visualize e analise os feedbacks recebidos da sua equipe
                    </p>
                </div>
                <div className="space-y-8">
                    <FeedbackMetrics />
                    <FeedbackTable />
                </div>
            </div>
        </div>
    );
}
