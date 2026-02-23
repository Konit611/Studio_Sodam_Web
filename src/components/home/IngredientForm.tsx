"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TagInput from "@/components/ui/TagInput";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { useGenerateRecipe } from "@/hooks/useGenerateRecipe";
import { getErrorMessage } from "@/lib/api/client";
import { isValidIngredient } from "@/utils/validation";
import GeneratingOverlay from "./GeneratingOverlay";

const MAX_INGREDIENTS = 30;
const MAX_INGREDIENT_LENGTH = 50;
const MAX_PREFERENCES_LENGTH = 500;

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");
  const router = useRouter();
  const { showError } = useToast();
  const { mutate, isPending } = useGenerateRecipe({
    onSuccess: (recipe) => {
      router.push(`/recipes/${recipe.id}`);
    },
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  function handleAddIngredient(tag: string) {
    setIngredients((prev) => [...prev, tag]);
  }

  function handleRemoveIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    if (ingredients.length === 0) return;
    mutate({ ingredients, preferences: preferences.trim() });
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-text-primary">
            재료
          </label>
          <TagInput
            tags={ingredients}
            onAddTag={handleAddIngredient}
            onRemoveTag={handleRemoveIngredient}
            maxItems={MAX_INGREDIENTS}
            maxLength={MAX_INGREDIENT_LENGTH}
            placeholder="재료를 입력하세요 (Enter로 추가)"
            validate={isValidIngredient}
          />
          <p className="mt-1 text-xs text-text-secondary">
            최대 {MAX_INGREDIENTS}개, 각 {MAX_INGREDIENT_LENGTH}자 이내
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text-primary">
            추가 요청사항 <span className="text-text-secondary">(선택)</span>
          </label>
          <textarea
            value={preferences}
            onChange={(e) =>
              setPreferences(e.target.value.slice(0, MAX_PREFERENCES_LENGTH))
            }
            placeholder="예: 매콤하게 해주세요, 다이어트용으로 만들어주세요"
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-surface p-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-primary"
          />
          <p className="mt-1 text-right text-xs text-text-secondary">
            {preferences.length}/{MAX_PREFERENCES_LENGTH}
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={ingredients.length === 0 || isPending}
          className="w-full py-3 text-base"
        >
          레시피 만들기
        </Button>
      </div>

      {isPending && <GeneratingOverlay />}
    </>
  );
}
