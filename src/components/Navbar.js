import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Navbar, Nav } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Ticket Booking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isAuthenticated && (
                        <>
                            <Nav.Link as={Link} to="/reserva">Reservas</Nav.Link>
                            <Nav.Link as={Link} to="/lecturaqr">Lectura QR</Nav.Link>
                        </>
                    )}
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link onClick={toggleTheme}>
                        {theme === 'light' ? <FaSun /> : <FaMoon />}
                    </Nav.Link>
                    {isAuthenticated ? (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link as={Link} to="/">Login</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
