"use client";

import { useEffect, useState } from "react";

const COUNTER_URL =
  "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Faustin-personal.github.io%2Faustin-blog&count_bg=%23555555&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=&edge_flat=true";

export default function VisitorCount() {
  const [counts, setCounts] = useState<{ today: string; total: string } | null>(null);

  useEffect(() => {
    fetch(COUNTER_URL)
      .then((res) => res.text())
      .then((svg) => {
        const matches = svg.match(/>\s*(\d+)\s*\/\s*(\d+)\s*</);
        if (matches) {
          setCounts({ today: matches[1], total: matches[2] });
        }
      })
      .catch(() => {});
  }, []);

  if (!counts) {
    return (
      <div className="mt-3">
        <img
          src={COUNTER_URL}
          alt="visitor count"
          className="h-5"
        />
      </div>
    );
  }

  return (
    <div className="mt-3 flex gap-4">
      <div>
        <p className="text-lg font-semibold text-gray-900">{counts.today}</p>
        <p className="text-xs text-gray-500">Today</p>
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-900">{counts.total}</p>
        <p className="text-xs text-gray-500">Total</p>
      </div>
    </div>
  );
}
