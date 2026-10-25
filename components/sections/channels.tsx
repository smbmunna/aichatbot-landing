import { channelRoadmap, roadmapStatusLabel, type RoadmapStatus } from "@/lib/content";
import { ChannelIcon } from "../channel-icon";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading } from "../ui";

const badge: Record<RoadmapStatus, string> = {
  available: "bg-brand-50 text-brand-700 ring-brand-200",
  next: "bg-sky-50 text-sky-700 ring-sky-200",
  planned: "bg-slate-100 text-slate-600 ring-slate-200",
  exploring: "bg-slate-50 text-slate-500 ring-slate-200",
};

export function Channels() {
  return (
    <section id="channels" className="border-y border-slate-200/70 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Channels"
          title="Where your customers already talk to you"
          body="Start with the channels that can be activated for your account today. New channels plug into the same inbox, rules and reports."
        />

        <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {channelRoadmap.map((c) => {
            const live = c.status === "available";
            return (
              <StaggerItem key={c.channel}>
                <div
                  className={`flex h-full flex-col rounded-2xl p-5 ring-1 transition-shadow hover:shadow-lg hover:shadow-slate-200/60 ${
                    live ? "bg-canvas ring-slate-200" : "bg-white ring-slate-200/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <ChannelIcon channel={c.channel} size={16} className={live ? "" : "opacity-60 grayscale-[40%]"} />
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${badge[c.status]}`}>
                      {roadmapStatusLabel[c.status]}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-ink">{c.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.detail}</p>
                </div>
              </StaggerItem>
            );
          })}
          <StaggerItem>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300 p-5 text-sm leading-relaxed text-slate-600">
              <p className="font-semibold text-ink">Honest activation</p>
              <p className="mt-1">
                Meta channels need platform approval for your Page. We only sell channels that can actually go live for
                you.
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center text-sm text-slate-500">
          Store &amp; courier integrations on the roadmap: Shopify, WooCommerce, Steadfast, Pathao and RedX.
        </Reveal>
      </div>
    </section>
  );
}
