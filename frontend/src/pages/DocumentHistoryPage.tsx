import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import LoginPrompt from '../components/LoginPrompt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, History, FileText } from 'lucide-react';

export default function DocumentHistoryPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/' })}
          className="mb-6 gap-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Button>
        <div className="flex items-center gap-3 mb-8">
          <History className="w-6 h-6 text-primary" />
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Document History</h1>
            <p className="text-muted-foreground text-sm">Your previously generated documents</p>
          </div>
        </div>
        <LoginPrompt />
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: '/' })}
        className="mb-6 gap-2 -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Templates
      </Button>

      <div className="flex items-center gap-3 mb-8">
        <History className="w-6 h-6 text-primary" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Document History</h1>
          <p className="text-muted-foreground text-sm">Your previously generated documents</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            Document history listing is being implemented. Once available, you'll be able to view,
            download, and manage all your previously generated legal documents here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            onClick={() => navigate({ to: '/' })}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            Create New Document
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
