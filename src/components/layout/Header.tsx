import { Link, useLocation } from 'react-router-dom';
import { MessageSquareMore, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <MessageSquareMore className="w-6 h-6" />
            <h1 className="text-xl font-bold">FeedbackHub</h1>
          </Link>
          <nav>
            <Button
              variant={isAdmin ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/admin">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
