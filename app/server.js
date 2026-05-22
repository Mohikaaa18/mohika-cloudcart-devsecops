const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("CloudCart DevSecOps Pipeline Running");
});

app.get('/health', (req, res) => {
    res.json({
        status: "UP",
        environment: process.env.ENV || "dev"
    });
});

app.get('/version', (req, res) => {
    res.json({
        version: "1.0.0"
    });
});

const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});