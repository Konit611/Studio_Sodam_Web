import type { RecipeRead } from "@/types/recipe";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import { formatDate } from "@/utils/format-date";

interface RecipeDetailProps {
  recipe: RecipeRead;
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const sortedInstructions = [...recipe.instructions].sort(
    (a, b) => a.step_order - b.step_order,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">{recipe.title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{recipe.summary}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span>{recipe.total_time_minutes}분</span>
        <span>·</span>
        <DifficultyBadge difficulty={recipe.difficulty} />
        <span>·</span>
        <span>{formatDate(recipe.created_at)}</span>
      </div>

      <section>
        <h3 className="mb-3 text-base font-bold text-text-primary">재료</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing.id}
              className="flex items-center gap-2 text-sm text-text-primary"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                {ing.name} {ing.quantity}
                {ing.unit}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-base font-bold text-text-primary">
          조리 순서
        </h3>
        <ol className="space-y-4">
          {sortedInstructions.map((step) => (
            <li key={step.id} className="flex gap-3 text-sm">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
                aria-label={`${step.step_order}단계`}
              >
                {step.step_order}
              </span>
              <p className="text-text-primary leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
