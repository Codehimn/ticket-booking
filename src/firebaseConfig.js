import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCqgqkVRwwts_7cVJfKxAyqfhrDZtrT08U",
    authDomain: "ticket-booking-a59f7.firebaseapp.com",
    projectId: "ticket-booking-a59f7",
    storageBucket: "ticket-booking-a59f7.appspot.com",
    messagingSenderId: "56543745425",
    appId: "1:56543745425:web:e3a212fe98c1d5931a3630"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
