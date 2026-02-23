import Link from "next/link";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import { formatDate } from "@/utils/format-date";
import type { RecipeListItem } from "@/types/recipe";

interface RecipeCardProps {
  recipe: RecipeListItem;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-3 flex items-center gap-2 text-sm text-text-secondary">
          <span>{recipe.total_time_minutes}분</span>
          <span>·</span>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </div>
        <h3 className="text-xl font-bold text-text-primary">{recipe.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
          {recipe.summary}
        </p>
        <p className="mt-4 text-right text-xs text-text-secondary">
          {formatDate(recipe.created_at)}
        </p>
      </article>
    </Link>
  );
}
