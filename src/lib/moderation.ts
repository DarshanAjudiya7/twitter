// Content moderation and safety utilities

const BANNED_KEYWORDS = [
  "spam",
  "scam",
  "buy followers",
  "free money",
  "crypto giveaway",
  "hacker for hire",
];

export function containsProfanityOrSpam(text: string): boolean {
  const lower = text.toLowerCase();
  return BANNED_KEYWORDS.some(keyword => lower.includes(keyword));
}

export function filterProfanity(text: string): string {
  let cleaned = text;
  BANNED_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(keyword, "gi");
    cleaned = cleaned.replace(regex, "***");
  });
  return cleaned;
}

export interface ReportPayload {
  targetId: string;
  targetType: "blog" | "comment" | "message" | "user";
  reason: string;
  details?: string;
}

export async function submitReport(payload: ReportPayload) {
  console.log("[Moderation] Report submitted:", payload);
  // Simulating async submission to backend
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: "Report submitted to moderators for review." };
}
