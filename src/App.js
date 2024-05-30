import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reserva from './components/Reserva';
import Checkout from './components/Checkout';
import NavBar from './components/Navbar';
import Confirmacion from './components/Confirmacion';
import Home from './components/Home';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import { UserProvider } from './UserContext';

const App = () => {
    return (
        <React.StrictMode>
            <UserProvider>
                <AuthProvider>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/reserva" element={<Reserva />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/confirmacion" element={<Confirmacion />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </UserProvider>
        </React.StrictMode>
    );
};

export default App;
