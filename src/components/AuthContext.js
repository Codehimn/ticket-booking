import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de importar correctamente
import { onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged de Firebase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (user) => {
        setIsAuthenticated(true);
        setUser(user);
        const token = await user.getIdToken(); // Obtener el token de Firebase
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        auth.signOut(); // Cierra la sesión en Firebase
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken();
                setUser(currentUser);
                setToken(token);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(currentUser));
                localStorage.setItem('token', token);
            } else {
                setUser(null);
                setToken(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
