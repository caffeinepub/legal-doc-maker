import { UserInput } from '../backend';

/**
 * Replaces all [PLACEHOLDER] tokens in the template content with user-provided values.
 */
export function generateDocumentContent(
  templateContent: string,
  userInputs: UserInput[]
): string {
  let content = templateContent;

  for (const input of userInputs) {
    const token = `[${input.placeholder}]`;
    // Replace all occurrences
    while (content.includes(token)) {
      content = content.replace(token, input.value);
    }
  }

  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${content}\n\n---\nGenerated on ${timestamp} via LegalDocs`;
}
