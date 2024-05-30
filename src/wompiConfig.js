const axios = require('axios');

const wompiApi = axios.create({
    baseURL: 'https://sandbox.wompi.co/v1',
    headers: {
        'Authorization': `Bearer YOUR_PUBLIC_KEY`
    }
});

module.exports = wompiApi;
