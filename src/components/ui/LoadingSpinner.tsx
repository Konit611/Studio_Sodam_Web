interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const SIZE_STYLES = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  return (
    <div
      className={`${SIZE_STYLES[size]} animate-spin rounded-full border-2 border-border border-t-primary`}
      role="status"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
}
