const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

export function formatDifficulty(difficulty: string): string {
  return DIFFICULTY_LABELS[difficulty] ?? difficulty;
}
