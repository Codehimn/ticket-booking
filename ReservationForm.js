import React, { useState } from 'react';

const ReservationForm = ({ event, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, eventId: event.id });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reservar entrada para {event.name}</h2>
            <label>
                Nombre:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit">Reservar</button>
        </form>
    );
};

export default ReservationForm;
