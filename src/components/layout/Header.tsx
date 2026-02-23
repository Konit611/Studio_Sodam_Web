import DesktopNav from "./DesktopNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-center px-4 lg:justify-between">
        <h1 className="text-lg font-bold text-primary">Sodam Recipe</h1>
        <DesktopNav />
      </div>
    </header>
  );
}
