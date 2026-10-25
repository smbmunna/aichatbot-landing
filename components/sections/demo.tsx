"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  MessageSquareReply,
  PackageCheck,
  PackageSearch,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { Channel } from "@/lib/content";
import { ChannelIcon } from "../channel-icon";
import { ease } from "../motion";
import { SectionHeading } from "../ui";

type Bubble = {
  from: "customer" | "ai" | "public" | "system";
  text: string;
  note?: string;
};

type Scenario = {
  id: string;
  tab: string;
  icon: LucideIcon;
  channel: Channel;
  where: string;
  bubbles: Bubble[];
  decision: { label: string; value: string }[];
  outcome: { tone: "brand" | "rose"; text: string };
};

const scenarios: Scenario[] = [
  {
    id: "product",
    tab: "Product question",
    icon: PackageSearch,
    channel: "web",
    where: "Website chat",
    bubbles: [
      { from: "customer", text: "Hi! Do you have the linen shirt in olive, size L?" },
      {
        from: "ai",
        text: "Yes — the Linen Shirt in Olive is in stock in size L. It's ৳2,250. Would you like me to place an order for you?",
        note: "AI draft · numbers verified",
      },
    ],
    decision: [
      { label: "Intent", value: "Product question" },
      { label: "Language", value: "English" },
      { label: "Facts used", value: "Linen Shirt · Olive · L · 7 in stock · ৳2,250" },
      { label: "Rule", value: "Auto-send enabled for availability" },
    ],
    outcome: { tone: "brand", text: "Answered in seconds from the catalog" },
  },
  {
    id: "order",
    tab: "Order capture",
    icon: PackageCheck,
    channel: "instagram",
    where: "Instagram DM",
    bubbles: [
      { from: "customer", text: "Black ta nibo, 2 ta. Size 40." },
      { from: "ai", text: "Dhonnobad! Apnar naam, phone number ar delivery address ta diben?" },
      { from: "customer", text: "Arif Hossain, 017XXXXXXXX, House 12, Road 5, Mirpur 10, Dhaka" },
      {
        from: "ai",
        text: "Confirm korchi: Leather Loafer · Black · 40 × 2 = ৳5,800 + delivery ৳80. Total ৳5,880. Thik ache?",
      },
      { from: "customer", text: "Ji confirm" },
      { from: "system", text: "Order #1042 created · 2 units reserved" },
    ],
    decision: [
      { label: "Intent", value: "Place an order" },
      { label: "Collected", value: "Variant, quantity, name, phone, address" },
      { label: "Price", value: "Calculated from catalog, not by the AI" },
      { label: "Stock", value: "Reserved when the customer confirms" },
    ],
    outcome: { tone: "brand", text: "Order captured privately, stock held" },
  },
  {
    id: "comment",
    tab: "Comment reply",
    icon: MessageSquareReply,
    channel: "facebook",
    where: "Facebook post comment",
    bubbles: [
      { from: "customer", text: "Price koto? Inbox please" },
      { from: "public", text: "Apnake inbox e details pathiye diyechi 💬", note: "Public reply under the post" },
      {
        from: "ai",
        text: "Assalamu alaikum! Floral Three-Piece er dam ৳3,200, sob size available. Order korte chaile ekhanei janan 😊",
        note: "One private reply · within 7 days",
      },
    ],
    decision: [
      { label: "Intent", value: "Price question on a post" },
      { label: "Public", value: "Short, generic — no prices on the wall" },
      { label: "Private", value: "One private reply with the details" },
      { label: "Window", value: "Checked against platform limits" },
    ],
    outcome: { tone: "brand", text: "Comment turned into a private sales chat" },
  },
  {
    id: "handover",
    tab: "Complaint → person",
    icon: ShieldAlert,
    channel: "facebook",
    where: "Facebook Messenger",
    bubbles: [
      { from: "customer", text: "আমার পার্সেল ভাঙা অবস্থায় এসেছে। আমি রিফান্ড চাই।" },
      { from: "system", text: "Handed over to staff · AI paused for this conversation" },
    ],
    decision: [
      { label: "Intent", value: "Complaint + refund request" },
      { label: "Language", value: "Bangla" },
      { label: "Rule", value: "Hard handover — never auto-answered" },
      { label: "Next", value: "Assigned to your support team" },
    ],
    outcome: { tone: "rose", text: "A person takes it from here" },
  },
];

const isBangla = (t: string) => /[ঀ-৿]/.test(t);

export function Demo() {
  const [active, setActive] = useState(scenarios[0].id);
  const s = scenarios.find((x) => x.id === active) ?? scenarios[0];

  return (
    <section id="demo" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="See it in action"
          title="Four everyday conversations, handled the right way"
          body="Pick a scenario to see what the customer sees — and what the desk decided behind the scenes."
        />

        <div
          role="tablist"
          aria-label="Demo scenarios"
          className="mx-auto mt-12 flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 ring-1 ring-slate-200 sm:w-fit"
        >
          {scenarios.map((x) => {
            const selected = x.id === active;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="demo-panel"
                onClick={() => setActive(x.id)}
                className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selected ? "text-white" : "text-slate-600 hover:text-ink"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="demo-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <x.icon size={15} className="relative" />
                <span className="relative">{x.tab}</span>
              </button>
            );
          })}
        </div>

        <div id="demo-panel" role="tabpanel" className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* conversation */}
          <div className="rounded-3xl bg-white p-4 ring-1 ring-slate-200 sm:p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <ChannelIcon channel={s.channel} size={13} />
              <div>
                <p className="text-sm font-semibold text-ink">{s.where}</p>
                <p className="text-xs text-slate-500">Live conversation</p>
              </div>
            </div>
            <div className="flex min-h-[380px] flex-col gap-3 pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  className="flex flex-col gap-3"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.35 } } }}
                >
                  {s.bubbles.map((b, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                      }}
                      className={
                        b.from === "customer"
                          ? "max-w-[85%] self-start"
                          : b.from === "system"
                            ? "self-center"
                            : "max-w-[85%] self-end"
                      }
                    >
                      <BubbleView bubble={b} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* decision panel */}
          <div className="flex flex-col rounded-3xl bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">What the desk decided</p>
            <AnimatePresence mode="wait">
              <motion.dl
                key={s.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease }}
                className="mt-5 flex flex-1 flex-col divide-y divide-white/10"
              >
                {s.decision.map((d) => (
                  <div key={d.label} className="grid grid-cols-[96px_1fr] gap-3 py-3.5">
                    <dt className="text-sm text-white/50">{d.label}</dt>
                    <dd className="text-sm font-medium">{d.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </AnimatePresence>
            <motion.div
              key={`${s.id}-outcome`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mt-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                s.outcome.tone === "brand" ? "bg-brand-500/15 text-brand-200" : "bg-rose-500/15 text-rose-200"
              }`}
            >
              {s.outcome.tone === "brand" ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
              {s.outcome.text}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BubbleView({ bubble }: { bubble: Bubble }) {
  const bn = isBangla(bubble.text) ? "font-bangla" : "";
  if (bubble.from === "system") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
        <Lock size={12} /> {bubble.text}
      </span>
    );
  }
  const styles = {
    customer: "rounded-bl-md bg-slate-100 text-ink",
    ai: "rounded-br-md bg-brand-600 text-white",
    public: "rounded-br-md bg-sky-50 text-sky-900 ring-1 ring-sky-200",
  }[bubble.from];
  return (
    <div>
      {bubble.note && <p className="mb-1 text-right text-[11px] font-medium text-slate-500">{bubble.note}</p>}
      <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${styles} ${bn}`}>{bubble.text}</div>
    </div>
  );
}
