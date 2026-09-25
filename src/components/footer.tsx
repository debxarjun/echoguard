import Link from "next/link";
import { GitFork } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-panel-border mt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-muted">Understand the conversation. Detect the risk.</p>
            <p className="mt-4 text-xs text-muted/70">Built as a hackathon prototype.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-medium mb-3">Product</p>
              <ul className="space-y-2 text-muted">
                <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-foreground">How It Works</Link></li>
                <li><Link href="/#about" className="hover:text-foreground">Technology</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-3">Platform</p>
              <ul className="space-y-2 text-muted">
                <li><Link href="/analyze" className="hover:text-foreground">Analyzer</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
                <li><Link href="/reports/EC-1042" className="hover:text-foreground">Sample Report</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-3">More</p>
              <ul className="space-y-2 text-muted">
                <li><Link href="/#about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/#about" className="hover:text-foreground">Privacy</Link></li>
                <li>
                  <a href="https://github.com" target="_blank" className="hover:text-foreground flex items-center gap-1.5">
                    <GitFork className="h-3.5 w-3.5" /> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-panel-border text-xs text-muted/70 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} EchoGuard. Hackathon demo — not a production security product.</p>
          <p>Made with explainable AI in mind.</p>
        </div>
      </div>
    </footer>
  );
}
