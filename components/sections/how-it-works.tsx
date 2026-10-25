"use client";

import { motion } from "framer-motion";
import { Brain, Database, Inbox, Scale, Send, type LucideIcon } from "lucide-react";
import { pipeline } from "@/lib/content";
import { ease } from "../motion";
import { SectionHeading } from "../ui";

const icons: LucideIcon[] = [Inbox, Brain, Database, Scale, Send];

const decisions = [
  { label: "Reply", tone: "bg-brand-500/15 text-brand-300 ring-brand-400/30" },
  { label: "Draft for review", tone: "bg-amber-400/10 text-amber-300 ring-amber-300/30" },
  { label: "Hand over", tone: "bg-rose-400/10 text-rose-300 ring-rose-300/30" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="How it works"
          title="AI understands the message. Your rules stay in charge."
          body="The model reads the conversation and writes the words. Whether to reply, auto-send or hand over — and what anything costs — is decided by your settings and your records."
        />

        <motion.div
          className="relative mt-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {/* connector line */}
          <div aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-brand-400 via-teal-300 to-brand-400"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 1.6, ease }}
            />
          </div>
          <div aria-hidden className="absolute top-0 bottom-0 left-7 w-px bg-white/10 lg:hidden">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-brand-400 to-teal-300"
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1 } }}
              transition={{ duration: 1.6, ease }}
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {pipeline.map((p, i) => {
              const Icon = icons[i];
              return (
                <motion.li
                  key={p.title}
                  className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.25 }}
                >
                  <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-brand-300 ring-1 ring-white/15 shadow-[0_0_40px_-8px] shadow-brand-500/50">
                    <Icon size={22} />
                    <span className="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.body}</p>
                    {i === 3 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 lg:justify-center">
                        {decisions.map((d, j) => (
                          <motion.span
                            key={d.label}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${d.tone}`}
                            variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                            transition={{ delay: 1.3 + j * 0.15, duration: 0.4 }}
                          >
                            {d.label}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
