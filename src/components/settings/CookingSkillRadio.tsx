"use client";

import type { CookingSkill } from "@/types/user";

const SKILL_OPTIONS: {
  value: CookingSkill;
  label: string;
  description: string;
}[] = [
  { value: "beginner", label: "입문", description: "요리를 거의 안 해봤어요" },
  {
    value: "intermediate",
    label: "중급",
    description: "기본적인 요리는 가능해요",
  },
  {
    value: "advanced",
    label: "고급",
    description: "다양한 요리에 자신 있어요",
  },
];

interface CookingSkillRadioProps {
  value: CookingSkill;
  onChange: (skill: CookingSkill) => void;
}

export default function CookingSkillRadio({
  value,
  onChange,
}: CookingSkillRadioProps) {
  return (
    <section>
      <h3 className="mb-3 text-base font-bold text-text-primary">
        요리 숙련도
      </h3>
      <div className="space-y-3">
        {SKILL_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          >
            <input
              type="radio"
              name="cooking-skill"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-0.5 accent-primary"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">
                {option.label}
              </span>
              <p className="text-xs text-text-secondary">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
