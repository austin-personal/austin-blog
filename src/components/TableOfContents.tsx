"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/headings";

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Outline
        </h3>
        <ul className="mt-3 space-y-1.5 text-sm border-l border-gray-200">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12 + 12}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-0.5 transition-colors border-l-2 -ml-px pl-3 ${
                  activeId === heading.id
                    ? "border-gray-900 text-gray-900 font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
