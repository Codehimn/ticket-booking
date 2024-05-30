import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';
import 'bootstrap/dist/css/bootstrap.min.css';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartDetails, clearCart } = useShoppingCart();
    const { reservas } = location.state || {};

    const regresarAReservas = () => {
        navigate('/reserva');
    };

    if (!reservas) {
        return <div className="container mt-5 alert alert-warning">No hay reservas seleccionadas.</div>;
    }

    const totalPrecio = Object.values(cartDetails).reduce((total, reserva) => total + reserva.price * reserva.quantity, 0);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Resumen de Reservas</h2>
                </div>
                <div className="card-body">
                    {Object.values(cartDetails).map((reserva) => (
                        <div key={reserva.id} className="mb-3">
                            <h3>{reserva.name}</h3>
                            <p>Precio: {reserva.price} COP</p>
                            <p>Cantidad: {reserva.quantity}</p>
                            <p>Establecimiento: {reserva.establecimiento}</p>
                        </div>
                    ))}
                    <h3>Total a pagar: {totalPrecio} COP</h3>
                </div>
                <div className="card-footer">
                    <button className="btn btn-secondary me-2" onClick={regresarAReservas}>Cancelar y regresar</button>
                    <button className="btn btn-danger" onClick={clearCart}>Vaciar Carrito</button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
