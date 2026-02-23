import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { fetchRecipeList } from "@/lib/api/recipes";
import { queryKeys } from "@/lib/query/keys";
import type { RecipeListItem } from "@/types/recipe";

const PAGE_SIZE = 20;

export function useRecipeList() {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: queryKeys.recipes.list(0, PAGE_SIZE),
    queryFn: async () => {
      const data = await fetchRecipeList(0, PAGE_SIZE);
      setRecipes(data);
      setHasMore(data.length === PAGE_SIZE);
      setOffset(PAGE_SIZE);
      return data;
    },
  });

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const data = await fetchRecipeList(offset, PAGE_SIZE);
      setRecipes((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
      setOffset((prev) => prev + PAGE_SIZE);
    } finally {
      setIsLoadingMore(false);
    }
  }, [offset, hasMore, isLoadingMore]);

  return { recipes, isLoading, isLoadingMore, error, hasMore, loadMore };
}
