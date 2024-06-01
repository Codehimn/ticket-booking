import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithRedirect, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import styles from './Login.css';

const Login = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/reserva');
        }

        // Agregar listener para autenticación
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, 'users/' + user.uid);

                const snapshot = await get(userRef);
                if (!snapshot.exists()) {
                    await set(userRef, {
                        phoneNumber: ""
                    });
                }

                navigate('/reserva');
            }
        });

        return () => unsubscribe();
    }, [isAuthenticated, navigate, auth]);

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };

    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        try {
            const provider = new FacebookAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error('Error logging in with Facebook:', error);
        }
    };

    const handleAppleLogin = async (e) => {
        e.preventDefault();
        try {
            const provider = new OAuthProvider('apple.com');
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error('Error logging in with Apple:', error);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/reserva');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Crear una entrada para el usuario en la base de datos
            const db = getDatabase();
            await set(ref(db, 'users/' + user.uid), {
                phoneNumber: ""
            });

            navigate('/reserva');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button onClick={handleEmailLogin} className="btn btn-primary btn-block">Login</button>
                <button onClick={handleRegister} className="btn btn-secondary btn-block">Sign Up</button>
                <div className="text-center mt-3">Or login with:</div>
                <div className="d-grid gap-2">
                    <button onClick={handleGoogleLogin} className="btn btn-primary">Google</button>
                    <button disabled onClick={handleFacebookLogin} className="btn btn-primary">Facebook</button>
                    <button disabled onClick={handleAppleLogin} className="btn btn-primary">Apple</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
