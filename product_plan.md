# AI Sales & Support Desk by AppifyDevs — Product Plan

> Scale and SaaS operations for 50,000 merchants: see [SAAS_ARCHITECTURE.md](SAAS_ARCHITECTURE.md).

One dashboard where a merchant's team sees customer messages, comments, product questions and order requests
from their connected social channels. AI drafts and (once validated) sends answers that come from the merchant's
own records. Anything difficult goes to a person.

## 1. What merchants buy (outcomes)

| Outcome | How the desk delivers it | Where in the code |
| --- | --- | --- |
| Answer product questions (price, size, colour, availability) | Catalog lookup → facts → AI writes the reply from those facts only | `catalog/`, `desk/pipeline.service.ts` |
| Bangla, English and Banglish in the merchant's tone | Language detection + tone/language settings in the prompt | `ai/prompts.ts`, Settings page |
| Capture orders privately | Order state machine collects variant, quantity, name, phone, address; customer confirms; stock reserved atomically | `orders/order-capture.ts`, `orders/orders.service.ts` |
| Reply to comments | Generic public reply + details by one private reply (within platform limits) | `desk/pipeline.service.ts`, `channels/windows.ts` |
| Check order status | Read from the order records (store/courier integration plugs in here) | `orders/orders.service.ts` |
| Hand over difficult cases | Complaints, refunds, discount negotiation, "talk to a person", low confidence, unknown answers | `desk/rules.ts` |
| Show results | Response time, correct-answer rate, handovers, orders, AI usage | `reports/`, Reports page |

**Principle:** Gemini interprets the conversation and drafts replies. Application rules decide what happens:
whether to reply, auto-send or hand over, what an order costs, and whether a message may be sent at all.
Prices, stock, payment status and delivery promises only ever come from business records.

## 2. Safety controls built into v1

