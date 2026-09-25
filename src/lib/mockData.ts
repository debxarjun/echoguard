export const overviewStats = {
  total: 1284,
  high: 187,
  medium: 326,
  low: 771,
};

export const riskDistribution = [
  { name: "Low", value: 771, color: "#22c55e" },
  { name: "Medium", value: 326, color: "#eab308" },
  { name: "High", value: 187, color: "#fb923c" },
];

export const riskTrend = [
  { day: "Mon", high: 12, medium: 28, low: 64 },
  { day: "Tue", high: 18, medium: 31, low: 70 },
  { day: "Wed", high: 9, medium: 25, low: 58 },
  { day: "Thu", high: 22, medium: 40, low: 66 },
  { day: "Fri", high: 27, medium: 35, low: 61 },
  { day: "Sat", high: 15, medium: 22, low: 49 },
  { day: "Sun", high: 11, medium: 18, low: 44 },
];

export const topIndicators = [
  { name: "Credential Request", count: 412 },
  { name: "Urgency / Pressure", count: 388 },
  { name: "Authority Impersonation", count: 301 },
  { name: "Financial Pressure", count: 244 },
  { name: "Suspicious Verification", count: 198 },
  { name: "Unusual Pattern", count: 156 },
];

export const activityData = [
  { hour: "00", analyses: 4 },
  { hour: "04", analyses: 2 },
  { hour: "08", analyses: 18 },
  { hour: "12", analyses: 31 },
  { hour: "16", analyses: 27 },
  { hour: "20", analyses: 14 },
];

export interface ConversationRow {
  id: string;
  date: string;
  risk: "High" | "Medium" | "Low";
  score: number;
  topIndicator: string;
  status: "Reviewed" | "Pending" | "Flagged";
}

export const recentConversations: ConversationRow[] = [
  { id: "EC-1042", date: "Sep 25", risk: "High", score: 87, topIndicator: "Credential Request", status: "Flagged" },
  { id: "EC-1041", date: "Sep 25", risk: "Medium", score: 61, topIndicator: "Urgency / Pressure", status: "Pending" },
  { id: "EC-1040", date: "Sep 24", risk: "Low", score: 22, topIndicator: "None", status: "Reviewed" },
  { id: "EC-1039", date: "Sep 24", risk: "High", score: 91, topIndicator: "Financial Pressure", status: "Flagged" },
  { id: "EC-1038", date: "Sep 23", risk: "Medium", score: 58, topIndicator: "Authority Impersonation", status: "Reviewed" },
  { id: "EC-1037", date: "Sep 23", risk: "Low", score: 14, topIndicator: "None", status: "Reviewed" },
  { id: "EC-1036", date: "Sep 22", risk: "High", score: 83, topIndicator: "Credential Request", status: "Flagged" },
  { id: "EC-1035", date: "Sep 22", risk: "Medium", score: 49, topIndicator: "Suspicious Verification", status: "Pending" },
];
