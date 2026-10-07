export default function SideWrapper({ heading, text }) {
  return (
    <aside className="hidden p-4 md:block">
      <div className="flex h-full min-h-[calc(100dvh-2rem)] flex-col justify-between rounded-[1.4rem] bg-[var(--accent)] p-10 text-[var(--accent-fg)]">
        <p className="text-sm font-semibold tracking-tight">WorkTrack</p>
        <div>
          <h2 className="max-w-[14ch] text-4xl leading-[1.05] xl:text-5xl">{heading}</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-70">{text}</p>
        </div>
      </div>
    </aside>
  );
}
