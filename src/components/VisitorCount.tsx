"use client";

import { useEffect, useState } from "react";

const COUNT_API =
  "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Faustin-personal.github.io%2Faustin-blog&count_bg=%23555555&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true";

export default function VisitorCount() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="mt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={COUNT_API}
        alt="visitor count"
        className="h-6"
      />
    </div>
  );
}
