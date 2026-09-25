"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Waveform({ bars = 40, active = true, className }: { bars?: number; active?: boolean; className?: string }) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const base = Math.abs(Math.sin(i * 0.5)) * 70 + 15;
    return Math.round(base);
  });

  return (
    <div className={cn("flex items-end gap-[3px] h-16", className)}>
      {heights.map((h, i) => (
        <div key={i} className="w-[3px] flex items-end" style={{ height: `${h}%` }}>
          <motion.div
            className="w-[3px] h-full rounded-full bg-gradient-to-t from-blue-500 via-cyan-400 to-purple-400"
            animate={
              active
                ? { scaleY: [0.4, 1, 0.3, 0.9, 0.5], opacity: [0.6, 1, 0.7, 1, 0.6] }
                : { scaleY: 0.4, opacity: 0.4 }
            }
            transition={{
              duration: 1.2 + (i % 5) * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.02,
            }}
            style={{ transformOrigin: "bottom" }}
          />
        </div>
      ))}
    </div>
  );
}
