import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.author.name} — ${SITE.description}`,
};

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">About</h1>

      <div className="prose prose-gray mt-8 max-w-none">
        <p>
          Hi, I&apos;m <strong>{SITE.author.name}</strong>.
        </p>
        <p>{SITE.author.bio}</p>

        <h2>This Blog</h2>
        <p>
          {SITE.name} is where I write about development, technology, and
          other things that interest me. Built with Next.js and hosted on
          GitHub Pages.
        </p>

        <h2>Contact</h2>
        <p>
          Feel free to reach out at{" "}
          <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a>.
        </p>
      </div>
    </>
  );
}
