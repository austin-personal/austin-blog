import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-gray-900">
          {SITE.name}
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <li>
            <Link href="/posts" className="hover:text-gray-900 transition-colors">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-900 transition-colors">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
