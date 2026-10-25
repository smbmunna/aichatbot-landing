import { pilotSteps } from "@/lib/content";
import { Stagger, StaggerItem } from "../motion";
import { SectionHeading } from "../ui";

export function Pilot() {
  return (
    <section className="border-y border-slate-200/70 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Getting started"
          title="Live in a day. Trusted in a week."
          body="You stay in control the whole way: nothing auto-sends until the pilot shows it answers correctly."
        />

        <Stagger className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {pilotSteps.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="relative h-full rounded-3xl bg-canvas p-6 ring-1 ring-slate-200/80">
                <span className="text-5xl font-semibold tracking-tighter text-slate-200 tabular-nums">0{i + 1}</span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{s.when}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
