export default function Stat({ iconPath, name, value }) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-2xl w-full">
      <p className="small text-[var(--color-dark-gray)]">{name}</p>
      <div className="flex flex-row items-center gap-3">
        <img className="w-7" src={iconPath} alt={`${name} icon`} />
        <h6 className="text-[var(--color-black)]">{value}</h6>
      </div>
    </div>
  );
}
