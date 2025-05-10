export default function RateForm({addRate}) {
    return (
        <form className="rate-form">
            <label htmlFor="rate">Stawka</label>
            <input
                type="number"
                id="rate"
                placeholder="Stawka"
                onChange={(e) => addRate(e.target.value)}
            />
        </form>
    );
}