import { ArrowRight } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "../motion";
import { Button, Eyebrow } from "../ui";

export function Cta() {
  return (
    <section id="get-started" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
          <div className="absolute -bottom-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <Eyebrow dark>7-day pilot</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              See what your inbox looks like when every question gets an answer.
            </h2>
            <p className="mt-5 text-pretty text-white/65 sm:text-lg">
              We connect one channel, load your catalog and run in review mode for a week. You decide what goes live.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={site.bookingHref}>
                Book your pilot
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#pricing" variant="ghost-dark">
                Compare packages
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
