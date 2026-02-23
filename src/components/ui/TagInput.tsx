"use client";

import { useState, type KeyboardEvent } from "react";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  maxItems: number;
  maxLength: number;
  placeholder: string;
  validate: (value: string) => boolean;
}

export default function TagInput({
  tags,
  onAddTag,
  onRemoveTag,
  maxItems,
  maxLength,
  placeholder,
  validate,
}: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag() {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (tags.length >= maxItems) return;
    if (!validate(trimmed)) return;
    if (tags.includes(trimmed)) return;
    onAddTag(trimmed);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onRemoveTag(tags.length - 1);
    }
  }

  const isAtLimit = tags.length >= maxItems;

  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(index)}
              className="ml-0.5 text-primary/60 hover:text-primary"
              aria-label={`${tag} 제거`}
            >
              ×
            </button>
          </span>
        ))}
        {!isAtLimit && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="min-w-[120px] flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
          />
        )}
      </div>
      {isAtLimit && (
        <p className="mt-2 text-xs text-text-secondary">
          최대 {maxItems}개까지 입력할 수 있습니다
        </p>
      )}
    </div>
  );
}
