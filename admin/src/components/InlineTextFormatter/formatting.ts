// Formatting utilities for inline text editor

export const applyFormat = (format: string, value?: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  switch (format) {
    case 'bold':
      document.execCommand('bold', false);
      break;
    case 'italic':
      document.execCommand('italic', false);
      break;
    case 'underline':
      document.execCommand('underline', false);
      break;
    case 'strikethrough':
      document.execCommand('strikeThrough', false);
      break;
    case 'code':
      wrapSelectionInTag('code');
      break;
    case 'link':
      if (value) {
        document.execCommand('createLink', false, value);
      }
      break;
    default:
      break;
  }
};

const wrapSelectionInTag = (tagName: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (!selectedText) return;

  const element = document.createElement(tagName);
  element.textContent = selectedText;

  range.deleteContents();
  range.insertNode(element);

  // Move cursor after the inserted element
  range.setStartAfter(element);
  range.setEndAfter(element);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const getSelectionFormat = (): Set<string> => {
  const formats = new Set<string>();
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) return formats;

  let node = selection.anchorNode;

  while (node && node.nodeType !== Node.DOCUMENT_NODE) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      switch (tagName) {
        case 'b':
        case 'strong':
          formats.add('bold');
          break;
        case 'i':
        case 'em':
          formats.add('italic');
          break;
        case 'u':
          formats.add('underline');
          break;
        case 'strike':
        case 's':
        case 'del':
          formats.add('strikethrough');
          break;
        case 'code':
          formats.add('code');
          break;
        case 'a':
          formats.add('link');
          break;
      }
    }
    node = node.parentNode;
  }

  return formats;
};

export const convertToMarkdown = (html: string): string => {
  let markdown = html;

  // Convert links
  markdown = markdown.replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Convert bold
  markdown = markdown.replace(/<(b|strong)>(.*?)<\/(b|strong)>/gi, '**$2**');

  // Convert italic
  markdown = markdown.replace(/<(i|em)>(.*?)<\/(i|em)>/gi, '*$2*');

  // Convert underline (not standard markdown, using HTML)
  markdown = markdown.replace(/<u>(.*?)<\/u>/gi, '<u>$1</u>');

  // Convert strikethrough
  markdown = markdown.replace(/<(strike|s|del)>(.*?)<\/(strike|s|del)>/gi, '~~$2~~');

  // Convert inline code
  markdown = markdown.replace(/<code>(.*?)<\/code>/gi, '`$1`');

  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  markdown = markdown.replace(/&nbsp;/g, ' ');
  markdown = markdown.replace(/&amp;/g, '&');
  markdown = markdown.replace(/&lt;/g, '<');
  markdown = markdown.replace(/&gt;/g, '>');
  markdown = markdown.replace(/&quot;/g, '"');

  return markdown.trim();
};

export const convertToHtml = (markdown: string): string => {
  let html = markdown;

  // Escape HTML entities first
  html = html.replace(/&/g, '&amp;');
  html = html.replace(/</g, '&lt;');
  html = html.replace(/>/g, '&gt;');

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

  // Convert bold
  html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

  // Convert italic
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

  // Convert strikethrough
  html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  return html;
};
