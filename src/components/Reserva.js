import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reserva.css';

function Reserva() {
    const navigate = useNavigate();
    const { user, isAuthenticated, token } = useAuth();
    const [eventos, setEventos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [establecimientoNombre, setEstablecimientoNombre] = useState('');

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
            if (establecimientoNombre && token) {
                try {
                    const response = await axios.get('/api/entradas', {
                        params: { nombre: establecimientoNombre },
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setEventos(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchEventos();
    }, [establecimientoNombre, token]);

    const procederAlCheckout = (evento) => {
        if (!isAuthenticated || !user || !user.email) {
            toast.warn('Debe iniciar sesión antes de proceder al checkout.');
            return;
        }

        navigate('/checkout', { state: { evento, email: user.email } });
    };

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
                <div
                    key={evento.id}
                    className="event-item card p-3 mb-3 shadow-sm"
                    onClick={() => procederAlCheckout(evento)}
                >
                    <div className="event-date">
                        <p>{new Date(evento.fecha).toLocaleDateString()}</p>
                        <p>{new Date(evento.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    {evento.imagen_url && (
                        <div className="event-image-container">
                            <img src={evento.imagen_url} alt={evento.nombre} className="img-fluid rounded" />
                        </div>
                    )}
                    <div className="event-details">
                        <h3>{evento.nombre}</h3>
                        <p>{evento.descripcion}</p>
                        <p><strong>Precio:</strong> {evento.precio} COP</p>
                        <p><strong>Establecimiento:</strong> {evento.establecimiento_nombre}</p>
                        <button className="btn btn-primary">Siguiente</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Reserva;
