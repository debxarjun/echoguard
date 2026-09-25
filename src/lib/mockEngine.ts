// EchoGuard Mock Analysis Engine
// -------------------------------------------------------------
// This simulates a multi-stage AI pipeline (NLP + behavioral pattern
// analysis) for hackathon-demo purposes. It is a deterministic,
// keyword & structure informed heuristic — NOT a real fraud model.
// -------------------------------------------------------------

export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface Indicator {
  id: string;
  name: string;
  severity: Severity;
  score: number; // 0-100 contribution weight
  explanation: string;
  icon: "urgency" | "credential" | "authority" | "verification" | "pattern" | "financial";
}

export interface TimelineSegment {
  time: string;
  speaker: "Caller" | "User";
  text: string;
  flagged: boolean;
  indicatorId?: string;
  severity?: Severity;
  reason?: string;
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  indicators: Indicator[];
  timeline: TimelineSegment[];
  signalBreakdown: { name: string; value: number }[];
  summary: string;
}

interface Rule {
  id: string;
  name: string;
  icon: Indicator["icon"];
  keywords: RegExp;
  baseSeverity: Severity;
  explanation: string;
  weight: number;
}

const RULES: Rule[] = [
  {
    id: "urgency",
    name: "Urgency / Pressure",
    icon: "urgency",
    keywords: /(urgent|immediately|right away|act now|act immediately|as soon as possible|hurry|within (the )?next|time.?sensitive|expire[sd]?)/i,
    baseSeverity: "High",
    weight: 22,
    explanation:
      "The speaker repeatedly creates urgency and encourages immediate action, a common pressure tactic used to prevent careful thinking.",
  },
  {
    id: "credential",
    name: "Credential Request",
    icon: "credential",
    keywords: /(otp|one.?time password|pin\b|cvv|password|verification code|security code|login details|username and password)/i,
    baseSeverity: "Critical",
    weight: 30,
    explanation:
      "The conversation contains a request for sensitive authentication information such as an OTP, PIN, or password.",
  },
  {
    id: "authority",
    name: "Authority Impersonation",
    icon: "authority",
    keywords: /(bank|this is .*(officer|department)|calling from|irs|government|police|tax office|customer support|official (representative|department)|compliance team)/i,
    baseSeverity: "High",
    weight: 18,
    explanation:
      "The speaker presents themselves as representing a financial institution, government body, or other trusted authority.",
  },
  {
    id: "verification",
    name: "Suspicious Verification Process",
    icon: "verification",
    keywords: /(verify your account|confirm your identity|secure your account|remote access|install (this|an) app|anydesk|teamviewer|click (this|the) link|share your screen)/i,
    baseSeverity: "Medium",
    weight: 14,
    explanation:
      "The proposed verification process contains potentially unsafe requests, such as remote access tools or unofficial links.",
  },
  {
    id: "financial",
    name: "Financial Transaction Pressure",
    icon: "financial",
    keywords: /(transfer money|wire transfer|send (money|payment|funds)|gift card|payment (now|immediately)|bank account (number|details)|routing number)/i,
    baseSeverity: "Critical",
    weight: 24,
    explanation:
      "The conversation pushes toward a financial transaction, such as a transfer or payment, often before the user can verify legitimacy.",
  },
  {
    id: "pattern",
    name: "Unusual Behavioral Pattern",
    icon: "pattern",
    keywords: /(don'?t tell anyone|keep this (private|confidential)|between us|don'?t hang up|stay on the line|suspicious activity|flagged (for|your) account|unauthorized (access|transaction))/i,
    baseSeverity: "Medium",
    weight: 12,
    explanation:
      "The conversation follows structural patterns commonly associated with social-engineering attempts, such as isolation or secrecy cues.",
  },
];

function severityToScore(s: Severity) {
  return { Critical: 95, High: 78, Medium: 55, Low: 30 }[s];
}

function scoreToRiskLevel(score: number): AnalysisResult["riskLevel"] {
  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 35) return "Medium";
  return "Low";
}

function parseTranscript(raw: string): { speaker: "Caller" | "User"; text: string }[] {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const segments: { speaker: "Caller" | "User"; text: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^(caller|user|agent|customer)\s*:\s*(.*)$/i);
    if (match) {
      const role = match[1].toLowerCase();
      const speaker: "Caller" | "User" = role === "user" || role === "customer" ? "User" : "Caller";
      segments.push({ speaker, text: match[2].trim() });
    } else {
      segments.push({ speaker: "Caller", text: line });
    }
  }
  return segments.length ? segments : [{ speaker: "Caller", text: raw }];
}

