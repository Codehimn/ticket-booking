import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart, CartProvider } from 'use-shopping-cart';
import axios from 'axios';

function Reserva() {
    const { addItem, removeItem, clearCart, cartDetails } = useShoppingCart();
    const navigate = useNavigate();
    const [counts, setCounts] = useState({});
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/entradas/por_establecimiento/', {
                    params: { nombre: 'Establecimiento 1' }
                });
                setEventos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEventos();
    }, []);

    useEffect(() => {
        const storedCounts = localStorage.getItem('counts');
        if (storedCounts) {
            setCounts(JSON.parse(storedCounts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('counts', JSON.stringify(counts));
    }, [counts]);

    const agregarReserva = (evento) => {
        addItem({
            id: evento.id,
            name: evento.nombre,
            price: evento.precio,
            currency: 'COP',
            establecimiento: evento.establecimiento_nombre,
        });
        setCounts(prevCounts => ({
            ...prevCounts,
            [evento.id]: (prevCounts[evento.id] || 0) + 1
        }));
    };

    const eliminarReserva = (evento) => {
        removeItem(evento.id);
        setCounts(prevCounts => ({
            ...prevCounts,
            [evento.id]: (prevCounts[evento.id] || 1) - 1
        }));
    };

    const procederAlCheckout = () => {
        if (Object.keys(cartDetails).length > 0) {
            navigate('/checkout', { state: { reservas: cartDetails } });
        } else {
            alert('Por favor, agregue al menos una reserva antes de proceder.');
        }
    };

    const totalEntradas = Object.values(counts).reduce((a, b) => a + b, 0);

    return (
        <div>
            <h2>Seleccione un Evento</h2>
            {eventos.map((evento) => (
                <div key={evento.id} className="event-item">
                    <h3>{evento.nombre}</h3>
                    <p>Precio: {evento.precio} COP</p>
                    <p>Fecha: {evento.fecha}</p>
                    <p>Establecimiento: {evento.establecimiento_nombre}</p>
                    <button onClick={() => agregarReserva(evento)}>Agregar una entrada</button>
                    <button onClick={() => eliminarReserva(evento)}>Eliminar una entrada</button>
                    <p>Cantidad seleccionada: {counts[evento.id] || 0}</p>
                </div>
            ))}
            <h3>Total entradas: {totalEntradas}</h3>
            <button onClick={procederAlCheckout}>Proceder al Checkout</button>
            <button onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                    clearCart();
                    setCounts({});
                }
            }}>Vaciar Carrito</button>
        </div>
    );
}

const WrappedReserva = () => (
    <CartProvider>
        <Reserva />
    </CartProvider>
);

export default WrappedReserva;