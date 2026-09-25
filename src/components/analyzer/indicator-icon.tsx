import { AlertTriangle, KeyRound, BadgeCheck, ShieldAlert, Fingerprint, Banknote } from "lucide-react";
import type { Indicator } from "@/lib/mockEngine";

const map: Record<Indicator["icon"], React.ElementType> = {
  urgency: AlertTriangle,
  credential: KeyRound,
  authority: BadgeCheck,
  verification: ShieldAlert,
  pattern: Fingerprint,
  financial: Banknote,
};

export function IndicatorIcon({ icon, className }: { icon: Indicator["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} />;
}
