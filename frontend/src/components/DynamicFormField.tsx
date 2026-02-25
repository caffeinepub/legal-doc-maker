import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatPlaceholderLabel, getInputType } from '../utils/formValidation';

interface DynamicFormFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DynamicFormField({ placeholder, value, onChange, error }: DynamicFormFieldProps) {
  const label = formatPlaceholderLabel(placeholder);
  const inputType = getInputType(placeholder);
  const isTextarea = placeholder.includes('DESCRIPTION') || placeholder.includes('TERMS') || placeholder.includes('POWERS');

  return (
    <div className="space-y-2">
      <Label htmlFor={placeholder} className="text-sm font-medium">
        {label}
        <span className="text-destructive ml-1">*</span>
      </Label>
      {isTextarea ? (
        <Textarea
          id={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={error ? 'border-destructive' : ''}
          rows={4}
        />
      ) : (
        <Input
          id={placeholder}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={error ? 'border-destructive' : ''}
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
