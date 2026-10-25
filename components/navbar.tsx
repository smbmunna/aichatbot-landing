"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Button, Logo } from "./ui";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 transition-all duration-300 sm:px-4 ${
          scrolled || open
            ? "bg-white/80 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.25)] ring-1 ring-slate-200/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a href="#top" aria-label="Back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Button href={site.bookingHref} className="h-9 px-4">
              Book a pilot
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-slate-100 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="p-2 sm:hidden" onClick={() => setOpen(false)}>
                <Button href={site.bookingHref} className="w-full">
                  Book a pilot
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
