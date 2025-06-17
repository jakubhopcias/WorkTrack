export default function RateForm({ addRate }) {
    return (
        <form className="flex flex-col gap-2">
            <label htmlFor="rate">Ustal inną stawkę</label>
            <input
                type="number"
                id="rate"
                placeholder="Stawka"
                onChange={(e) => {
                    const value = Math.max(0, e.target.value); 
                    addRate(value);
                }}
            />
        </form>
    );
}