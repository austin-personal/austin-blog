interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Table of Contents</h2>
      <ul className="space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
          >
            <a
              href={`#${heading.id}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
