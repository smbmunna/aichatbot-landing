import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 shadow-[0_6px_20px_-6px] shadow-brand-600/60">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
          <path
            d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4h0A2 2 0 0 1 5 13V6.5Z"
            fill="white"
          />
          <path d="m12 6.8.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9Z" fill="#07916d" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`whitespace-nowrap text-[15px] font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
          Sales &amp; Support Desk
        </span>
        <span className={`mt-1 text-[11px] font-medium ${dark ? "text-white/50" : "text-slate-500"}`}>
          AI by AppifyDevs
        </span>
      </span>
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost-dark";
  className?: string;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_30px_-10px] shadow-brand-600/70 hover:bg-brand-700",
  secondary: "bg-white text-ink ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50",
  light: "bg-white text-ink hover:bg-brand-50",
  "ghost-dark": "text-white ring-1 ring-white/20 hover:bg-white/10",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
        dark ? "bg-white/10 text-brand-300" : "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${align === "center" ? "mx-auto items-center text-center" : "items-start"}`}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`text-balance text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {body && (
        <p className={`text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-white/65" : "text-slate-600"}`}>
          {body}
        </p>
      )}
    </Reveal>
  );
}
