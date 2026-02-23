import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function GlobalLoading() {
  return (
    <div className="flex items-center justify-center py-16">
      <LoadingSpinner size="lg" />
    </div>
  );
}
