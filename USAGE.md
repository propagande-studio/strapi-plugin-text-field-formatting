# Inline Text Formatter - Usage Examples

## Basic Setup

After installing the plugin, you can add the Inline Text Formatter field to any content type.

### Step 1: Add Field to Content Type

1. Navigate to **Content-Type Builder**
2. Select your content type (e.g., "Article")
3. Click **"Add another field"**
4. Scroll to **Custom** section
5. Select **"Inline Text Formatter"**
6. Configure the field name (e.g., "subtitle")

### Step 2: Configure Field Options

**Output Format:**

- Choose **HTML** for direct HTML storage (recommended for most use cases)
- Choose **Markdown** for Markdown storage (better for plain-text editing)

**Allowed Formats:**

- Select the formatting options you want to enable
- By default, all options are enabled (bold, italic, underline, strikethrough, code, link)

## Usage Examples

### Example 1: Article Subtitle with Limited Formatting

**Configuration:**

- Output: HTML
- Allowed Formats: bold, italic

**Use Case:** Simple subtitle that only needs basic emphasis

```
Content Type: Article
Field: subtitle (Inline Text Formatter)
```

### Example 2: Technical Documentation with Code

**Configuration:**

- Output: Markdown
- Allowed Formats: bold, italic, code, link

**Use Case:** Documentation that includes inline code examples

```
Content Type: Documentation
Field: description (Inline Text Formatter)
```

### Example 3: Product Description with Links

**Configuration:**

- Output: HTML
- Allowed Formats: bold, italic, underline, link

**Use Case:** Product descriptions with promotional links

```
Content Type: Product
Field: shortDescription (Inline Text Formatter)
```

## API Response Examples

### HTML Output

When you query content with HTML output format:

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "subtitle": "This is <strong>bold</strong> and <em>italic</em> text with a <a href=\"https://example.com\">link</a>."
    }
  }
}
```

### Markdown Output

When you query content with Markdown output format:

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "subtitle": "This is **bold** and *italic* text with a [link](https://example.com)."
    }
  }
}
```

## Frontend Integration

### React Example (HTML output)

```jsx
function Article({ data }) {
  return (
    <div>
      <h1>{data.attributes.title}</h1>
      <div className="subtitle" dangerouslySetInnerHTML={{ __html: data.attributes.subtitle }} />
    </div>
  );
}
```

### React Example (Markdown output)

```jsx
import ReactMarkdown from 'react-markdown';

function Article({ data }) {
  return (
    <div>
      <h1>{data.attributes.title}</h1>
      <ReactMarkdown className="subtitle">{data.attributes.subtitle}</ReactMarkdown>
    </div>
  );
}
```

## Keyboard Shortcuts

When editing in the field:

- **Cmd/Ctrl + B**: Toggle bold
- **Cmd/Ctrl + I**: Toggle italic
- **Cmd/Ctrl + U**: Toggle underline
- Select text and click the link icon to add a hyperlink

## Best Practices

1. **Choose the right output format:**
   - Use HTML for web-focused content
   - Use Markdown for documentation or multi-platform content

2. **Limit formatting options:**
   - Only enable the formats you actually need
   - Fewer options = cleaner content

3. **Field validation:**
   - Set min/max length in advanced settings if needed
   - Use the "required" option for mandatory fields

4. **Use cases:**
   - ✅ Short descriptions with simple formatting
   - ✅ Subtitles and taglines
   - ✅ Brief summaries with links
   - ❌ Long-form content (use Rich Text instead)
   - ❌ Complex layouts (use Blocks instead)
