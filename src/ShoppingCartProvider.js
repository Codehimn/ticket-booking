import React from 'react';
import { CartProvider } from 'use-shopping-cart';

const ShoppingCartProvider = ({ children }) => (
    <CartProvider
        mode="client" // Opcional, depende de tu configuración
    // Agrega cualquier otra configuración necesaria aquí
    >
        {children}
    </CartProvider>
);

export default ShoppingCartProvider;
