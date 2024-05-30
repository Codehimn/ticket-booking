import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiar de 'react-dom' a 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <UserProvider>
                {/* <BrowserRouter> */}
                    <App />
                {/* </BrowserRouter> */}
        </UserProvider>
    </React.StrictMode>
);
