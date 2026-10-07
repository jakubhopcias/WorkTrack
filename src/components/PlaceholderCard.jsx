export default function PlaceholderCard() {
  return (
    <div className="panel overflow-hidden">
      <div className="animate-pulse p-5">
        <div className="h-6 w-2/3 rounded-md bg-[var(--surface-2)]" />
        <div className="mt-6 flex gap-6">
          <div className="h-8 w-24 rounded-md bg-[var(--surface-2)]" />
          <div className="h-8 w-24 rounded-md bg-[var(--surface-2)]" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-4">
          <div className="h-10 rounded-md bg-[var(--surface-2)]" />
          <div className="h-10 rounded-md bg-[var(--surface-2)]" />
          <div className="h-10 rounded-md bg-[var(--surface-2)]" />
        </div>
      </div>
    </div>
  );
}
