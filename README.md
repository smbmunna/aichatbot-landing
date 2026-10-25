# AI Sales & Support Desk — Landing Page

Marketing site for **AI Sales & Support Desk by AppifyDevs**: one inbox for Facebook, Instagram, WhatsApp and
website chat, where AI answers product questions and captures orders from the merchant's own catalog (in Bangla,
English and Banglish) and hands difficult cases to a person.

**Live site:** https://aichatbot-landing.vercel.app/

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://motion.dev) for animation
- [Lucide](https://lucide.dev) icons
- Deployed on [Vercel](https://vercel.com)

## Page sections

The page is composed in `app/page.tsx`, in this order:

| Section | Component | What it covers |
| --- | --- | --- |
| Hero | `components/sections/hero.tsx` | Headline and animated desk preview (`components/hero-desk.tsx`) |
| Outcomes | `components/sections/outcomes.tsx` | What merchants get from the desk |
| How it works | `components/sections/how-it-works.tsx` | Message → facts → reply pipeline |
| Demo | `components/sections/demo.tsx` | Interactive customer-conversation scenarios |
| Safety | `components/sections/safety.tsx` | Grounded replies, guardrails, handover, review mode |
| Channels | `components/sections/channels.tsx` | Channel roadmap and availability |
| Reports | `components/sections/reports.tsx` | Sample performance reports |
| Pilot | `components/sections/pilot.tsx` | Pilot onboarding steps |
| Pricing | `components/sections/pricing.tsx` | Plans |
| FAQ | `components/sections/faq.tsx` | Common questions |
| CTA | `components/sections/cta.tsx` | Final call to action |

## Project structure

```
app/            Root layout, metadata, global styles and the landing page
components/     Navbar, footer, shared UI and motion helpers
  sections/     One file per landing-page section
lib/content.ts  All site copy and data (nav links, outcomes, pipeline, safety, roadmap, plans, pilot, FAQs)
product_plan.md Product plan the landing page copy is based on
```

To change text, plans, FAQs or the channel roadmap, edit `lib/content.ts` — the section components read from it.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment

The site is deployed on Vercel at https://aichatbot-landing.vercel.app/.
