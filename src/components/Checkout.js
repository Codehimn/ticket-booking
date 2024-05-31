import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartDetails, clearCart } = useShoppingCart();
    const [reservas, setReservas] = useState(location.state?.reservas || {});
    const [email, setEmail] = useState(location.state?.email || '');

    useEffect(() => {
        const storedReservas = JSON.parse(localStorage.getItem('reservas'));
        if (storedReservas) {
            setReservas(storedReservas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('reservas', JSON.stringify(cartDetails));
    }, [cartDetails]);

    const regresarAReservas = () => {
        navigate('/reserva');
    };

    const finalizarCompra = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/confirmacion/', {
                reservas: reservas,
                email: email
            });

            if (response.data.success) {
                toast.success('Compra finalizada con éxito. Se ha enviado un correo de confirmación.');
                clearCart();
                localStorage.removeItem('reservas');
                navigate('/confirmacion');
            } else {
                toast.error('Hubo un problema al finalizar la compra.');
            }
        } catch (error) {
            console.error('Error finalizando la compra:', error);
            toast.error('Hubo un problema al finalizar la compra.');
        }
    };

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
                    <button className="btn btn-danger" onClick={() => {
                        clearCart();
                        localStorage.removeItem('reservas');
                        toast.info('Carrito vaciado.');
                    }}>Vaciar Carrito</button>
                    <button className="btn btn-success" onClick={finalizarCompra}>Finalizar Compra</button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
