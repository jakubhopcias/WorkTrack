export default function AddFormModal({ setName, closeModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Dodaj krok</h2>
                <label htmlFor="name">Nazwa</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Nazwa"
                    className="step-input"
                    onChange={(e) => setName(e.target.value)}/>
                <button className="btn" onClick={closeModal=true}>Zamknij</button>
            </div>
        </div>
    );
}