import type {
  GenerateRecipeRequest,
  RecipeListItem,
  RecipeRead,
} from "@/types/recipe";
import { get, post, del } from "./client";

export function generateRecipe(
  request: GenerateRecipeRequest,
): Promise<RecipeRead> {
  return post<RecipeRead>("/recipes/generate", request);
}

export function fetchRecipeList(
  offset: number,
  limit: number,
): Promise<RecipeListItem[]> {
  return get<RecipeListItem[]>(`/recipes/?offset=${offset}&limit=${limit}`);
}

export function fetchRecipeDetail(id: string): Promise<RecipeRead> {
  return get<RecipeRead>(`/recipes/${encodeURIComponent(id)}`);
}

export function deleteRecipe(id: string): Promise<void> {
  return del<void>(`/recipes/${encodeURIComponent(id)}`);
}
