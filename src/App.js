import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reserva from './components/Reserva';
import Checkout from './components/Checkout';
import NavBar from './components/Navbar';
import Confirmacion from './components/Confirmacion';
import Home from './components/Home';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import { CartProvider } from 'use-shopping-cart'; // Importa CartProvider
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente de ruta protegida

const App = () => {
    return (
        <React.StrictMode>
                <AuthProvider>
                    <CartProvider>
                        <Router>
                            <NavBar />
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/reserva" element={<ProtectedRoute><Reserva /></ProtectedRoute>} />
                                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                                <Route path="/confirmacion" element={<ProtectedRoute><Confirmacion /></ProtectedRoute>} />
                            </Routes>
                        </Router>
                    </CartProvider>
                </AuthProvider>
        </React.StrictMode>
    );
};

export default App;
