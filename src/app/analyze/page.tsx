"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mic, Sparkles, Loader2, PlayCircle, AlertTriangle, Download, Share2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Waveform } from "@/components/waveform";
import { RiskMeter } from "@/components/risk-meter";
import { IndicatorList } from "@/components/analyzer/indicator-list";
import { ConversationTimeline } from "@/components/analyzer/conversation-timeline";
import { ExplanationPanel } from "@/components/analyzer/explanation-panel";
import { useToast } from "@/components/toast-provider";
import { analyzeTranscript, DEMO_TRANSCRIPT, type AnalysisResult } from "@/lib/mockEngine";
import { cn } from "@/lib/utils";

type Stage = "input" | "analyzing" | "results";
type InputMode = "transcript" | "audio" | "demo";

const stageLines = [
  "Transcribing audio segments...",
  "Parsing conversational structure...",
  "Scanning behavioral indicators...",
  "Cross-referencing linguistic patterns...",
  "Calculating explainable risk score...",
];

export default function AnalyzePage() {
  const [stage, setStage] = useState<Stage>("input");
  const [mode, setMode] = useState<InputMode>("transcript");
  const [transcript, setTranscript] = useState("");
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const runAnalysis = () => {
    if (!transcript.trim()) {
      toast("Please paste a transcript or load the demo conversation first.", "warning");
      return;
    }
    setStage("analyzing");
    setProgress(0);
    setLineIdx(0);

    const totalDuration = 2600;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / totalDuration) * 100);
      setProgress(p);
      setLineIdx(Math.min(stageLines.length - 1, Math.floor((p / 100) * stageLines.length)));
      if (p < 100) requestAnimationFrame(tick);
      else {
        const r = analyzeTranscript(transcript);
        setResult(r);
        setStage("results");
        toast("Analysis complete — explainable risk report ready.", "success");
      }
    };
    requestAnimationFrame(tick);
  };

  const loadDemo = () => {
    setTranscript(DEMO_TRANSCRIPT);
    setMode("demo");
    toast("Demo conversation loaded.", "info");
  };

  const reset = () => {
    setStage("input");
    setResult(null);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 grid-bg">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-cyan-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" /> CONVERSATION ANALYZER
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Analyze a conversation</h1>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Paste a transcript or load a demo conversation to see EchoGuard&apos;s explainable analysis pipeline in action.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {stage === "input" && (
              <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(
                      [
                        { id: "audio", label: "Upload Audio", icon: Mic },
                        { id: "transcript", label: "Paste Transcript", icon: FileText },
                        { id: "demo", label: "Demo Conversation", icon: PlayCircle },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => (t.id === "demo" ? loadDemo() : setMode(t.id))}
                        className={cn(
                          "flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition-colors",
                          mode === t.id ? "border-cyan-400/50 bg-cyan-400/10 text-foreground" : "border-panel-border text-muted hover:text-foreground"
                        )}
                      >
                        <t.icon className="h-3.5 w-3.5" /> {t.label}
                      </button>
                    ))}
                  </div>

                  {mode === "audio" ? (
                    <div className="rounded-2xl border border-dashed border-panel-border p-12 text-center">
                      <Mic className="h-8 w-8 text-muted mx-auto mb-3" />
                      <p className="text-sm text-muted mb-1">Audio upload is simulated in this prototype.</p>
                      <p className="text-xs text-muted/70 mb-4">Switch to &quot;Paste Transcript&quot; or try the demo conversation instead.</p>
                      <Button variant="secondary" size="sm" onClick={loadDemo}>Use Demo Conversation</Button>
                    </div>
                  ) : (
                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder={`Paste a conversation transcript here...\n\nCaller: Your bank account has been flagged for suspicious activity.\nUser: What happened?\nCaller: We need to verify your account immediately.\nCaller: Please provide your OTP so we can secure your account.`}
                      rows={10}
                      className="w-full rounded-2xl bg-white/[0.03] border border-panel-border p-4 text-sm leading-relaxed placeholder:text-muted/60 focus:outline-none focus:border-cyan-400/50 resize-none font-mono"
                    />
                  )}

                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button onClick={runAnalysis} size="lg">
                      <Sparkles className="h-4 w-4" /> Analyze Conversation
                    </Button>
                    <Button variant="secondary" size="lg" onClick={loadDemo}>Load Demo</Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {stage === "analyzing" && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="glow-border p-12 flex flex-col items-center text-center">
                  <Waveform bars={56} className="mb-8" />
                  <div className="flex items-center gap-2 text-sm font-medium mb-4">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                    <AnimatePresence mode="wait">
                      <motion.span key={lineIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                        {stageLines[lineIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="w-full max-w-sm h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted mt-3 tabular-nums">{Math.round(progress)}%</p>
                </Card>
              </motion.div>
            )}

            {stage === "results" && result && (
              <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* Top risk card */}
                <Card className="glow-border p-6 sm:p-10">
                  <div className="flex flex-col sm:flex-row items-center gap-8 justify-between">
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted mb-2">Overall Assessment</p>
                      <h2 className={cn(
                        "text-3xl sm:text-4xl font-bold tracking-tight",
                        result.riskLevel === "Critical" && "text-critical",
                        result.riskLevel === "High" && "text-high",
                        result.riskLevel === "Medium" && "text-medium",
                        result.riskLevel === "Low" && "text-low",
                      )}>
                        {result.riskLevel.toUpperCase()} RISK
                      </h2>
                      <p className="text-sm text-muted mt-3 max-w-sm">{result.summary}</p>
                      <div className="flex gap-3 mt-6 justify-center sm:justify-start">
                        <Button variant="secondary" size="sm" onClick={reset}>Analyze Another</Button>
                      </div>
                    </div>
                    <RiskMeter score={result.riskScore} level={result.riskLevel} />
                  </div>

                  <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                    <AlertTriangle className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted leading-relaxed">
                      Demo analysis — results are informational and should not be treated as definitive fraud detection.
                    </p>
                  </div>
                </Card>

                {/* Indicators */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Detected indicators</h3>
                  <IndicatorList indicators={result.indicators} />
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Conversation timeline</h3>
                  <Card className="p-4 sm:p-6">
                    <ConversationTimeline segments={result.timeline} />
                  </Card>
                </div>

                {/* Explanation */}
                <ExplanationPanel summary={result.summary} breakdown={result.signalBreakdown} />

                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  <Button variant="outline" onClick={() => toast("Report export simulated for this prototype.", "info")}>
                    <Download className="h-4 w-4" /> Export Report
                  </Button>
                  <Button variant="outline" onClick={() => toast("Share link copied (simulated).", "info")}>
                    <Share2 className="h-4 w-4" /> Share Report
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
