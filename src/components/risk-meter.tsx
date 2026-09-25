"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const levelColor: Record<string, string> = {
  Critical: "#f43f5e",
  High: "#fb923c",
  Medium: "#eab308",
  Low: "#22c55e",
};

export function RiskMeter({ score, level, size = 200 }: { score: number; level: string; size?: number }) {
  const [display, setDisplay] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = levelColor[level] ?? "#22d3ee";

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const animate = (t: number) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * score));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold tabular-nums" style={{ color }}>
          {display}
        </span>
        <span className="text-xs text-muted mt-1">/ 100</span>
      </div>
    </div>
  );
}

export function severityDotClass(severity: string) {
  return cn(
    severity === "Critical" && "bg-critical",
    severity === "High" && "bg-high",
    severity === "Medium" && "bg-medium",
    severity === "Low" && "bg-low"
  );
}
