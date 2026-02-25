import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentPreviewProps {
  content: string;
}

export default function DocumentPreview({ content }: DocumentPreviewProps) {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border bg-white dark:bg-gray-950">
      <div className="p-12 max-w-4xl mx-auto">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap font-serif text-foreground leading-relaxed text-justify">
            {content}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
