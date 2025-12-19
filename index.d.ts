declare module 'propagande-text-field-formatting' {
  export interface InlineTextFormatterOptions {
    output?: 'html' | 'markdown';
    allowedFormats?: Array<'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link'>;
  }

  export interface InlineTextFormatterAttribute {
    type: 'customField';
    customField: 'plugin::propagande-text-field-formatting.inline-text-formatter';
    options?: InlineTextFormatterOptions;
  }
}

declare module '@strapi/strapi' {
  interface CustomFields {
    'plugin::propagande-text-field-formatting.inline-text-formatter': {
      type: 'string';
      options?: {
        output?: 'html' | 'markdown';
        allowedFormats?: Array<'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link'>;
      };
    };
  }
}
