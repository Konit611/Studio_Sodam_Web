"use client";

import { useRef } from "react";
import RecipeCard from "./RecipeCard";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import { useRecipeList } from "@/hooks/useRecipeList";

export default function ShortsContainer() {
  const { recipes, isLoading, isLoadingMore, hasMore, loadMore } =
    useRecipeList();
  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <EmptyState
        message="아직 만든 레시피가 없어요. 첫 레시피를 만들어보세요!"
        actionLabel="레시피 만들기"
        actionHref="/"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex h-[calc(100vh-8rem)] snap-y snap-mandatory flex-col gap-4 overflow-y-auto lg:h-[calc(100vh-5rem)]"
    >
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          data-recipe-card
          data-index={index}
          className="shrink-0 snap-start snap-always"
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
      {hasMore && (
        <div className="flex shrink-0 snap-start items-center justify-center py-8">
          {isLoadingMore ? (
            <LoadingSpinner />
          ) : (
            <Button variant="ghost" onClick={loadMore}>
              더 보기
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
