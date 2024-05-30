import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Asegúrate de importar correctamente
import { onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged de Firebase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
        const storedUser = localStorage.getItem('user');
        return !!storedUser; // Devuelve true si hay un usuario almacenado
    });

    const login = (user) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
        auth.signOut(); // Cierra la sesión en Firebase
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { email } = currentUser;
                const user = { email };
                setUser(user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
