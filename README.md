# Propagande Text Field Formatting

A Strapi plugin that adds a custom field for inline text formatting. This plugin provides a simpler alternative to the full WYSIWYG editor, offering only inline formatting options.

## Features

- **Bold** - Make text bold
- **Italic** - Italicize text
- **Underline** - Underline text
- **Strikethrough** - Strike through text
- **Inline Code** - Format text as code
- **Hyperlinks** - Add links to text

## Configuration Options

For each field, you can configure:

- **Output Format**: Choose between HTML or Markdown storage
- **Allowed Formats**: Select which formatting options are available (bold, italic, underline, strikethrough, code, links)

## Installation

```bash
npm install propagande-text-field-formatting
# or
yarn add propagande-text-field-formatting
```

Then, add the plugin to your Strapi configuration in `config/plugins.js` (or `config/plugins.ts`):

```javascript
module.exports = {
  // ...
  'propagande-text-field-formatting': {
    enabled: true,
  },
};
```

## Usage

1. Go to **Content-Type Builder** in your Strapi admin panel
2. Select an existing content type or create a new one
3. Click **Add another field**
4. In the custom fields section, select **Inline Text Formatter**
5. Configure your field:
   - Choose the output format (HTML or Markdown)
   - Select which formatting options to allow
6. Save your content type
7. Use the field in your content editor with the formatting toolbar

## Output Formats

### HTML Output

When configured for HTML output, the field stores formatted text as HTML:

```html
This is <strong>bold</strong> and <em>italic</em> text with a
<a href="https://example.com">link</a>.
```

### Markdown Output

When configured for Markdown output, the field stores formatted text as Markdown:

```markdown
This is **bold** and _italic_ text with a [link](https://example.com).
```

## Development

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Watch for changes
npm run watch

# Type checking
npm run test:ts:front
npm run test:ts:back
```

## License

MIT

## Author

Benjamin Robinet <benjamin@propagande.studio>
