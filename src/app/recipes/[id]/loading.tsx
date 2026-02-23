export default function RecipeDetailLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-4 w-12 rounded bg-border" />
        <div className="h-8 w-8 rounded bg-border" />
      </div>

      <div className="space-y-3">
        <div className="h-7 w-3/4 rounded bg-border" />
        <div className="h-4 w-full rounded bg-border" />
      </div>

      <div className="flex gap-2">
        <div className="h-5 w-12 rounded bg-border" />
        <div className="h-5 w-12 rounded bg-border" />
        <div className="h-5 w-16 rounded bg-border" />
      </div>

      <div className="space-y-3">
        <div className="h-5 w-16 rounded bg-border" />
        <div className="h-4 w-48 rounded bg-border" />
        <div className="h-4 w-40 rounded bg-border" />
        <div className="h-4 w-44 rounded bg-border" />
      </div>

      <div className="space-y-4">
        <div className="h-5 w-20 rounded bg-border" />
        <div className="flex gap-3">
          <div className="h-6 w-6 shrink-0 rounded-full bg-border" />
          <div className="h-4 w-full rounded bg-border" />
        </div>
        <div className="flex gap-3">
          <div className="h-6 w-6 shrink-0 rounded-full bg-border" />
          <div className="h-4 w-full rounded bg-border" />
        </div>
        <div className="flex gap-3">
          <div className="h-6 w-6 shrink-0 rounded-full bg-border" />
          <div className="h-4 w-3/4 rounded bg-border" />
        </div>
      </div>
    </div>
  );
}
