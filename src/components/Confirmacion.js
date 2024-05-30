import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const Confirmacion = () => {
    const location = useLocation();
    const { reservas, email } = location.state || {}; // Obtener los detalles de la reserva y el email del usuario

    if (!reservas || !email) {
        return (
            <div className="container mt-5 alert alert-danger">
                <h2 className="text-danger">Error</h2>
                <p>No se encontraron detalles de la reserva.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 alert alert-success">
            <h2 className="text-success">Reserva confirmada</h2>
            <p><strong>Email:</strong> {email}</p>
            <h3>Detalles de la reserva:</h3>
            {Object.values(reservas).map((reserva, index) => (
                <div key={index} className="mb-3">
                    <p><strong>Nombre:</strong> {reserva.name}</p>
                    <p><strong>Evento:</strong> {reserva.establecimiento}</p>
                    <p><strong>Precio:</strong> {reserva.price} COP</p>
                </div>
            ))}
        </div>
    );
};

export default Confirmacion;
