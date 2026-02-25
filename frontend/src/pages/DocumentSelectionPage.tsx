import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import DocumentTypeCard from '../components/DocumentTypeCard';
import HeroSection from '../components/HeroSection';
import LoginPrompt from '../components/LoginPrompt';
import { AVAILABLE_TEMPLATES } from '../lib/templates';

export default function DocumentSelectionPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const handleSelectTemplate = (templateId: number) => {
    navigate({ to: '/document/form/$templateId', params: { templateId: String(templateId) } });
  };

  return (
    <main className="flex-1">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isAuthenticated && (
          <div className="mb-10">
            <LoginPrompt />
          </div>
        )}

        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Available Templates
          </h2>
          <p className="text-muted-foreground">
            Choose from our professionally drafted legal document templates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_TEMPLATES.map((template) => (
            <DocumentTypeCard
              key={template.id}
              id={template.id}
              icon={template.icon}
              title={template.title}
              description={template.description}
              category={template.category}
              onSelect={handleSelectTemplate}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
