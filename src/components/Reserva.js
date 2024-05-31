import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reserva.css';

function Reserva() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [counts, setCounts] = useState({});
    const [eventos, setEventos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [establecimientoNombre, setEstablecimientoNombre] = useState('');
    const { addItem, removeItem, cartDetails } = useShoppingCart();

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/config.json');
                const config = await response.json();
                setEstablecimientoNombre(config.establecimiento_nombre);
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        const fetchEventos = async () => {
            if (establecimientoNombre) {
                try {
                    const response = await axios.get('http://localhost:8000/api/entradas/por_establecimiento/', {
                        params: { nombre: establecimientoNombre }
                    });
                    setEventos(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchEventos();
    }, [establecimientoNombre]);

    useEffect(() => {
        const storedCounts = JSON.parse(localStorage.getItem('counts')) || {};
        setCounts(storedCounts);
    }, []);

    useEffect(() => {
        localStorage.setItem('counts', JSON.stringify(counts));
    }, [counts]);

    const agregarReserva = (evento) => {
        const eventoCount = counts[evento.id] || 0;

        if (eventoCount < evento.max_entradas) {
            const updatedCounts = {
                ...counts,
                [evento.id]: eventoCount + 1,
            };
            setCounts(updatedCounts);
            addItem({
                id: evento.id,
                name: evento.nombre,
                price: evento.precio,
                currency: 'COP',
                establecimiento: evento.establecimiento_nombre,
                quantity: eventoCount + 1,
            });
            toast.success(`Entrada para ${evento.nombre} agregada con éxito!`);
        } else {
            toast.error(`No puede agregar más de ${evento.max_entradas} entradas para este evento.`);
        }
    };

    const eliminarReserva = (evento) => {
        const eventoCount = counts[evento.id] || 0;
        if (eventoCount > 0) {
            const updatedCounts = {
                ...counts,
                [evento.id]: eventoCount - 1,
            };
            setCounts(updatedCounts);
            removeItem(evento.id);
            toast.info(`Entrada para ${evento.nombre} eliminada.`);
        }
    };

    const procederAlCheckout = () => {
        if (!isAuthenticated || !user || !user.email) {
            toast.warn('Debe iniciar sesión antes de proceder al checkout.');
            return;
        }

        if (Object.keys(cartDetails).length > 0) {
            navigate('/checkout', { state: { reservas: counts, email: user.email } });
        } else {
            toast.warn('Por favor, agregue al menos una reserva antes de proceder.');
        }
    };

    const totalEntradas = Object.values(counts).reduce((a, b) => a + b, 0);

    const filteredEventos = eventos.filter((evento) =>
        evento.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Seleccione un Evento</h2>
            <input
                type="text"
                placeholder="Buscar eventos..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredEventos.map((evento) => (
                <div key={evento.id} className="event-item card p-3 mb-3 shadow-sm">
                    {evento.imagen_url && (
                        <div className="event-image-container">
                            <img src={evento.imagen_url} alt={evento.nombre} className="img-fluid rounded" />
                        </div>
                    )}
                    <div className="event-details">
                        <h3>{evento.nombre}</h3>
                        <p>{evento.descripcion}</p>
                        <p><strong>Precio:</strong> {evento.precio} COP</p>
                        <p><strong>Cantidad:</strong> {counts[evento.id] || 0}</p>
                        <p><strong>Establecimiento:</strong> {evento.establecimiento_nombre}</p>
                        <button className="btn btn-success me-2" onClick={() => agregarReserva(evento)}>
                            Agregar Entrada
                        </button>
                        <button className="btn btn-danger" onClick={() => eliminarReserva(evento)}>
                            Eliminar Entrada
                        </button>
                    </div>
                </div>
            ))}
            <h3>Total de entradas: {totalEntradas}</h3>
            <button className="btn btn-primary" onClick={procederAlCheckout}>Proceder al Checkout</button>
        </div>
    );
}

export default Reserva;
