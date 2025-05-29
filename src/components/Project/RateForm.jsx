export default function RateForm({ addRate }) {
    return (
        <form className="rate-form">
            <label htmlFor="rate">Stawka</label>
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