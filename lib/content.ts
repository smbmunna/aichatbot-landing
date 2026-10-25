// All landing-page copy lives here so pricing and roadmap changes don't touch components.

export const site = {
  name: "AI Sales & Support Desk",
  company: "AppifyDevs",
  // TODO: replace with the real booking / contact link before launch.
  bookingHref: "#get-started",
};

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Safety", href: "#safety" },
  { label: "Channels", href: "#channels" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export type Channel = "facebook" | "instagram" | "whatsapp" | "web" | "telegram" | "tiktok" | "x";

export const outcomes = [
  {
    key: "catalog",
    title: "Answer product questions",
    body: "Price, size, colour and availability — looked up in your catalog, then written into a reply that uses those facts and nothing else.",
  },
  {
    key: "language",
    title: "Bangla, English & Banglish",
    body: "Detects how each customer writes and replies the same way, in the tone you set for your brand.",
  },
  {
    key: "orders",
    title: "Capture orders privately",
    body: "Collects variant, quantity, name, phone and address, asks the customer to confirm, then reserves the stock.",
  },
  {
    key: "comments",
    title: "Reply to comments",
    body: "A short public reply under the post, and the details in one private message — within each platform's limits.",
  },
  {
    key: "status",
    title: "Check order status",
    body: "“Where is my order?” is answered straight from your order records, with courier lookups plugging in next.",
  },
  {
    key: "handover",
    title: "Hand over difficult cases",
    body: "Complaints, refunds, discount haggling, “talk to a person” and anything the AI isn't sure about go to your team.",
  },
  {
    key: "reports",
    title: "See the results",
    body: "Response time, correct-answer rate, handovers, orders captured and AI usage — on one reports page.",
  },
] as const;

export const pipeline = [
  {
    title: "A message arrives",
    body: "DMs, comments and chats from every connected channel land in one inbox.",
  },
  {
    title: "AI reads it",
    body: "Works out the intent, the language and which product or order it's about.",
  },
  {
    title: "Facts from your records",
    body: "Price, stock, variants and order status are pulled from your business data.",
  },
  {
    title: "Your rules decide",
    body: "Reply, save as a draft for review, or hand over to a person.",
  },
  {
    title: "Sent safely",
    body: "Messaging-window checks, no duplicate replies, every step logged.",
  },
] as const;

export const safety = [
  {
    key: "grounded",
    title: "Grounded replies",
    body: "The AI only receives the facts for this question and is told to use nothing else.",
  },
  {
    key: "numbers",
    title: "Number guardrail",
    body: "Any price or quantity not found in your records blocks auto-send and is flagged on the draft.",
  },
  {
    key: "hard-handover",
    title: "Hard handover topics",
    body: "Complaints, refunds, discounts and requests for a person are never auto-answered — whatever the settings.",
  },
  {
    key: "review",
    title: "Review mode by default",
    body: "Every AI reply is a draft until you switch on auto-send, one question type at a time.",
  },
  {
    key: "takeover",
    title: "Human takeover",
    body: "Press “Take over” to pause the AI in a conversation. Replying from Meta Business Suite pauses it too.",
  },
  {
    key: "duplicates",
    title: "No double replies",
    body: "Each incoming message gets at most one reply per slot, even when platforms resend events.",
  },
  {
    key: "windows",
    title: "Platform rules respected",
    body: "24-hour windows, one private reply per comment and WhatsApp template rules are enforced before sending.",
  },
  {
    key: "allowance",
    title: "Predictable AI usage",
    body: "A monthly AI allowance per account. Above it, messages go to your staff — no surprise bills.",
  },
  {
    key: "audit",
    title: "Full audit history",
    body: "Every AI decision, handover, approval, edit, setting change and order is recorded.",
  },
  {
    key: "isolation",
    title: "Your data stays yours",
    body: "Every account is isolated, channel tokens are encrypted at rest and webhooks are signature-verified.",
  },
] as const;

export type RoadmapStatus = "available" | "next" | "planned" | "exploring";

export const channelRoadmap: {
  channel: Channel;
  name: string;
  detail: string;
  status: RoadmapStatus;
}[] = [
  {
    channel: "facebook",
    name: "Facebook Page",
    detail: "Inbox messages and post comments, with private replies.",
    status: "available",
  },
  {
    channel: "instagram",
    name: "Instagram",
    detail: "DMs, comments and private replies on a professional account.",
    status: "available",
  },
  {
    channel: "web",
    name: "Website chat",
    detail: "A chat widget for your store — ready for every merchant on day one.",
    status: "available",
  },
  {
    channel: "whatsapp",
    name: "WhatsApp Business",
    detail: "Messaging on your verified number, with approved templates outside 24 hours.",
    status: "next",
  },
  {
    channel: "telegram",
    name: "Telegram",
    detail: "Conversations with your business bot.",
    status: "planned",
  },
  {
    channel: "tiktok",
    name: "TikTok",
    detail: "Subject to account type, region and API access.",
    status: "exploring",
  },
  {
    channel: "x",
    name: "X / Twitter",
    detail: "Subject to X approval for automated replies.",
    status: "exploring",
  },
];

export const roadmapStatusLabel: Record<RoadmapStatus, string> = {
  available: "Available",
  next: "Rolling out next",
  planned: "Planned",
  exploring: "Exploring",
};

export const plans = [
  {
    name: "Trial",
    price: "৳0",
    setup: "No setup fee",
    blurb: "Try the desk on one channel in review mode.",
    agents: 1,
    channels: 1,
    aiCalls: "500",
    features: ["Catalog answers", "Review mode drafts", "Human handover"],
    highlight: false,
  },
  {
    name: "Starter",
    price: "৳8,000",
    setup: "৳15,000 one-time setup",
    blurb: "One approved channel answering from your catalog.",
    agents: 2,
    channels: 1,
    aiCalls: "3,000",
    features: ["Everything in Trial", "Auto-send for validated question types", "Bangla, English & Banglish"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "৳18,000",
    setup: "৳30,000 one-time setup",
    blurb: "Comments, orders and reporting across channels.",
    agents: 5,
    channels: 3,
    aiCalls: "10,000",
    features: ["Everything in Starter", "Comment replies", "Private order capture", "Reports dashboard"],
    highlight: true,
  },
  {
    name: "Managed Commerce",
    price: "৳35,000",
    pricePrefix: "From",
    setup: "From ৳60,000 setup",
    blurb: "We run it with you, including store integrations.",
    agents: 15,
    channels: 10,
    aiCalls: "30,000",
    features: ["Everything in Growth", "Additional eligible channels", "Store integrations", "Workflow management"],
    highlight: false,
  },
] as const;

export const pilotSteps = [
  {
    when: "Day 1",
    title: "Connect & load",
    body: "We connect one approved channel and load your catalog — products, variants, prices and stock.",
  },
  {
    when: "Days 1–7",
    title: "Run in review mode",
    body: "The AI drafts every reply; your team approves, edits or takes over. We track a pilot scorecard.",
  },
  {
    when: "After the pilot",
    title: "Turn on auto-send",
    body: "Switch on auto-send only for question types that scored well. Everything else stays a draft.",
  },
  {
    when: "As you grow",
    title: "Add channels & integrations",
    body: "More channels, Shopify or WooCommerce sync, and courier status from Steadfast, Pathao or RedX.",
  },
] as const;

export const faqs = [
  {
    q: "Can the AI make up a price or promise a delivery date?",
    a: "No. Prices, stock, payment status and delivery promises only come from your records. The AI is given just the facts for the question, and any number in a reply that isn't in those facts — or the customer's own message — stops the reply from auto-sending and flags it for your team.",
  },
  {
    q: "Will it send anything without our approval?",
    a: "Not unless you choose. Every account starts in review mode, where AI replies are drafts. You can enable auto-send per question type (for example, price and availability) once you're happy with the results.",
  },
  {
    q: "Which languages does it handle?",
    a: "Bangla, English and Banglish (Bangla written in English letters). It detects how each customer writes and replies in the same language, using the tone you set in Settings.",
  },
  {
    q: "What happens with complaints and refunds?",
    a: "They always go to a person. Complaints, refund requests, discount negotiation and “I want to talk to someone” are hard handover topics that can never be auto-answered, regardless of settings. The same goes for anything the AI isn't confident about.",
  },
  {
    q: "Can my team jump into a conversation?",
    a: "Yes. Press “Take over” to pause the AI for that conversation. If a staff member replies from Meta Business Suite, the desk notices and pauses the AI automatically.",
  },
  {
    q: "What if we use up our monthly AI calls?",
    a: "New messages simply go to your staff instead of the AI, so there are no surprise charges. The Reports page shows calls and usage so you can choose the right package.",
  },
  {
    q: "Which channels can I connect?",
    a: "Facebook Page inbox and comments, Instagram DMs and comments, and the website chat widget. WhatsApp Business is rolling out next. We only sell the channels that can actually be activated for your account.",
  },
  {
    q: "Does it connect to my online store or courier?",
    a: "The desk includes its own catalog and order records today. Shopify and WooCommerce sync, plus courier status from Steadfast, Pathao and RedX, are on the roadmap.",
  },
] as const;
