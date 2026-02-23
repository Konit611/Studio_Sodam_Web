export type CookingSkill = "beginner" | "intermediate" | "advanced";

export interface UserRead {
  id: string;
  email: string;
  allergies: string[];
  cooking_skill: CookingSkill;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileRequest {
  allergies?: string[];
  cooking_skill?: CookingSkill;
}
