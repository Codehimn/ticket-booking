import React from 'react';

const Confirmation = ({ reservation }) => (
    <div>
        <h2>Reserva confirmada</h2>
        <p>Nombre: {reservation.name}</p>
        <p>Email: {reservation.email}</p>
        <p>Evento: {reservation.eventName}</p>
    </div>
);

export default Confirmation;
