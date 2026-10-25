import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Channels } from "@/components/sections/channels";
import { Cta } from "@/components/sections/cta";
import { Demo } from "@/components/sections/demo";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Outcomes } from "@/components/sections/outcomes";
import { Pilot } from "@/components/sections/pilot";
import { Pricing } from "@/components/sections/pricing";
import { Reports } from "@/components/sections/reports";
import { Safety } from "@/components/sections/safety";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Outcomes />
        <HowItWorks />
        <Demo />
        <Safety />
        <Channels />
        <Reports />
        <Pilot />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
