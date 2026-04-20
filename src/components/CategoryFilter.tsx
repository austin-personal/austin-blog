"use client";

import { CATEGORIES } from "@/lib/constants";

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onChange: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          selected === null
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {CATEGORIES[cat] ?? cat}
        </button>
      ))}
    </div>
  );
}
