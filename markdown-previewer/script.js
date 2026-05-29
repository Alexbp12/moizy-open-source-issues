const input = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function parseMarkdown(text) {

  let parsedText = escapeHtml(text);

  // Headings
  parsedText = parsedText.replace(
    /^# (.*$)/gim,
    '<h1>$1</h1>'
  );

  parsedText = parsedText.replace(
    /^## (.*$)/gim,
    '<h2>$1</h2>'
  );

  parsedText = parsedText.replace(
    /^### (.*$)/gim,
    '<h3>$1</h3>'
  );

  // Bold
  parsedText = parsedText.replace(
    /\*\*(.*?)\*\*/g,
    '<strong>$1</strong>'
  );
  // Italic
  parsedText = parsedText.replace(
    /(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g,
    '<em>$1</em>'
  );
 
  // Links
  parsedText = parsedText.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );

  // Unordered lists
  parsedText = parsedText.replace(
    /^\- (.*$)/gim,
    '<li>$1</li>'
  );

  parsedText = parsedText.replace(
    /(<li>.*<\/li>)/gims,
    '<ul>$1</ul>'
  );

  // Code blocks

  parsedText = parsedText.replace(
    /```([\s\S]*?)```/g,
    '<pre><code>$1</code></pre>'
  );
    // Blockquotes
  parsedText = parsedText.replace(
    /^> (.*$)/gim,
    '<blockquote>$1</blockquote>'
  );

  // Horizontal rules
  parsedText = parsedText.replace(
    /^---$/gim,
    '<hr>'
  );
  // Line breaks
  parsedText = parsedText.replace(
    /\n/g,
    '<br>'
  );

  return parsedText;
}

input.addEventListener('input', () => {
  preview.innerHTML = parseMarkdown(input.value);
});

input.value = `# Hello World

This is **bold** text.

This is *italic* text.
`;

preview.innerHTML = parseMarkdown(input.value);