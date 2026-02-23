"use client";

import TagInput from "@/components/ui/TagInput";
import { isValidAllergy } from "@/utils/validation";

const MAX_ALLERGIES = 20;
const MAX_ALLERGY_LENGTH = 30;

interface AllergyFormProps {
  allergies: string[];
  onAddAllergy: (allergy: string) => void;
  onRemoveAllergy: (index: number) => void;
}

export default function AllergyForm({
  allergies,
  onAddAllergy,
  onRemoveAllergy,
}: AllergyFormProps) {
  return (
    <section>
      <h3 className="mb-2 text-base font-bold text-text-primary">
        알레르기 / 기피 재료
      </h3>
      <TagInput
        tags={allergies}
        onAddTag={onAddAllergy}
        onRemoveTag={onRemoveAllergy}
        maxItems={MAX_ALLERGIES}
        maxLength={MAX_ALLERGY_LENGTH}
        placeholder="추가할 재료를 입력하세요 (Enter로 추가)"
        validate={isValidAllergy}
      />
      <p className="mt-1 text-xs text-text-secondary">
        최대 {MAX_ALLERGIES}개, 각 {MAX_ALLERGY_LENGTH}자 이내
      </p>
    </section>
  );
}
