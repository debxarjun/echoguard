"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Mic,
  BrainCircuit,
  MessageSquareWarning,
  ShieldCheck,
  BarChart3,
  SearchCheck,
  Upload,
  AudioLines,
  Radar,
  ScanEye,
  FileCheck2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParticleGrid } from "@/components/particle-grid";
import { Waveform } from "@/components/waveform";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { value: "12K+", label: "Conversations Analyzed" },
  { value: "94%", label: "Pattern Detection" },
  { value: "27+", label: "Risk Indicators" },
  { value: "Real-Time", label: "Analysis" },
];

const steps = [
  { n: "01", title: "Capture", icon: Upload, desc: "Upload an audio recording or paste a conversation transcript directly into EchoGuard." },
  { n: "02", title: "Transcribe", icon: AudioLines, desc: "Speech is converted into structured, speaker-labeled conversational text." },
  { n: "03", title: "Analyze", icon: Radar, desc: "AI examines behavioral, linguistic, transactional and contextual indicators." },
  { n: "04", title: "Explain", icon: ScanEye, desc: "EchoGuard presents the detected risk signals with understandable explanations." },
];

const features = [
  { icon: BrainCircuit, title: "Explainable AI", desc: "Understand why a conversation was flagged, with plain-language reasoning behind every signal." },
  { icon: Mic, title: "Voice Analysis", desc: "Analyze transcribed voice interactions across calls, call-center logs, and recorded conversations." },
  { icon: MessageSquareWarning, title: "Risk Detection", desc: "Identify suspicious conversational patterns like urgency, credential requests, and impersonation." },
  { icon: BarChart3, title: "Risk Analytics", desc: "Visualize trends and recurring indicators across your conversation history." },
  { icon: SearchCheck, title: "Conversation Intelligence", desc: "Inspect individual conversation segments on an interactive, timestamped timeline." },
  { icon: ShieldCheck, title: "Privacy First", desc: "Built around responsible handling of sensitive conversational data, by design." },
];

const architecture = ["Audio", "Speech-to-Text", "Conversation Processing", "AI Risk Analysis", "Indicator Detection", "Risk Scoring", "Explainable Report"];
const techCards = ["AI / Machine Learning", "Natural Language Processing", "Speech Recognition", "Behavioral Pattern Analysis", "Data Visualization"];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section id="product" className="relative overflow-hidden grid-bg">
          <div className="absolute inset-0 pointer-events-none">
            <ParticleGrid />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] bg-blue-500/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-cyan-300 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                AI-POWERED CONVERSATION SECURITY
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
                Detect the signals behind <span className="text-gradient">suspicious conversations.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-muted max-w-xl">
                EchoGuard analyzes voice transcripts and identifies potential scam, fraud, and
                social-engineering patterns — while explaining the signals behind every alert.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link href="/analyze">
                  <Button size="lg" className="group">
                    Analyze a Conversation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary">Explore Dashboard</Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <Card className="glow-border p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="h-2 w-2 rounded-full bg-low animate-pulse-glow" />
                    Live Analysis Simulation
                  </div>
                  <span className="text-xs text-muted">EC-DEMO</span>
                </div>
                <Waveform bars={48} className="mb-8" />
                <div className="space-y-3">
                  {[
                    ["Urgency / Pressure", "High", "text-high", "from-orange-400 to-rose-400", "88%"],
                    ["Credential Request", "Critical", "text-critical", "from-rose-500 to-purple-500", "95%"],
                    ["Authority Claim", "High", "text-high", "from-blue-400 to-cyan-400", "81%"],
                  ].map(([label, sev, color, grad, width]) => (
                    <div key={label as string}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted">{label}</span>
                        <span className={`${color} font-medium`}>{sev}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mt-1.5">
                        <div className={`h-full rounded-full bg-gradient-to-r ${grad}`} style={{ width: width as string }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-purple-500/20 blur-3xl animate-float" />
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-3xl animate-float" />
            </motion.div>
          </div>

          <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pb-20">
            <p className="text-center text-xs text-muted mb-6">Sample / demo metrics for illustration purposes</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-6 text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-gradient">{s.value}</p>
                    <p className="text-xs text-muted mt-1">{s.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How EchoGuard Works</h2>
            <p className="mt-4 text-muted">From raw conversation to explainable risk report, in four stages.</p>
          </motion.div>

          <div className="relative grid md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-panel-border to-transparent" />
            {steps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <Card className="p-6 h-full relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-5 border border-panel-border">
                    <s.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <span className="text-xs font-mono text-muted">{s.n}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built for clarity, not just alerts</h2>
            <p className="mt-4 text-muted">Every part of EchoGuard is designed to help you understand risk, not just react to it.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="p-6 h-full hover:border-cyan-400/40 transition-colors">
                  <f.icon className="h-6 w-6 text-cyan-300 mb-4" />
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The technology concept</h2>
            <p className="mt-4 text-muted">A simulated pipeline demonstrating how conversational risk analysis could work end-to-end.</p>
          </motion.div>

          <Card className="p-8 mb-10 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max justify-center">
              {architecture.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="rounded-xl border border-panel-border bg-white/5 px-4 py-3 text-sm font-medium whitespace-nowrap">{step}</div>
                  {i < architecture.length - 1 && <ArrowRight className="h-4 w-4 text-muted shrink-0" />}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {techCards.map((t, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="p-5 text-center h-full flex items-center justify-center">
                  <p className="text-sm font-medium">{t}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-6 mt-10 flex items-start gap-3 border-amber-400/20">
            <FileCheck2 className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-sm text-muted">
              EchoGuard is a hackathon prototype. Analysis shown throughout this app uses simulated logic and mock
              data in place of a production AI backend, and results should be treated as illustrative rather than
              a guaranteed fraud-detection outcome.
            </p>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
          <Card className="glow-border p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">See EchoGuard in action</h3>
              <p className="text-muted max-w-lg mx-auto mb-8">
                Paste a transcript, or load a demo conversation, and watch the explainable analysis pipeline run in real time.
              </p>
              <Link href="/analyze">
                <Button size="lg">Try the Analyzer <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
