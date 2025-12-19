import React, { useRef, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Field } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';
import { FormattingToolbar } from './FormattingToolbar';
import { convertToHtml, convertToMarkdown, applyFormat, getSelectionFormat } from './formatting';
import { EditorContainer, StyledInput } from './styles';

interface InlineTextFormatterProps {
  hint?: string;
  disabled?: boolean;
  labelAction?: React.ReactNode;
  label?: React.ReactNode;
  name: string;
  required?: boolean;
  attribute?: any;
}

export const InlineTextFormatter = React.forwardRef<HTMLDivElement, InlineTextFormatterProps>(
  ({ hint, disabled, labelAction, label, name, required, attribute, ...props }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const field = useField(name);
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

    // Get options from attribute (set in field configuration)
    const options = (attribute as any)?.options || {};
    const output = options.output || 'html';
    const allowNewlines = options.allowNewlines !== false;

    // Build allowedFormats array from individual boolean options
    const allowedFormats: string[] = [];
    if (options.allowBold !== false) allowedFormats.push('bold');
    if (options.allowItalic !== false) allowedFormats.push('italic');
    if (options.allowUnderline !== false) allowedFormats.push('underline');
    if (options.allowStrikethrough !== false) allowedFormats.push('strikethrough');
    if (options.allowCode !== false) allowedFormats.push('code');
    if (options.allowLink !== false) allowedFormats.push('link');

    useEffect(() => {
      if (editorRef.current && field.value) {
        // Initialize content from value
        if (output === 'html') {
          editorRef.current.innerHTML = field.value;
        } else {
          editorRef.current.innerHTML = convertToHtml(field.value);
        }
      }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !allowNewlines) {
        e.preventDefault();
      }
    };

    const handleInput = () => {
      if (editorRef.current) {
        const htmlContent = editorRef.current.innerHTML;
        const outputValue = output === 'markdown' ? convertToMarkdown(htmlContent) : htmlContent;
        field.onChange(name, outputValue);
      }
    };

    const handleSelectionChange = () => {
      const formats = getSelectionFormat();
      setActiveFormats(formats);
    };

    const handleFormat = (format: string, value?: string) => {
      if (editorRef.current) {
        editorRef.current.focus();
        applyFormat(format, value);
        handleInput();
        handleSelectionChange();
      }
    };

    return (
      <Field.Root name={name} id={name} error={field.error} hint={hint} required={required}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        <EditorContainer>
          <FormattingToolbar
            onFormat={handleFormat}
            activeFormats={activeFormats}
            allowedFormats={allowedFormats}
            disabled={disabled}
          />
          <StyledInput
            ref={editorRef}
            contentEditable={!disabled}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onMouseUp={handleSelectionChange}
            onKeyUp={handleSelectionChange}
            aria-label={typeof label === 'string' ? label : name}
            role="textbox"
            aria-multiline={allowNewlines ? 'true' : 'false'}
          />
        </EditorContainer>
        <Field.Error />
        <Field.Hint />
      </Field.Root>
    );
  }
);
