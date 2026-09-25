"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanSearch, MessagesSquare, FileWarning, BarChart3, Settings, Sun, Moon } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/analyze", label: "Analyze", icon: ScanSearch },
  { href: "/dashboard", label: "Conversations", icon: MessagesSquare },
  { href: "/reports/EC-1042", label: "Risk Reports", icon: FileWarning },
  { href: "/dashboard", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-panel-border h-screen sticky top-0 p-5">
      <Link href="/" className="mb-8 px-1">
        <Logo />
      </Link>
      <nav className="flex-1 space-y-1">
        {items.map((it, i) => {
          const active = it.href === pathname;
          return (
            <Link
              key={it.label + i}
              href={it.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-white/[0.06] text-foreground border border-panel-border" : "text-muted hover:text-foreground hover:bg-white/[0.03]"
              )}
            >
              <it.icon className="h-4 w-4" /> {it.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={toggle} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:text-foreground hover:bg-white/[0.03]">
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  );
}
