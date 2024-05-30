import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservationForm = ({ event, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, eventId: event.id, quantity });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h2>Reservar entrada para {event.name}</h2>
            <div className="form-group">
                <label>Nombre:</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Cantidad:</label>
                <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                    max={event.maxTickets}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Reservar</button>
        </form>
    );
};

export default ReservationForm;
