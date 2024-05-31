// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // O el puerto que prefieras

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Aquí deberías verificar el token, por ejemplo, usando JWT
    try {
        const decoded = verifyToken(token); // Implementa esta función según tu lógica de autenticación
        req.user = decoded; // Adjunta la información del usuario al objeto `req`
        next(); // El token es válido, continúa con la siguiente función
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Ruta protegida que realiza la solicitud a la API de Django
app.get('/api/eventos', authMiddleware, async (req, res) => {
    const { nombre } = req.query;

    try {
        const response = await axios.get('http://localhost:8000/api/entradas/por_establecimiento/', {
            params: { nombre }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Función de verificación de token (deberías implementarla)
function verifyToken(token) {
    // Implementa la lógica de verificación de tu token aquí
    // Por ejemplo, decodifica el token y verifica su validez
    return { userId: 1 }; // Ejemplo de objeto decodificado
}
