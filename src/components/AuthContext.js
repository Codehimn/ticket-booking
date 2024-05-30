import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de importar correctamente

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return !!storedUser; // Devuelve true si hay un usuario almacenado
    });

    const login = (user) => {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        auth.signOut(); // Cierra la sesión en Firebase
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
