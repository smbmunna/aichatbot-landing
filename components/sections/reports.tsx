"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ease } from "../motion";
import { SectionHeading } from "../ui";

// Illustrative numbers for the sample dashboard — not customer results.
const stats = [
  { label: "Median first response", value: 38, suffix: "s" },
  { label: "Correct-answer rate", value: 94, suffix: "%" },
  { label: "Handed to staff", value: 41, suffix: "" },
  { label: "Orders captured", value: 128, suffix: "" },
];

const week = [
  { day: "Sat", ai: 62, staff: 14 },
  { day: "Sun", ai: 78, staff: 18 },
  { day: "Mon", ai: 70, staff: 12 },
  { day: "Tue", ai: 88, staff: 16 },
  { day: "Wed", ai: 74, staff: 10 },
  { day: "Thu", ai: 96, staff: 20 },
  { day: "Fri", ai: 110, staff: 22 },
];
const maxDay = Math.max(...week.map((d) => d.ai + d.staff));

const used = 2340;
const allowance = 3000;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${Math.round(v).toLocaleString("en-US")}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.4, ease });
    return () => controls.stop();
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

export function Reports() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Reports"
          title="Know exactly what the desk is doing for you"
          body="Response time, correct-answer rate, handovers, orders and AI usage — tracked from the first day of your pilot."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-14 rounded-3xl bg-white p-4 shadow-[0_40px_100px_-50px_rgb(15_23_42/0.4)] ring-1 ring-slate-200 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-ink">Last 7 days</p>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              Sample dashboard
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-canvas p-4 ring-1 ring-slate-100">
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-3xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl bg-canvas p-5 ring-1 ring-slate-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">Conversations</p>
                <div className="flex gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-500" /> AI answered
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-300" /> Staff
                  </span>
                </div>
              </div>
              <div className="mt-6 flex h-40 items-end gap-2 sm:gap-4">
                {week.map((d, i) => (
                  <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <motion.div
                      className="flex w-full max-w-10 origin-bottom flex-col justify-end overflow-hidden rounded-t-lg"
                      style={{ height: `${((d.ai + d.staff) / maxDay) * 100}%` }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.07 }}
                    >
                      <div className="bg-slate-300" style={{ height: `${(d.staff / (d.ai + d.staff)) * 100}%` }} />
                      <div className="flex-1 bg-brand-500" />
                    </motion.div>
                    <span className="text-[11px] text-slate-500">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-ink p-5 text-white">
              <div>
                <p className="text-sm font-medium">AI usage this month</p>
                <p className="mt-1 text-xs text-white/50">Calls against your monthly allowance</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tabular-nums">
                  <Counter to={used} suffix="" />
                  <span className="text-base font-medium text-white/40"> / {allowance.toLocaleString("en-US")}</span>
                </p>
                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-teal-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(used / allowance) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease, delay: 0.3 }}
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/50">
                  Over the allowance, new messages route to your staff — never a surprise bill.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
