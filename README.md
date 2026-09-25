# EchoGuard

**Understand the conversation. Detect the risk.**

EchoGuard is an AI-powered voice interaction security platform concept. It analyzes transcribed conversations and surfaces potential scam, fraud, and social-engineering patterns — built around **explainable AI**, so every alert comes with a plain-language reason rather than a bare "safe / unsafe" verdict.

> ⚠️ **This is a hackathon prototype.** It runs on a simulated, rule-based mock analysis engine (`src/lib/mockEngine.ts`) instead of a real speech-to-text or ML backend. All statistics, conversations, and dashboard figures are demo/mock data. Nothing in this repo performs actual fraud detection, and results should never be treated as a guaranteed security signal.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black)

---

## ✨ What's inside

| Page | Description |
|---|---|
| `/` | Landing page — animated hero, demo trust metrics, "How It Works," feature grid, architecture diagram |
| `/analyze` | Paste a transcript (or load a demo conversation) and watch a simulated AI pipeline run: waveform + progress animation → circular risk meter → expandable risk indicators → interactive flagged timeline → signal breakdown chart |
| `/dashboard` | Sidebar app shell with stat cards, risk distribution / trend / indicator / activity charts (Recharts), and a recent-conversations table |
| `/reports/[id]` | A shareable, printable-style risk report per conversation with recommended safety actions |

### Core features

- 🧠 **Explainable AI** — every flagged indicator ships with a plain-language explanation and a confidence score, not just a label
- 🎙️ **Transcript analysis** — paste any `Caller: / User:` style transcript and get a structured, timestamped breakdown
- 🚨 **Rule-based risk engine** — detects urgency/pressure language, credential requests (OTP/PIN/password), authority impersonation, suspicious verification flows, financial transaction pressure, and social-engineering behavioral patterns
- 📊 **Interactive analytics** — animated circular risk meter, horizontal signal-strength bars, pie/area/bar/line charts, all built with Recharts
- 🕒 **Conversation timeline** — click any flagged segment to see why it was flagged and how severe it is
- 🌗 **Dark / light mode**, glassmorphism UI, and Framer Motion transitions throughout
- 🔔 Toast notifications for key actions (analysis complete, export, share)

---

## 🛠 Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

No backend, database, or external API keys are required — everything runs client-side against mock data.

---

## 🚀 Getting started

```bash
git clone https://github.com/<your-username>/echoguard.git
cd echoguard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # lint the project
```

---

## 📁 Project structure
