import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGenerateDocument } from '../hooks/useQueries';
import { AVAILABLE_TEMPLATES, TemplateDefinition } from '../lib/templates';
import DynamicFormField from '../components/DynamicFormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { generateDocumentContent } from '../utils/documentGeneration';

export default function DocumentFormPage() {
  const navigate = useNavigate();
  const { templateId: templateIdParam } = useParams({ from: '/document/form/$templateId' });
  const { identity } = useInternetIdentity();
  const generateDocumentMutation = useGenerateDocument();

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const templateId = parseInt(templateIdParam, 10);
  const template: TemplateDefinition | undefined = AVAILABLE_TEMPLATES.find(
    (t) => t.id === templateId
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  // Redirect if template not found
  useEffect(() => {
    if (!isNaN(templateId) && !template) {
      navigate({ to: '/' });
    }
  }, [templateId, template, navigate]);

  if (!identity) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-muted-foreground">Please log in to create documents.</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-muted-foreground">Template not found.</p>
      </div>
    );
  }

  const handleFieldChange = (placeholder: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [placeholder]: value }));
    if (errors[placeholder]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[placeholder];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const placeholder of template.placeholders) {
      const val = formValues[placeholder]?.trim() || '';
      if (!val) {
        newErrors[placeholder] = 'This field is required.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      // Build user inputs array
      const userInputs = template.placeholders.map((placeholder) => ({
        placeholder,
        value: formValues[placeholder]?.trim() || '',
      }));

      // Generate document content string
      const documentContent = generateDocumentContent(template.content, userInputs);

      // Encode content as bytes
      const encoder = new TextEncoder();
      const contentBytes = encoder.encode(documentContent);

      // Call backend
      const documentId = await generateDocumentMutation.mutateAsync({
        templateId: BigInt(template.id),
        userInputs,
        contentBytes,
      });

      toast.success('Document generated successfully!');
      navigate({
        to: '/document/preview/$documentId',
        params: { documentId: String(documentId) },
      });
    } catch (err: any) {
      const msg = err?.message || 'Failed to generate document. Please try again.';
      setSubmitError(msg);
      toast.error(msg);
    }
  };

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{template.icon}</span>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{template.title}</h1>
            <p className="text-muted-foreground text-sm">{template.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Fill in the Details
          </CardTitle>
          <CardDescription>
            Complete all fields below to generate your personalized {template.title}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {template.placeholders.map((placeholder) => (
              <DynamicFormField
                key={placeholder}
                placeholder={placeholder}
                value={formValues[placeholder] || ''}
                onChange={(val) => handleFieldChange(placeholder, val)}
                error={errors[placeholder]}
              />
            ))}

            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/' })}
                disabled={generateDocumentMutation.isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={generateDocumentMutation.isPending}
                className="flex-1 gap-2"
              >
                {generateDocumentMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Generate Document
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
