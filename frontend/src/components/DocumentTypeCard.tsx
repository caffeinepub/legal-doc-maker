import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface DocumentTypeCardProps {
  id: number;
  icon: string;
  title: string;
  description: string;
  category: string;
  onSelect: (id: number) => void;
}

export default function DocumentTypeCard({
  id,
  icon,
  title,
  description,
  category,
  onSelect,
}: DocumentTypeCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-3xl">{icon}</div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {category}
          </Badge>
        </div>
        <CardTitle className="font-heading text-base leading-snug mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
          onClick={() => onSelect(id)}
        >
          Select Template
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
