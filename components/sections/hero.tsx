import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/content";
import { ChannelIcon } from "../channel-icon";
import { HeroDesk } from "../hero-desk";
import { Reveal } from "../motion";
import { Button, Eyebrow } from "../ui";

const points = ["Answers only from your catalog", "Review mode until you're ready", "Difficult cases go to your team"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute top-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              For social-commerce merchants
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Every customer message answered —{" "}
              <span className="bg-gradient-to-r from-brand-600 to-teal-500 bg-clip-text text-transparent">
                from your own records.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">
              One inbox for your Facebook, Instagram and website messages. AI drafts replies to product questions,
              captures orders and replies to comments in Bangla, English and Banglish — and hands anything difficult to
              a person.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={site.bookingHref}>
              Start a 7-day pilot
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href="#demo" variant="secondary">
              See it in action
            </Button>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {(["facebook", "instagram", "web", "whatsapp"] as const).map((c) => (
                <ChannelIcon key={c} channel={c} size={12} className="rounded-full ring-2 ring-canvas" />
              ))}
            </div>
            <span className="text-xs text-slate-500">Facebook, Instagram &amp; website chat today · WhatsApp next</span>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40}>
          <HeroDesk />
        </Reveal>
      </div>
    </section>
  );
}
