import { ArrowRight, Check, FlaskConical } from "lucide-react";
import { plans, site } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Button, SectionHeading } from "../ui";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple packages. A clear AI allowance. No unlimited plans."
          body="Every package includes a written monthly AI-call allowance, so costs stay predictable as your message volume grows."
        />

        <Reveal className="mt-12">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-r from-brand-600 to-teal-600 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <FlaskConical size={20} />
              </span>
              <div>
                <p className="font-semibold">Start with a 7-day pilot · ৳5,000–৳10,000</p>
                <p className="mt-1 text-sm text-white/75">
                  One channel, part of your catalog, review mode first — with a scorecard at the end. Paid upfront.
                </p>
              </div>
            </div>
            <Button href={site.bookingHref} variant="light" className="shrink-0">
              Book a pilot <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>

        <Stagger className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {plans.map((p) => (
            <StaggerItem key={p.name}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-6 ring-1 ${
                  p.highlight
                    ? "bg-ink text-white ring-ink shadow-[0_30px_70px_-30px_rgb(15_23_42/0.6)]"
                    : "bg-white ring-slate-200"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold text-white">
                    Recommended
                  </span>
                )}
                <h3 className={`font-semibold ${p.highlight ? "text-white" : "text-ink"}`}>{p.name}</h3>
                <p className={`mt-1 text-sm ${p.highlight ? "text-white/60" : "text-slate-500"}`}>{p.blurb}</p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  {"pricePrefix" in p && (
                    <span className={`text-sm ${p.highlight ? "text-white/60" : "text-slate-500"}`}>
                      {p.pricePrefix}
                    </span>
                  )}
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">{p.price}</span>
                  <span className={`text-sm ${p.highlight ? "text-white/60" : "text-slate-500"}`}>/month</span>
                </p>
                <p className={`mt-1 text-xs ${p.highlight ? "text-white/50" : "text-slate-500"}`}>{p.setup}</p>

                <dl
                  className={`mt-6 grid grid-cols-3 gap-2 rounded-2xl p-3 text-center ${
                    p.highlight ? "bg-white/5" : "bg-canvas"
                  }`}
                >
                  {[
                    ["AI agents", p.agents],
                    ["Channels", p.channels],
                    ["AI calls", p.aiCalls],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col-reverse">
                      <dt className={`text-[10px] ${p.highlight ? "text-white/50" : "text-slate-500"}`}>{k}</dt>
                      <dd className="text-sm font-semibold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${p.highlight ? "text-brand-300" : "text-brand-600"}`}
                      />
                      <span className={p.highlight ? "text-white/80" : "text-slate-700"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={site.bookingHref}
                  variant={p.highlight ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {p.name === "Trial" ? "Start free" : "Talk to us"}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          Prices in BDT. AI calls per month are included in each package; platform fees, AI usage above your allowance
          and custom integrations are billed separately and agreed in writing.
        </Reveal>
      </div>
    </section>
  );
}
