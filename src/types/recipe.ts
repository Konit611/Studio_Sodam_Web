export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface Instruction {
  id: string;
  step_order: number;
  description: string;
  image_url: string | null;
}

export interface RecipeListItem {
  id: string;
  title: string;
  summary: string;
  total_time_minutes: number;
  difficulty: "easy" | "medium" | "hard";
  created_at: string;
}

export interface RecipeRead {
  id: string;
  title: string;
  summary: string;
  total_time_minutes: number;
  difficulty: "easy" | "medium" | "hard";
  original_prompt: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  created_at: string;
  updated_at: string;
}

export interface GenerateRecipeRequest {
  ingredients: string[];
  preferences: string;
}
