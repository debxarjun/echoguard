import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "EchoGuard — Understand the conversation. Detect the risk.",
  description:
    "EchoGuard analyzes voice transcripts and identifies potential scam, fraud, and social-engineering patterns with explainable AI. Hackathon prototype.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
