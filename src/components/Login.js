import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const Login = () => {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/reserva');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="card p-4">
                <h2 className="mb-4">Login</h2>
                <button type="submit" className="btn btn-primary btn-block">Login with Google</button>
            </form>
        </div>
    );
};

export default Login;
