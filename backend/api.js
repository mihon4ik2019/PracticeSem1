require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;
const DATA_FILE = path.join(__dirname, process.env.DATA_FILE || 'products.json');

app.use(cors());
app.use(express.json());

// Routes
app.get('/products', (req, res) => {
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.json(JSON.parse(data));
  });
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const products = JSON.parse(data);
    products.push(newProduct);
    fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.status(201).send('Product added');
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});