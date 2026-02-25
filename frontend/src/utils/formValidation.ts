export function validateFormInputs(
  formData: Record<string, string>,
  placeholders: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};

  placeholders.forEach((placeholder) => {
    const value = formData[placeholder]?.trim();
    
    if (!value) {
      errors[placeholder] = 'This field is required';
      return;
    }

    // Email validation
    if (placeholder.includes('EMAIL')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[placeholder] = 'Please enter a valid email address';
      }
    }

    // Date validation
    if (placeholder.includes('DATE')) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        errors[placeholder] = 'Please enter a valid date (YYYY-MM-DD)';
      }
    }

    // Minimum length for certain fields
    if (placeholder.includes('DESCRIPTION') || placeholder.includes('TERMS')) {
      if (value.length < 10) {
        errors[placeholder] = 'Please provide more detail (at least 10 characters)';
      }
    }
  });

  return errors;
}

export function formatPlaceholderLabel(placeholder: string): string {
  return placeholder
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export function getInputType(placeholder: string): string {
  if (placeholder.includes('EMAIL')) return 'email';
  if (placeholder.includes('DATE')) return 'date';
  if (placeholder.includes('PHONE')) return 'tel';
  return 'text';
}
