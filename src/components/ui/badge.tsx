import { cn } from "@/lib/utils";
import * as React from "react";

const severityStyles: Record<string, string> = {
  Critical: "bg-critical/15 text-critical border-critical/30",
  High: "bg-high/15 text-high border-high/30",
  Medium: "bg-medium/15 text-medium border-medium/30",
  Low: "bg-low/15 text-low border-low/30",
};

export function Badge({
  className,
  severity,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { severity?: keyof typeof severityStyles }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        severity ? severityStyles[severity] : "border-panel-border bg-white/5 text-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
