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

    const sanitizeHtml = (html: string): string => {
      // Create a temporary element to parse HTML
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Map of allowed formatting to their standard tags
      const allowedTags: { [key: string]: string[] } = {
        bold: ['b', 'strong'],
        italic: ['i', 'em'],
        underline: ['u'],
        strikethrough: ['strike', 's', 'del'],
        code: ['code'],
        link: ['a'],
      };

      // Create set of all allowed tag names
      const allowedTagNames = new Set<string>();
      allowedFormats.forEach((format) => {
        const tags = allowedTags[format];
        if (tags) {
          tags.forEach((tag) => allowedTagNames.add(tag.toLowerCase()));
        }
      });

      // Helper function to detect style-based formatting
      const getStyleFormats = (element: HTMLElement): string[] => {
        const formats: string[] = [];
        const style = element.style;
        const computedStyle = window.getComputedStyle(element);

        // Check for bold
        const fontWeight = style.fontWeight || computedStyle.fontWeight;
        if (fontWeight && (fontWeight === 'bold' || parseInt(fontWeight) >= 600)) {
          formats.push('bold');
        }

        // Check for italic
        const fontStyle = style.fontStyle || computedStyle.fontStyle;
        if (fontStyle === 'italic') {
          formats.push('italic');
        }

        // Check for underline
        const textDecoration = style.textDecoration || computedStyle.textDecoration;
        if (textDecoration && textDecoration.includes('underline')) {
          formats.push('underline');
        }

        // Check for strikethrough
        if (textDecoration && textDecoration.includes('line-through')) {
          formats.push('strikethrough');
        }

        return formats;
      };

      // Recursive function to clean nodes
      const cleanNode = (node: Node, isFirstChild: boolean = false): Node | null => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.cloneNode(false);
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          const tagName = element.tagName.toLowerCase();

          // Handle line breaks
          if (tagName === 'br') {
            return document.createElement('br');
          }

          // Get style-based formats
          const styleFormats = getStyleFormats(element);

          // If it's an allowed tag, keep it but remove styles
          if (allowedTagNames.has(tagName)) {
            const newElement = document.createElement(tagName);

            // Keep href for links
            if (tagName === 'a' && element.hasAttribute('href')) {
              newElement.setAttribute('href', element.getAttribute('href')!);
            }

            // Process children
            Array.from(element.childNodes).forEach((child) => {
              const cleanedChild = cleanNode(child, false);
              if (cleanedChild) {
                newElement.appendChild(cleanedChild);
              }
            });

            return newElement;
          } else if (tagName === 'div' || tagName === 'p') {
            // For block elements, convert to br (except first one)
            const fragment = document.createDocumentFragment();

            if (!isFirstChild) {
              fragment.appendChild(document.createElement('br'));
            }

            // Wrap children in appropriate formatting tags if styles are present
            let childrenFragment = document.createDocumentFragment();
            Array.from(element.childNodes).forEach((child) => {
              const cleanedChild = cleanNode(child, false);
              if (cleanedChild) {
                childrenFragment.appendChild(cleanedChild);
              }
            });

            // Apply style-based formatting
            let wrappedContent: Node = childrenFragment;
            styleFormats.forEach((format) => {
              if (allowedFormats.includes(format)) {
                let wrapperTag = '';
                switch (format) {
                  case 'bold':
                    wrapperTag = 'strong';
                    break;
                  case 'italic':
                    wrapperTag = 'em';
                    break;
                  case 'underline':
                    wrapperTag = 'u';
                    break;
                  case 'strikethrough':
                    wrapperTag = 'del';
                    break;
                }
                if (wrapperTag) {
                  const wrapper = document.createElement(wrapperTag);
                  wrapper.appendChild(wrappedContent);
                  wrappedContent = wrapper;
                }
              }
            });

            fragment.appendChild(wrappedContent);
            return fragment;
          } else {
            // For disallowed tags, process children and wrap with style-based formatting
            let childrenFragment = document.createDocumentFragment();
            Array.from(element.childNodes).forEach((child) => {
              const cleanedChild = cleanNode(child, false);
              if (cleanedChild) {
                childrenFragment.appendChild(cleanedChild);
              }
            });

            // Apply style-based formatting if present
            let wrappedContent: Node = childrenFragment;
            styleFormats.forEach((format) => {
              if (allowedFormats.includes(format)) {
                let wrapperTag = '';
                switch (format) {
                  case 'bold':
                    wrapperTag = 'strong';
                    break;
                  case 'italic':
                    wrapperTag = 'em';
                    break;
                  case 'underline':
                    wrapperTag = 'u';
                    break;
                  case 'strikethrough':
                    wrapperTag = 'del';
                    break;
                }
                if (wrapperTag) {
                  const wrapper = document.createElement(wrapperTag);
                  wrapper.appendChild(wrappedContent);
                  wrappedContent = wrapper;
                }
              }
            });

            return wrappedContent;
          }
        }

        return null;
      };

      const fragment = document.createDocumentFragment();
      Array.from(temp.childNodes).forEach((child, index) => {
        const cleanedChild = cleanNode(child, index === 0);
        if (cleanedChild) {
          fragment.appendChild(cleanedChild);
        }
      });

      const cleanedDiv = document.createElement('div');
      cleanedDiv.appendChild(fragment);
      return cleanedDiv.innerHTML;
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();

      // Get HTML content from clipboard
      let html = e.clipboardData.getData('text/html');

      // If no HTML, convert plain text to HTML with line breaks
      if (!html) {
        const text = e.clipboardData.getData('text/plain');
        if (!text) return;

        // Convert plain text newlines to <br> tags
        html = text.split('\n').join('<br>');
      }

      // Sanitize to keep only allowed formatting
      const cleanedHtml = sanitizeHtml(html);

      // Handle newlines if not allowed
      let finalHtml = cleanedHtml;
      if (!allowNewlines) {
        finalHtml = cleanedHtml.replace(/<br\s*\/?>/gi, ' ').replace(/\n/g, ' ');
      }

      // Insert at cursor position
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      // Create a temporary element to convert HTML to nodes
      const temp = document.createElement('div');
      temp.innerHTML = finalHtml;

      // Insert all nodes
      const fragment = document.createDocumentFragment();
      while (temp.firstChild) {
        fragment.appendChild(temp.firstChild);
      }

      range.insertNode(fragment);

      // Move cursor to end
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);

      // Trigger input handler to update field value
      handleInput();
    };

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
            onPaste={handlePaste}
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
