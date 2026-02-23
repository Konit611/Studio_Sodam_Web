"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function GeneratingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-lg font-medium text-text-primary">
        AI가 레시피를 구상하고 있어요...
      </p>
      <p className="mt-1 text-sm text-text-secondary">
        잠시만 기다려주세요
      </p>
    </div>
  );
}
