import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, get, set, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCqgqkVRwwts_7cVJfKxAyqfhrDZtrT08U",
    authDomain: "ticket-booking-a59f7.firebaseapp.com",
    projectId: "ticket-booking-a59f7",
    storageBucket: "ticket-booking-a59f7.appspot.com",
    messagingSenderId: "56543745425",
    appId: "1:56543745425:web:e3a212fe98c1d5931a3630",
    databaseURL: "https://ticket-booking-a59f7-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup, db, ref, get, set, update };
