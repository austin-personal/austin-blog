"use client";

import { useEffect, useState } from "react";

const BADGE_URL =
  "https://komarev.com/ghpvc/?username=austin-personal-blog&color=grey&style=flat-square&label=visitors";

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
        src={BADGE_URL}
        alt="visitor count"
        className="h-5"
      />
    </div>
  );
}
