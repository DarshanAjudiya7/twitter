// Reputation rules and gamification logic

export const REPUTATION_POINTS = {
  PUBLISH_BLOG: 20,
  RECEIVE_LIKE: 2,
  RECEIVE_COMMENT: 5,
  GIVE_LIKE: 1,
  WRITE_COMMENT: 2,
  GET_FOLLOWER: 5,
  DAILY_LOGIN: 1,
};

export const BADGE_THRESHOLDS = [
  { name: "Newcomer", points: 0, icon: "👋" },
  { name: "Contributor", points: 100, icon: "🥉" },
  { name: "Active Member", points: 500, icon: "🥈" },
  { name: "Top Writer", points: 1000, icon: "🥇" },
  { name: "Community Leader", points: 5000, icon: "💎" },
];

export function calculateBadges(points: number) {
  return BADGE_THRESHOLDS.filter(badge => points >= badge.points);
}

export function getNextBadge(points: number) {
  return BADGE_THRESHOLDS.find(badge => badge.points > points) || null;
}

// In a real application, you would call this function in your API routes/server actions
export async function awardReputation(userId: string, action: keyof typeof REPUTATION_POINTS) {
  const pointsToAward = REPUTATION_POINTS[action];
  
  // Pseudo-code for DB update:
  // await db.update(user)
  //   .set({ reputationScore: sql\`\${user.reputationScore} + \${pointsToAward}\` })
  //   .where(eq(user.id, userId));
  
  return pointsToAward;
}
