export default function Stat({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="small">{label}</p>
      <p className="mt-1 text-sm font-medium leading-tight tabular-nums">{value}</p>
    </div>
  );
}
