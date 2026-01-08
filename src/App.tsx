import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Header from './components/layout/Header';
import { FeedbackForm, FeedbackMetrics,  FeedbackTable, FeedbackDetailsDialog } from './components/feedback/index';

function Layout() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={(
                        <>
                            <h1>Home</h1>
                            <FeedbackForm />
                        </>
                    )} />
                    <Route path="/admin" element={(
                        <>
                            <h1>Admin</h1>
                            <FeedbackMetrics />
                            <FeedbackTable />
                            <FeedbackDetailsDialog feedback={null} open={false} onClose={function (): void {
                                throw new Error('Function not implemented.');
                            } }  />

                        </>
                    )} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
