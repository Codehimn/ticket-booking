import React from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToReservations = () => {
    navigate('/reserva');
  };

  return (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={handleGoToReservations}>Go to Reservations</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
