import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "@/lib/api/recipes";
import { queryKeys } from "@/lib/query/keys";
import type { RecipeListItem } from "@/types/recipe";

const PAGE_SIZE = 20;

interface UseDeleteRecipeOptions {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function useDeleteRecipe({ onSuccess, onError }: UseDeleteRecipeOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.recipes.all });

      const previousData = queryClient.getQueryData<RecipeListItem[]>(
        queryKeys.recipes.list(0, PAGE_SIZE),
      );

      if (previousData) {
        queryClient.setQueryData<RecipeListItem[]>(
          queryKeys.recipes.list(0, PAGE_SIZE),
          previousData.filter((recipe) => recipe.id !== deletedId),
        );
      }

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      onSuccess();
    },
    onError: (error, _deletedId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.recipes.list(0, PAGE_SIZE),
          context.previousData,
        );
      }
      onError(error);
    },
  });
}