- **Grounded replies** — the model receives a `FACTS` object and is told to use nothing else.
- **Number guardrail** — any number in a reply that is not in the facts (or the customer's own message) blocks
  auto-send and is flagged on the draft (`desk/guardrails.ts`).
- **Hard handover intents** — complaints, refunds, discount requests and requests for a person can never be
  auto-answered, regardless of settings.
- **Review mode by default** — every AI reply is a draft until the merchant enables auto-send per question type.
- **Duplicate-reply protection** — webhook dedupe key, unique platform message IDs, a unique `replyKey` per
  inbound message and reply slot, a per-customer Redis lock, and an atomic `QUEUED → SENDING` claim before sending.
- **Human takeover** — "Take over" pauses AI per conversation; a staff reply from Meta Business Suite (echo) pauses
  it automatically.
- **Messaging windows** — 24h standard window, 7-day HUMAN_AGENT tag only for staff and only when approved,
  one private reply per comment within 7 days, WhatsApp template requirement (`channels/windows.ts`).
- **Usage allowance** — monthly AI-call allowance per merchant; above it, messages go to staff instead of the AI.
- **Audit history** — every AI decision, handover, approval, edit, setting change and order is logged.
- **Tenant isolation** — every query is scoped by `merchantId` from the signed session.
- **Secrets** — channel tokens encrypted at rest (AES-256-GCM); webhook signatures verified (HMAC-SHA256).

## 3. Channel roadmap

Sell each merchant only the channels that can be activated for their account.

| Phase | Channel | Status in this repo | Before selling it |
| --- | --- | --- | --- |
| 1 | Facebook Page inbox + comments | Built (webhook, parser, sender) | App Review for `pages_messaging`, `pages_manage_metadata`, `pages_read_engagement`, `pages_manage_engagement` |
| 1 | Instagram DMs + comments + private replies | Built | `instagram_basic`, `instagram_manage_messages`, `instagram_manage_comments`; professional account linked to the Page |
| 2 | WhatsApp Business Platform | Messaging built; Embedded Signup and templates next | Merchant's WABA + verified number; Tech Provider status for self-serve onboarding; approved templates for messages outside 24h |
| 2 | Website chat widget | Built | None — available to every merchant immediately |
| 3 | Telegram business bot | Not started | Bot conversations only — a bot cannot read the merchant's personal inbox |
| 4 | TikTok | Not started | Confirm account type, region and API access first; keep out of contracts until confirmed |
| 4 | X / Twitter | Not started | Prior written approval from X for automated AI replies; API usage billed separately |

Adding a channel = an adapter implementing `ChannelAdapter.send`, a webhook parser producing `InboundEvent`s,
and window rules. The pipeline, inbox, rules and reports do not change.

## 4. Commercial packages (hypotheses to validate)

These are starting prices to test with customers, not established market rates.

Packages are configured in the admin console (price, AI agents, channels, AI calls). The seed starts with:

| Package | Monthly | AI agents | Channels | AI calls / month |
| --- | --- | --- | --- | --- |
| Trial (default) | ৳0 | 1 | 1 | 500 |
| Starter | ৳8,000 | 2 | 1 | 3,000 |
| Growth | ৳18,000 | 5 | 3 | 10,000 |
| Managed Commerce | ৳35,000 | 15 | 10 | 30,000 |

Original commercial framing:

| Package | Setup | Monthly | Initial scope |
| --- | --- | --- | --- |
| Pilot (7 days) | ৳5,000–৳10,000, paid upfront | — | One merchant, one approved channel, limited catalog, review mode first |
| Starter | ৳15,000 | ৳8,000 | One approved channel, catalog answers, human handover |
| Growth | ৳30,000 | ৳18,000 | Up to three approved channels, comments, order capture, reporting |
| Managed Commerce | From ৳60,000 | From ৳35,000 | Additional eligible channels, store integrations, workflow management |

- Set a written monthly AI usage allowance (`Merchant.monthlyAiAllowance`) after measuring the pilot.
- Platform fees, AI usage above the allowance and custom integrations are billed explicitly.
- Compare providers on the same pilot traffic before fixing prices: per-message cost varies widely between Gemini,
  Claude, OpenAI, DeepSeek and Qwen. Set `AI_FALLBACK_PROVIDER` so the desk keeps answering if one provider's quota or
  credits run out.
- No unlimited plans. Cloud credits expire **31 October** — measure real per-conversation AI cost during pilots
  (Reports → AI usage shows calls and tokens) and price the allowance from that.

## 5. Delivery milestones

| Milestone | Scope | Exit criterion |
| --- | --- | --- |
| M0 — this repo | Inbox, simulator, catalog, answers, order capture, handover, reports, FB/IG webhooks + sender, Gemini | Demo end to end in the simulator; unit tests pass |
| M1 — first pilot | Meta app review submitted; one merchant's Page connected; catalog loaded; review mode | 7-day pilot run with the scorecard |
| M2 — paid Starter | Auto-send for validated question types; Meta OAuth "Connect Page" flow instead of pasted tokens | Pilot converts to monthly |
| M3 — Growth | One store integration (Shopify or WooCommerce adapter feeding catalog + orders), one courier status lookup (Steadfast / Pathao / RedX) | Order status answered from courier data |
| M4 — WhatsApp | WhatsApp Cloud API adapter, template management | First WhatsApp merchant live |
| M5 — Managed | Telegram bot, TikTok/X once access confirmed, per-merchant billing export | — |

## 6. Architecture

```
Facebook / Instagram ──webhook──▶ NestJS API ──▶ Redis/BullMQ "inbound" ──▶ Pipeline
                                   (verify sig,                              │  analyse (Gemini)
                                    store raw event)                         │  gather facts (Postgres)
                                                                             │  rules: reply / draft / handover
                                                                             ▼
Next.js dashboard ◀── REST ── NestJS API ◀── drafts, audit ── PostgreSQL   "outbound" queue ──▶ Graph API
 (inbox, approve,                                                           (window check, retries,
  takeover, reports)                                                         idempotent claim)
```

| Layer | Implementation |
| --- | --- |
| Dashboard | Next.js 15 (`apps/web`) |
| Backend | NestJS 11 (`apps/api`) |
| Business data | PostgreSQL via Prisma |
| Events and retries | Webhooks → BullMQ on Redis (`inbound`, `outbound` queues) |
| AI | Pluggable: Gemini (API key), Claude, OpenAI, DeepSeek, Qwen, with optional failover (`apps/api/src/ai/`); keyword mock for local/demo |
| Commerce | Built-in catalog/orders first; store adapter in M3 |
