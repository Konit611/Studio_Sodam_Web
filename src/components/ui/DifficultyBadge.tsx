import { formatDifficulty } from "@/utils/format-difficulty";

interface DifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard";
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[difficulty] ?? ""}`}
    >
      {formatDifficulty(difficulty)}
    </span>
  );
}