function secondsToStamp(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export function analyzeTranscript(raw: string): AnalysisResult {
  const segments = parseTranscript(raw);
  const matchedIndicatorIds = new Set<string>();
  const timeline: TimelineSegment[] = [];

  let cursor = 4; // simulated seconds
  for (const seg of segments) {
    let flagged = false;
    let indicatorId: string | undefined;
    let severity: Severity | undefined;
    let reason: string | undefined;

    for (const rule of RULES) {
      if (rule.keywords.test(seg.text)) {
        matchedIndicatorIds.add(rule.id);
        if (!flagged) {
          flagged = true;
          indicatorId = rule.id;
          severity = rule.baseSeverity;
          reason = rule.explanation;
        }
      }
    }

    timeline.push({
      time: secondsToStamp(cursor),
      speaker: seg.speaker,
      text: seg.text,
      flagged,
      indicatorId,
      severity,
      reason,
    });
    cursor += 9 + Math.floor(seg.text.length / 6);
  }

  const matchedRules = RULES.filter((r) => matchedIndicatorIds.has(r.id));

  // If nothing matched, produce a low-risk baseline result.
  if (matchedRules.length === 0) {
    return {
      riskScore: 8,
      riskLevel: "Low",
      indicators: [],
      timeline,
      signalBreakdown: [
        { name: "Urgency", value: 4 },
        { name: "Credential Request", value: 2 },
        { name: "Authority Claim", value: 3 },
        { name: "Unusual Pattern", value: 5 },
        { name: "Suspicious Context", value: 4 },
      ],
      summary:
        "No strong risk signals were detected in this conversation. Language patterns appear consistent with a routine, low-pressure interaction. As always, remain cautious with any request for personal or financial information.",
    };
  }

  const totalWeight = matchedRules.reduce((acc, r) => acc + r.weight, 0);
  const riskScore = Math.min(98, Math.round(28 + totalWeight * 1.4));
  const riskLevel = scoreToRiskLevel(riskScore);

  const indicators: Indicator[] = matchedRules
    .map((r) => ({
      id: r.id,
      name: r.name,
      severity: r.baseSeverity,
      score: severityToScore(r.baseSeverity),
      explanation: r.explanation,
      icon: r.icon,
    }))
    .sort((a, b) => severityToScore(b.severity) - severityToScore(a.severity));

  const breakdownMap: Record<string, string> = {
    urgency: "Urgency",
    credential: "Credential Request",
    authority: "Authority Claim",
    pattern: "Unusual Pattern",
    verification: "Suspicious Context",
    financial: "Financial Pressure",
  };

  const signalBreakdown = Object.entries(breakdownMap).map(([id, name]) => {
    const rule = RULES.find((r) => r.id === id)!;
    const matched = matchedIndicatorIds.has(id);
    const base = matched ? severityToScore(rule.baseSeverity) : Math.round(8 + Math.random() * 15);
    return { name, value: Math.min(97, base) };
  });

  const topNames = indicators.slice(0, 3).map((i) => i.name.toLowerCase());
  const summary = `Multiple signals contributed to the elevated risk score. The conversation combines ${topNames.join(
    ", "
  )}${indicators.length > 3 ? ", among other indicators" : ""}. These signals individually may not indicate fraud, but their combination warrants caution.`;

  return { riskScore, riskLevel, indicators, timeline, signalBreakdown, summary };
}

export const DEMO_TRANSCRIPT = `Caller: Hello, this is calling from the Fraud Prevention Department at your bank.
Caller: Your account has been flagged for suspicious activity.
User: What happened? Is my money okay?
Caller: We detected an unauthorized transaction. You need to act immediately to secure your account.
Caller: Please don't hang up, this is time-sensitive.
User: Okay, what do I need to do?
Caller: We need to verify your identity. Please provide the one-time password sent to your phone.
User: I just got a code, should I share it?
Caller: Yes, please provide your OTP so we can secure your account right away.
Caller: This is confidential, please don't tell anyone about this call.
User: Alright, the code is on my screen.
Caller: Thank you. Now we also need to confirm your account by transferring a small amount to verify ownership.`;
