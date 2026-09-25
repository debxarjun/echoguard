"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

const links = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-panel-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggle}
              className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-cyan-400/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/analyze">
              <Button size="sm">Launch Analyzer</Button>
            </Link>
          </div>

          <button className="lg:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass border-b border-panel-border overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm text-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={toggle} className="h-9 w-9 rounded-full glass flex items-center justify-center">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <Link href="/analyze" className="flex-1">
                  <Button size="sm" className="w-full">Launch Analyzer</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
