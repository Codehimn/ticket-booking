import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
