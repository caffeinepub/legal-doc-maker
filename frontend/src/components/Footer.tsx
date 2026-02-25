import { SiGithub } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'legal-doc-maker';

  return (
    <footer className="border-t bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              © {currentYear} LegalDoc Maker. For informational purposes only.
            </p>
            <p className="text-xs">
              This tool generates document templates and does not constitute legal advice. 
              Consult with a qualified attorney for legal matters.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Built with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
