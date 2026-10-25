import { navLinks, site } from "@/lib/content";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            One desk for customer messages, comments and orders — answered from your own records.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-600 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-100">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 sm:px-6">
          © {site.company}. {site.name}. Facebook, Instagram, WhatsApp and other platform names are trademarks of their
          respective owners.
        </p>
      </div>
    </footer>
  );
}
