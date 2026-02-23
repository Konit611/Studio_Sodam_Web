"use client";

import Button from "@/components/ui/Button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-bold text-text-primary">
        문제가 발생했습니다
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        잠시 후 다시 시도해주세요
      </p>
      <Button onClick={reset} className="mt-6">
        다시 시도
      </Button>
    </div>
  );
}
