"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
  LineChart, Line,
} from "recharts";
import { MessagesSquare, ShieldAlert, ShieldQuestion, ShieldCheck, ArrowUpRight } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { overviewStats, riskDistribution, riskTrend, topIndicators, activityData, recentConversations } from "@/lib/mockData";

const statCards = [
  { label: "Total Conversations", value: overviewStats.total.toLocaleString(), icon: MessagesSquare, accent: "text-cyan-300" },
  { label: "High Risk", value: overviewStats.high.toLocaleString(), icon: ShieldAlert, accent: "text-high" },
  { label: "Medium Risk", value: overviewStats.medium.toLocaleString(), icon: ShieldQuestion, accent: "text-medium" },
  { label: "Low Risk", value: overviewStats.low.toLocaleString(), icon: ShieldCheck, accent: "text-low" },
];

const tooltipStyle = { background: "var(--panel)", border: "1px solid var(--panel-border)", borderRadius: 12, fontSize: 12 };

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 grid-bg">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Overview</h1>
              <p className="text-sm text-muted mt-1">Demo dashboard — mock analytics for the EchoGuard prototype.</p>
            </div>
            <Link href="/analyze" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-cyan-200">
              New analysis <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className={`h-4.5 w-4.5 ${s.accent}`} />
                  </div>
                  <p className="text-2xl font-bold tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted mt-1">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 lg:col-span-1">
              <p className="font-medium mb-1">Risk distribution</p>
              <p className="text-xs text-muted mb-4">Share of conversations by risk level</p>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3} animationDuration={900}>
                      {riskDistribution.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {riskDistribution.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 lg:col-span-2">
              <p className="font-medium mb-1">Risk trends over time</p>
              <p className="text-xs text-muted mb-4">Last 7 days, by risk category</p>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskTrend}>
                    <defs>
                      <linearGradient id="high" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb923c" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="medium" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#eab308" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#eab308" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="low" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--panel-border)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="high" stroke="#fb923c" fill="url(#high)" strokeWidth={2} animationDuration={900} />
                    <Area type="monotone" dataKey="medium" stroke="#eab308" fill="url(#medium)" strokeWidth={2} animationDuration={900} />
                    <Area type="monotone" dataKey="low" stroke="#22c55e" fill="url(#low)" strokeWidth={2} animationDuration={900} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <p className="font-medium mb-1">Most frequently detected indicators</p>
              <p className="text-xs text-muted mb-4">Across all analyzed conversations</p>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topIndicators} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                    <Bar dataKey="count" fill="#22d3ee" radius={[0, 8, 8, 0]} barSize={14} animationDuration={900} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <p className="font-medium mb-1">Analysis activity</p>
              <p className="text-xs text-muted mb-4">Conversations analyzed by hour (today)</p>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid stroke="var(--panel-border)" vertical={false} />
                    <XAxis dataKey="hour" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="analyses" stroke="#a855f7" strokeWidth={2.5} dot={{ r: 3, fill: "#a855f7" }} animationDuration={900} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="p-6 pb-2">
              <p className="font-medium">Recent conversations</p>
              <p className="text-xs text-muted mt-1">Latest analyzed conversations across your workspace</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted border-y border-panel-border">
                    <th className="px-6 py-3 font-medium">Conversation ID</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Risk</th>
                    <th className="px-6 py-3 font-medium">Score</th>
                    <th className="px-6 py-3 font-medium">Top Indicator</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentConversations.map((c) => (
                    <tr key={c.id} className="border-b border-panel-border last:border-0 hover:bg-white/[0.02]">
                      <td className="px-6 py-3.5">
                        <Link href={`/reports/${c.id}`} className="font-mono text-cyan-300 hover:underline">{c.id}</Link>
                      </td>
                      <td className="px-6 py-3.5 text-muted">{c.date}</td>
                      <td className="px-6 py-3.5">
                        <Badge severity={c.risk === "High" ? "High" : c.risk === "Medium" ? "Medium" : "Low"}>{c.risk}</Badge>
                      </td>
                      <td className="px-6 py-3.5 tabular-nums">{c.score}</td>
                      <td className="px-6 py-3.5 text-muted">{c.topIndicator}</td>
                      <td className="px-6 py-3.5 text-muted">{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
