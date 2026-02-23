import { notFound } from "next/navigation";
import Link from "next/link";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import DeleteRecipeButton from "@/components/recipes/DeleteRecipeButton";
import { fetchRecipeDetail } from "@/lib/api/recipes";
import { ApiClientError } from "@/lib/api/client";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate ID format
  if (!id || id.length > 100) {
    notFound();
  }

  let recipe;
  try {
    recipe = await fetchRecipeDetail(id);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/recipes"
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          뒤로
        </Link>
        <DeleteRecipeButton recipeId={id} />
      </div>
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
