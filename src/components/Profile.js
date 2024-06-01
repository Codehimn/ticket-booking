import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, ref, get, update } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setError("Usuario no autenticado.");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const userRef = ref(db, `users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setPhoneNumber(snapshot.val().phoneNumber || '');
                } else {
                    setError("Documento de usuario no encontrado.");
                    toast.error("Documento de usuario no encontrado.");
                }
            } catch (error) {
                setError("Error al obtener los datos del usuario: " + error.message);
                toast.error("Error al obtener los datos del usuario: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("Usuario no autenticado.");
            toast.error("Usuario no autenticado.");
            return;
        }

        try {
            const userRef = ref(db, `users/${user.uid}`);
            await update(userRef, { phoneNumber });
            setError(null);
            toast.success("Número de teléfono actualizado correctamente");
        } catch (error) {
            setError("Error al actualizar el número de teléfono: " + error.message);
            toast.error("Error al actualizar el número de teléfono: " + error.message);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profileContainer">
            <ToastContainer />
            <div className="profileCard">
                <h2 className="mb-4">Perfil</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Actualizar</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
