import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Confirmation = ({ reservation }) => (
    <div className="container mt-5 alert alert-success">
        <h2 className="text-success">Reserva confirmada</h2>
        <p><strong>Nombre:</strong> {reservation.name}</p>
        <p><strong>Email:</strong> {reservation.email}</p>
        <p><strong>Evento:</strong> {reservation.eventName}</p>
    </div>
);
export default Confirmation;
