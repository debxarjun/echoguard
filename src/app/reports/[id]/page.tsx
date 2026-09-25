"use client";
import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Share2, ArrowLeft, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskMeter } from "@/components/risk-meter";
import { IndicatorList } from "@/components/analyzer/indicator-list";
import { ConversationTimeline } from "@/components/analyzer/conversation-timeline";
import { ExplanationPanel } from "@/components/analyzer/explanation-panel";
import { useToast } from "@/components/toast-provider";
import { analyzeTranscript, DEMO_TRANSCRIPT } from "@/lib/mockEngine";
import { recentConversations } from "@/lib/mockData";

const recommendedActions = [
  "Do not share OTPs or passwords with anyone, including people claiming to be bank staff.",
  "Independently verify the identity of the caller before taking any action.",
  "Contact the organization through its official, published communication channel.",
  "Avoid making financial decisions or transfers under pressure or urgency.",
];

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const result = analyzeTranscript(DEMO_TRANSCRIPT);
  const meta = recentConversations.find((c) => c.id === id);
  const displayScore = meta?.score ?? result.riskScore;
  const displayRisk = (meta?.risk ?? result.riskLevel) as "High" | "Medium" | "Low" | "Critical";

  return (
    <>
      <Navbar />
      <main className="flex-1 grid-bg">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-12">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
          </Link>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs text-muted mb-1">AI Risk Report</p>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">{id}</h1>
                <p className="text-sm text-muted mt-1">Analyzed on {meta?.date ?? "Sep 25"} · Demo report</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => toast("Report export simulated for this prototype.", "info")}>
                  <Download className="h-4 w-4" /> Export Report
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast("Share link copied (simulated).", "info")}>
                  <Share2 className="h-4 w-4" /> Share Report
                </Button>
              </div>
            </div>

            {/* Overview */}
            <Card className="p-6 sm:p-8 mb-8">
              <p className="text-sm font-medium text-muted mb-4">Conversation overview</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted text-xs mb-1">Conversation ID</p>
                  <p className="font-mono">{id}</p>
                </div>
                <div>
                  <p className="text-muted text-xs mb-1">Channel</p>
                  <p>Voice call (transcribed)</p>
                </div>
                <div>
                  <p className="text-muted text-xs mb-1">Duration</p>
                  <p>~2 min 10 sec</p>
                </div>
              </div>
            </Card>

            {/* Risk summary */}
            <Card className="glow-border p-6 sm:p-10 mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-muted mb-2">Risk Summary</p>
                  <h2
                    className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                      displayRisk === "High" || displayRisk === "Critical" ? "text-high" : displayRisk === "Medium" ? "text-medium" : "text-low"
                    }`}
                  >
                    {displayRisk.toUpperCase()} RISK
                  </h2>
                  <p className="text-sm text-muted mt-3 max-w-sm">{result.summary}</p>
                </div>
                <RiskMeter score={displayScore} level={displayRisk} />
              </div>
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                <ShieldAlert className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed">
                  Demo analysis — results are informational and should not be treated as definitive fraud detection.
                </p>
              </div>
            </Card>

            {/* Indicators */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Detected indicators</h3>
              <IndicatorList indicators={result.indicators} />
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Conversation timeline</h3>
              <Card className="p-4 sm:p-6">
                <ConversationTimeline segments={result.timeline} />
              </Card>
            </div>

            {/* Explanation */}
            <div className="mb-8">
              <ExplanationPanel summary={result.summary} breakdown={result.signalBreakdown} />
            </div>

            {/* Recommended actions */}
            <Card className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-4">Recommended actions</h3>
              <ul className="space-y-3">
                {recommendedActions.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 className="h-4 w-4 text-low shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
