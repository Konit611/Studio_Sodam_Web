"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteRecipe } from "@/hooks/useDeleteRecipe";
import { useToast } from "@/components/ui/ToastProvider";
import { getErrorMessage } from "@/lib/api/client";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface DeleteRecipeButtonProps {
  recipeId: string;
}

export default function DeleteRecipeButton({
  recipeId,
}: DeleteRecipeButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const { mutate, isPending } = useDeleteRecipe({
    onSuccess: () => {
      showSuccess("레시피가 삭제되었습니다");
      router.push("/recipes");
    },
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="rounded-lg p-2 text-text-secondary hover:bg-danger/10 hover:text-danger transition-colors"
        aria-label="레시피 삭제"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {showDialog && (
        <ConfirmDialog
          title="레시피 삭제"
          message="이 레시피를 정말 삭제하시겠어요? 삭제하면 되돌릴 수 없습니다."
          confirmLabel="삭제"
          onConfirm={() => mutate(recipeId)}
          onCancel={() => setShowDialog(false)}
          isLoading={isPending}
        />
      )}
    </>
  );
}
