import {
  BadgeCheck,
  CircleSlash,
  Clock3,
  Copy,
  FileClock,
  Gauge,
  Hand,
  Hash,
  KeyRound,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { safety } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading } from "../ui";

const icons: Record<(typeof safety)[number]["key"], LucideIcon> = {
  grounded: BadgeCheck,
  numbers: Hash,
  "hard-handover": CircleSlash,
  review: ShieldCheck,
  takeover: Hand,
  duplicates: Copy,
  windows: Clock3,
  allowance: Gauge,
  audit: FileClock,
  isolation: KeyRound,
};

export function Safety() {
  return (
    <section id="safety" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Built-in safety"
              title="Never a made-up price. Never a reply you didn't allow."
              body="Your brand's reputation is on every message. These controls are switched on from day one — not add-ons."
            />
            <Reveal delay={0.1} className="mt-8">
              <GuardrailCard />
            </Reveal>
          </div>

          <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
            {safety.map((item) => {
              const Icon = icons[item.key];
              return (
                <StaggerItem key={item.key}>
                  <div className="group h-full rounded-2xl bg-white p-5 ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:ring-brand-200">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700">
                        <Icon size={17} />
                      </span>
                      <h3 className="font-semibold tracking-tight text-ink">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function GuardrailCard() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_24px_60px_-30px_rgb(15_23_42/0.35)] ring-1 ring-slate-200">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Draft blocked from auto-send</p>
      <p className="mt-3 rounded-2xl rounded-br-md bg-slate-50 px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-slate-200">
        The Silk Hijab is in stock in maroon. It&apos;s{" "}
        <mark className="rounded bg-rose-100 px-1 font-semibold text-rose-700 decoration-rose-400 decoration-wavy underline-offset-4 [text-decoration-line:underline]">
          ৳650
        </mark>{" "}
        — shall I place an order?
      </p>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-800 ring-1 ring-rose-100">
        <Hash size={16} className="mt-0.5 shrink-0" />
        <span>
          <strong className="font-semibold">৳650 isn&apos;t in your records</strong> (catalog price: ৳750). Sent to your
          team for review.
        </span>
      </div>
    </div>
  );
}
