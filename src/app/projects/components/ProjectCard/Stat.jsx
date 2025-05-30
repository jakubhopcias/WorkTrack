export default function Stat({iconPath, name, value}){
    return (
        <div className="flex flex-row gap-3 p-2 rounded-2xl bg-[var(--color-black)]">
            <img src={iconPath}/>
            <div className="flex flex-col">
                <p className="small text-[var(--color-light-gray)]">{name}</p>
                <h6 className="text-[var(--color-white)]">{value}</h6>
            </div>
        </div>
    )
}