import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetDocumentContent, useGetDocumentMetadata, useFinalizeDocument } from '../hooks/useQueries';
import DocumentPreview from '../components/DocumentPreview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, Download, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { downloadDocument } from '../utils/documentDownload';
import { DocumentStatus } from '../backend';

export default function DocumentPreviewPage() {
  const navigate = useNavigate();
  const { documentId: documentIdParam } = useParams({ from: '/document/preview/$documentId' });
  const { identity } = useInternetIdentity();
  const [actionError, setActionError] = useState('');

  const documentId = BigInt(documentIdParam);
  const userPrincipal = identity?.getPrincipal();

  const {
    data: contentBytes,
    isLoading: contentLoading,
    error: contentError,
  } = useGetDocumentContent(userPrincipal, documentId);

  const {
    data: metadata,
    isLoading: metaLoading,
    error: metaError,
  } = useGetDocumentMetadata(userPrincipal, documentId);

  const finalizeDocumentMutation = useFinalizeDocument();

  const isLoading = contentLoading || metaLoading;
  const error = contentError || metaError;

  // Decode content bytes to string
  const documentContent = contentBytes
    ? new TextDecoder().decode(contentBytes)
    : '';

  const handleDownload = () => {
    if (!documentContent) return;
    try {
      const filename = `document-${documentIdParam}.txt`;
      downloadDocument(documentContent, filename);
      toast.success('Document downloaded!');
    } catch (err: any) {
      const msg = err?.message || 'Failed to download document.';
      setActionError(msg);
      toast.error(msg);
    }
  };

  const handleFinalize = async () => {
    setActionError('');
    try {
      await finalizeDocumentMutation.mutateAsync(documentId);
      toast.success('Document finalized successfully!');
    } catch (err: any) {
      const msg = err?.message || 'Failed to finalize document.';
      setActionError(msg);
      toast.error(msg);
    }
  };

  const getStatusBadge = () => {
    if (!metadata) return null;
    if (metadata.finalized || metadata.status === DocumentStatus.finalized) {
      return <Badge className="bg-success/10 text-success border-success/20">Finalized</Badge>;
    }
    return <Badge variant="secondary">Draft</Badge>;
  };

  if (!identity) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-muted-foreground">Please log in to view documents.</p>
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
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

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Document Preview</h1>
            <p className="text-muted-foreground text-sm">Document #{documentIdParam}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading document...</span>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {(error as Error)?.message || 'Failed to load document.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Content */}
      {!isLoading && !error && documentContent && (
        <>
          <DocumentPreview content={documentContent} />

          {actionError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>

            {!metadata?.finalized && metadata?.status !== DocumentStatus.finalized && (
              <Button
                type="button"
                onClick={handleFinalize}
                disabled={finalizeDocumentMutation.isPending}
                className="gap-2"
              >
                {finalizeDocumentMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Finalizing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Finalize Document
                  </>
                )}
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="gap-2 ml-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              New Document
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
