import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { reservas } = location.state || {};
    const { clearCart } = useShoppingCart();

    const regresarAReservas = () => {
        navigate('/reserva');
    };

    if (!reservas) {
        return <div>No hay reservas seleccionadas.</div>;
    }

    const totalPrecio = Object.values(reservas).reduce((total, reserva) => total + reserva.price * reserva.quantity, 0);

    return (
        <div>
            <h2>Resumen de Reservas</h2>
            {Object.values(reservas).map((reserva) => (
                <div key={reserva.id}>
                    <h3>{reserva.name}</h3>
                    <p>Precio: {reserva.price} COP</p>
                    <p>Cantidad: {reserva.quantity}</p>
                    <p>Establecimiento: {reserva.establecimiento}</p>
                </div>
            ))}
            <h3>Total a pagar: {totalPrecio} COP</h3>
            <button onClick={regresarAReservas}>Cancelar y regresar</button>
        </div>
    );
}

export default Checkout;
