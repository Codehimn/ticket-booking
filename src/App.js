import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reserva from './components/Reserva';
import Checkout from './components/Checkout';
import NavBar from './components/Navbar';
import Confirmacion from './components/Confirmacion';
import QRScanner from './components/qr/qr';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import { CartProvider } from 'use-shopping-cart';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <React.StrictMode>
            <ToastContainer />
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/reserva" element={<ProtectedRoute><Reserva /></ProtectedRoute>} />
                            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                            <Route path="/confirmacion" element={<ProtectedRoute><Confirmacion /></ProtectedRoute>} />
                            <Route path="/lecturaqr" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />
                        </Routes>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </React.StrictMode>
    );
};

export default App;
