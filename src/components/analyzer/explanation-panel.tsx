"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BrainCircuit } from "lucide-react";
import { Card } from "@/components/ui/card";

const colors = ["#3b82f6", "#f43f5e", "#a855f7", "#eab308", "#22d3ee", "#fb923c"];

export function ExplanationPanel({
  summary,
  breakdown,
}: {
  summary: string;
  breakdown: { name: string; value: number }[];
}) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-panel-border flex items-center justify-center shrink-0">
          <BrainCircuit className="h-5 w-5 text-cyan-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Why was this conversation flagged?</h3>
          <p className="text-sm text-muted mt-2 leading-relaxed">{summary}</p>
        </div>
      </div>

      <p className="text-sm font-medium text-muted mb-3">Key contributing signals</p>
      <div className="h-[260px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={breakdown} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              dataKey="name"
              type="category"
              width={140}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{ background: "var(--panel)", border: "1px solid var(--panel-border)", borderRadius: 12, fontSize: 12 }}
              formatter={(v) => [`${v}%`, "Signal strength"]}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={16} animationDuration={900}>
              {breakdown.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
