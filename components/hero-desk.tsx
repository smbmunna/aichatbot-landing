"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Database, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { Channel } from "@/lib/content";
import { ChannelIcon } from "./channel-icon";

type Script = {
  channel: Channel;
  customer: string;
  message: string;
  intent: string;
  language: string;
  facts: [string, string][];
  reply: string;
  bangla?: boolean;
};

const scripts: Script[] = [
  {
    channel: "instagram",
    customer: "Nusrat J.",
    message: "Apu blue kurti ta M size e ache? dam koto?",
    intent: "Product question",
    language: "Banglish",
    facts: [
      ["Product", "Blue Cotton Kurti"],
      ["Size M", "12 in stock"],
      ["Price", "৳1,450"],
    ],
    reply:
      "Ji apu, Blue Cotton Kurti M size e stock e ache 😊 Dam ৳1,450. Order korte chaile apnar naam, phone ar address ta diben?",
  },
  {
    channel: "facebook",
    customer: "Rafiq H.",
    message: "লাল জামদানি শাড়িটা কি এখনও পাওয়া যাবে? দাম কত?",
    intent: "Availability + price",
    language: "Bangla",
    facts: [
      ["Product", "Red Jamdani Saree"],
      ["Stock", "3 available"],
      ["Price", "৳4,200"],
    ],
    reply: "জি, লাল জামদানি শাড়িটা এখনও স্টকে আছে। দাম ৳4,200। অর্ডার করতে চাইলে আপনার নাম, ফোন নম্বর আর ঠিকানা দিন।",
    bangla: true,
  },
];

const inbox: { channel: Channel; name: string; preview: string; tag?: string }[] = [
  { channel: "instagram", name: "Nusrat J.", preview: "blue kurti ta M size e…" },
  { channel: "facebook", name: "Rafiq H.", preview: "লাল জামদানি শাড়িটা…" },
  { channel: "whatsapp", name: "Tanvir A.", preview: "Order #1042 kobe pabo?", tag: "Status" },
  { channel: "facebook", name: "Sadia R.", preview: "Parcel damaged, refund…", tag: "Handover" },
  { channel: "web", name: "Guest 2291", preview: "Do you deliver to Sylhet?" },
];

// Timing of each reveal step in ms; the last entry is the pause before looping.
const STEP_MS = [900, 1300, 1500, 1700, 1400, 2600];
const LAST_STEP = STEP_MS.length - 1;

const pop = {
  initial: { opacity: 0, y: 12, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.45 },
};

export function HeroDesk() {
  const reduce = useReducedMotion();
  const [scriptIndex, setScriptIndex] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      if (step < LAST_STEP) {
        setStep(step + 1);
      } else {
        setStep(0);
        setScriptIndex((i) => (i + 1) % scripts.length);
      }
    }, STEP_MS[step]);
    return () => clearTimeout(t);
  }, [step, reduce]);

  const s = scripts[scriptIndex];
  const shown = reduce ? LAST_STEP : step;
  const bn = s.bangla ? "font-bangla" : "";

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-300/40 via-sky-200/30 to-violet-200/40 blur-2xl" />
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_-40px_rgb(15_23_42/0.45)] ring-1 ring-slate-200">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs font-medium text-slate-500">Inbox · All channels</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">
            Review mode
          </span>
        </div>

        <div className="grid sm:grid-cols-[200px_1fr]">
          {/* conversation list */}
          <ul className="hidden border-r border-slate-100 py-2 sm:block">
            {inbox.map((c, i) => {
              const active = c.name === s.customer;
              return (
                <li
                  key={c.name}
                  className={`relative mx-2 flex items-center gap-2.5 rounded-xl px-2 py-2.5 ${active ? "" : "opacity-70"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-convo"
                      className="absolute inset-0 rounded-xl bg-brand-50 ring-1 ring-brand-100"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <ChannelIcon channel={c.channel} size={11} className="relative rounded-lg" />
                  <span className="relative min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-1">
                      <span className="truncate text-xs font-semibold text-ink">{c.name}</span>
                      {c.tag && (
                        <span
                          className={`shrink-0 rounded px-1 text-[9px] font-semibold ${
                            c.tag === "Handover" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"
                          }`}
                        >
                          {c.tag}
                        </span>
                      )}
                    </span>
                    <span className={`block truncate text-[11px] text-slate-500 ${i === 1 ? "font-bangla" : ""}`}>
                      {c.preview}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* active conversation */}
          <div className="flex h-[440px] flex-col">
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
              <ChannelIcon channel={s.channel} size={11} className="rounded-lg" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={s.customer}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  className="text-sm font-semibold text-ink"
                >
                  {s.customer}
                </motion.span>
              </AnimatePresence>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                <UserRound size={12} /> Take over
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden bg-[radial-gradient(circle_at_top,_var(--color-slate-50),_white)] p-4">
              <AnimatePresence mode="popLayout">
                {shown >= 0 && (
                  <motion.div key={`${scriptIndex}-msg`} layout {...pop} className="max-w-[85%] self-start">
                    <div className={`rounded-2xl rounded-bl-md bg-slate-100 px-3.5 py-2.5 text-sm text-ink ${bn}`}>
                      {s.message}
                    </div>
                  </motion.div>
                )}

                {shown >= 1 && (
                  <motion.div key={`${scriptIndex}-read`} layout {...pop} className="flex flex-wrap gap-1.5">
                    <Chip icon={<Sparkles size={12} />} tone="violet">
                      {s.intent}
                    </Chip>
                    <Chip tone="sky">{s.language}</Chip>
                  </motion.div>
                )}

                {shown >= 2 && (
                  <motion.div
                    key={`${scriptIndex}-facts`}
                    layout
                    {...pop}
                    className="rounded-xl border border-dashed border-brand-200 bg-brand-50/60 p-3"
                  >
                    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-700">
                      <Database size={12} /> Facts from your catalog
                    </div>
                    <dl className="grid grid-cols-3 gap-2">
                      {s.facts.map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[10px] text-slate-500">{k}</dt>
                          <dd className="text-xs font-semibold text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}

                {shown >= 3 && (
                  <motion.div key={`${scriptIndex}-reply`} layout {...pop} className="max-w-[88%] self-end">
                    <div className="mb-1 flex items-center justify-end gap-1 text-[10px] font-medium text-slate-500">
                      <Sparkles size={10} /> AI draft
                    </div>
                    <div
                      className={`rounded-2xl rounded-br-md bg-brand-600 px-3.5 py-2.5 text-sm text-white shadow-md shadow-brand-600/20 ${bn}`}
                    >
                      {s.reply}
                    </div>
                  </motion.div>
                )}

                {shown >= 4 && (
                  <motion.div
                    key={`${scriptIndex}-check`}
                    layout
                    {...pop}
                    className="flex items-center justify-end gap-2"
                  >
                    <Chip icon={<ShieldCheck size={12} />} tone="brand">
                      Numbers match your records
                    </Chip>
                    <AnimatePresence mode="wait">
                      {shown >= 5 ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white"
                        >
                          <Check size={12} /> Approved &amp; sent
                        </motion.span>
                      ) : (
                        <motion.span
                          key="approve"
                          exit={{ opacity: 0, scale: 0.9 }}
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-slate-300"
                        >
                          Approve
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({
  children,
  icon,
  tone,
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone: "violet" | "sky" | "brand";
}) {
  const tones = {
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    sky: "bg-sky-50 text-sky-700 ring-sky-200",
    brand: "bg-brand-50 text-brand-700 ring-brand-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ${tones[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
