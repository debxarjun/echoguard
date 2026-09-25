"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, User2, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TimelineSegment } from "@/lib/mockEngine";

export function ConversationTimeline({ segments }: { segments: TimelineSegment[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {segments.map((seg, i) => {
        const isCaller = seg.speaker === "Caller";
        const isActive = active === i;
        return (
          <div key={i}>
            <button
              onClick={() => setActive(isActive ? null : i)}
              disabled={!seg.flagged}
              className={cn(
                "w-full text-left flex gap-3 rounded-xl p-3.5 transition-colors border",
                seg.flagged
                  ? "border-transparent bg-gradient-to-r cursor-pointer hover:brightness-110"
                  : "border-transparent hover:bg-white/[0.03]",
                seg.flagged && seg.severity === "Critical" && "from-rose-500/10 to-transparent",
                seg.flagged && seg.severity === "High" && "from-orange-400/10 to-transparent",
                seg.flagged && seg.severity === "Medium" && "from-yellow-400/10 to-transparent"
              )}
            >
              <div className="flex flex-col items-center shrink-0 w-14">
                <span className="text-[11px] font-mono text-muted">{seg.time}</span>
                <div className={cn("mt-1.5 h-7 w-7 rounded-full flex items-center justify-center", isCaller ? "bg-purple-500/15" : "bg-blue-500/15")}>
                  {isCaller ? <Headphones className="h-3.5 w-3.5 text-purple-300" /> : <User2 className="h-3.5 w-3.5 text-blue-300" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-muted">{seg.speaker}</span>
                  {seg.flagged && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-high">
                      <AlertOctagon className="h-3 w-3" /> flagged
                    </span>
                  )}
                </div>
                <p className="text-sm">{seg.text}</p>
              </div>
            </button>

            <AnimatePresence>
              {isActive && seg.flagged && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <Card className="mt-1.5 ml-14 p-4 border-cyan-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge severity={seg.severity}>{seg.severity}</Badge>
                      <span className="text-xs text-muted">Why this was flagged</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{seg.reason}</p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
