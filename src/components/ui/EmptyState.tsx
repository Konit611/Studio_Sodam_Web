import Link from "next/link";
import Button from "./Button";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  message,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-text-secondary">{message}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-4">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
