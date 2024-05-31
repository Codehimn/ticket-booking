import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { evento, email } = state;
    const { addItem } = useShoppingCart();
    const [cantidad, setCantidad] = useState(1);

    const handleCantidadChange = (newCantidad) => {
        if (newCantidad >= 1 && newCantidad <= evento.max_entradas) {
            setCantidad(newCantidad);
        }
    };

    const agregarReserva = () => {
        if (cantidad <= 0) {
            toast.error('La cantidad debe ser mayor a 0.');
            return;
        }

        addItem({
            id: evento.id,
            name: evento.nombre,
            price: evento.precio,
            currency: 'COP',
            establecimiento: evento.establecimiento_nombre,
            quantity: cantidad,
        });

        toast.success(`Se han agregado ${cantidad} entradas para ${evento.nombre}.`);
        navigate('/');
    };

    return (
        <div className="container mt-5 checkout-container">
            <h2>Checkout</h2>
            <div className="card p-3 mb-3 shadow-sm checkout-card">
                {evento.imagen_url && (
                    <div className="event-image-container mb-3">
                        <img src={evento.imagen_url} alt={evento.nombre} className="img-fluid rounded" />
                    </div>
                )}
                <h3>{evento.nombre}</h3>
                <p>{evento.descripcion}</p>
                <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()}</p>
                <p><strong>Precio:</strong> {evento.precio} COP</p>
                <p><strong>Establecimiento:</strong> {evento.establecimiento_nombre}</p>
                <div className="form-group cantidad-container">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <div className="input-group">
                        <button
                            className="btn btn-outline-secondary decrement-btn"
                            type="button"
                            onClick={() => handleCantidadChange(cantidad - 1)}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            id="cantidad"
                            className="form-control text-center cantidad-input"
                            value={cantidad}
                            onChange={(e) => handleCantidadChange(Number(e.target.value))}
                            min="1"
                            max={evento.max_entradas}
                        />
                        <button
                            className="btn btn-outline-secondary increment-btn"
                            type="button"
                            onClick={() => handleCantidadChange(cantidad + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <button className="btn btn-primary mt-3 confirmar-btn" onClick={agregarReserva}>
                    Confirmar Reserva
                </button>
            </div>
        </div>
    );
}

export default Checkout;
