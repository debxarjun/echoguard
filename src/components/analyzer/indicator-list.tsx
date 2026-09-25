"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndicatorIcon } from "./indicator-icon";
import type { Indicator } from "@/lib/mockEngine";

export function IndicatorList({ indicators }: { indicators: Indicator[] }) {
  const [open, setOpen] = useState<string | null>(indicators[0]?.id ?? null);

  if (indicators.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-muted">
        No specific risk indicators were detected in this conversation.
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {indicators.map((ind, i) => {
        const isOpen = open === ind.id;
        return (
          <motion.div key={ind.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : ind.id)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-panel-border flex items-center justify-center shrink-0">
                  <IndicatorIcon icon={ind.icon} className="h-4.5 w-4.5 text-cyan-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{ind.name}</p>
                  <p className="text-xs text-muted mt-0.5 truncate">{ind.explanation}</p>
                </div>
                <Badge severity={ind.severity}>{ind.severity}</Badge>
                <ChevronDown className={`h-4 w-4 text-muted transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-panel-border ml-14">
                      <p className="text-sm text-muted leading-relaxed">{ind.explanation}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ind.score}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400"
                          />
                        </div>
                        <span className="text-xs text-muted tabular-nums">{ind.score}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
