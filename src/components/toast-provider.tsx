"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "info" | "warning";
interface Toast { id: number; message: string; type: ToastType; }

const ToastContext = createContext<{ toast: (message: string, type?: ToastType) => void }>({
  toast: () => {},
});

export const useToast = () => useContext(ToastContext);

const icons = { success: CheckCircle2, info: Info, warning: AlertTriangle };
const colors = {
  success: "text-low border-low/30",
  info: "text-accent-cyan border-accent-cyan/30",
  warning: "text-high border-high/30",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                className={cn(
                  "glass rounded-xl border px-4 py-3 flex items-center gap-3 shadow-lg",
                  colors[t.type]
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <p className="text-sm text-foreground flex-1">{t.message}</p>
                <button onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))}>
                  <X className="h-3.5 w-3.5 text-muted" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
