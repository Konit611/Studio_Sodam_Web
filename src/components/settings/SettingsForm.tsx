"use client";

import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/lib/auth/context";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useToast } from "@/components/ui/ToastProvider";
import { getErrorMessage } from "@/lib/api/client";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AllergyForm from "./AllergyForm";
import CookingSkillRadio from "./CookingSkillRadio";
import type { CookingSkill } from "@/types/user";

export default function SettingsForm() {
  const { userId } = useAuth();
  const { data: profile, isLoading } = useUserProfile(userId);
  const { showSuccess, showError } = useToast();

  const [allergies, setAllergies] = useState<string[] | null>(null);
  const [cookingSkill, setCookingSkill] = useState<CookingSkill | null>(null);

  const currentAllergies = allergies ?? profile?.allergies ?? [];
  const currentSkill = cookingSkill ?? profile?.cooking_skill ?? "beginner";

  const { mutate, isPending } = useUpdateProfile({
    userId,
    onSuccess: () => showSuccess("설정이 저장되었습니다"),
    onError: (error) => showError(getErrorMessage(error)),
  });

  const isDirty = useMemo(() => {
    if (!profile) return false;
    if (allergies !== null && JSON.stringify(allergies) !== JSON.stringify(profile.allergies)) return true;
    if (cookingSkill !== null && cookingSkill !== profile.cooking_skill) return true;
    return false;
  }, [allergies, cookingSkill, profile]);

  const handleAddAllergy = useCallback((allergy: string) => {
    setAllergies((prev) => [...(prev ?? profile?.allergies ?? []), allergy]);
  }, [profile]);

  const handleRemoveAllergy = useCallback((index: number) => {
    setAllergies((prev) => {
      const current = prev ?? profile?.allergies ?? [];
      return current.filter((_, i) => i !== index);
    });
  }, [profile]);

  function handleSave() {
    mutate({
      allergies: currentAllergies,
      cooking_skill: currentSkill,
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AllergyForm
        allergies={currentAllergies}
        onAddAllergy={handleAddAllergy}
        onRemoveAllergy={handleRemoveAllergy}
      />
      <CookingSkillRadio value={currentSkill} onChange={setCookingSkill} />
      <Button
        onClick={handleSave}
        disabled={!isDirty || isPending}
        className="w-full py-3 text-base"
      >
        {isPending ? "저장 중..." : "저장하기"}
      </Button>
    </div>
  );
}
