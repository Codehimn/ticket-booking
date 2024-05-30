import React, { useEffect } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            setUser(result.user);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEmailSignUp = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEmailLogin = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <button onClick={handleFacebookLogin}>Login with Facebook</button>
            <form onSubmit={(e) => { e.preventDefault(); handleEmailLogin(e.target.email.value, e.target.password.value); }}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login with Email</button>
            </form>
            <form onSubmit={(e) => { e.preventDefault(); handleEmailSignUp(e.target.email.value, e.target.password.value); }}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Sign Up with Email</button>
            </form>
        </div>
    );
}

export default Login;
