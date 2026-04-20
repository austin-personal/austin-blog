import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-3xl px-6 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} {SITE.author.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
