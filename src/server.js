const express = require('express');
const wompiApi = require('./wompiConfig');

const app = express();
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
    const { reservas, email } = req.body;

    const transaction = {
        acceptance_token: 'YOUR_ACCEPTANCE_TOKEN',
        amount_in_cents: 100000,
        currency: 'COP',
        customer_email: email,
        payment_method: {
            type: 'CARD',
            token: 'YOUR_CARD_TOKEN'
        },
        reference: `order-${Date.now()}`
    };

    try {
        const response = await wompiApi.post('/transactions', transaction);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
