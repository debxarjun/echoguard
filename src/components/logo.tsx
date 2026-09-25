import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-8 w-8 shrink-0">
        <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
          <defs>
            <linearGradient id="egGrad" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M20 2 L35 8 V19 C35 28 29 34.5 20 38 C11 34.5 5 28 5 19 V8 Z"
            fill="url(#egGrad)"
            opacity="0.18"
          />
          <path
            d="M20 2 L35 8 V19 C35 28 29 34.5 20 38 C11 34.5 5 28 5 19 V8 Z"
            stroke="url(#egGrad)"
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M11 20 L14.5 20 L17 13 L20.5 27 L23.5 16 L25.5 20 L29 20"
            stroke="url(#egGrad)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <span className="text-lg font-semibold tracking-tight">
          Echo<span className="text-gradient">Guard</span>
        </span>
      )}
    </div>
  );
}
