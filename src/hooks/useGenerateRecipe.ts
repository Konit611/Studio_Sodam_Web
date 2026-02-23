import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateRecipe } from "@/lib/api/recipes";
import { queryKeys } from "@/lib/query/keys";
import type { GenerateRecipeRequest, RecipeRead } from "@/types/recipe";

interface UseGenerateRecipeOptions {
  onSuccess: (data: RecipeRead) => void;
  onError: (error: Error) => void;
}

export function useGenerateRecipe({ onSuccess, onError }: UseGenerateRecipeOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GenerateRecipeRequest) => generateRecipe(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      onSuccess(data);
    },
    onError,
  });
}
