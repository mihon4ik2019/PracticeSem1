const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.FRONTEND_PORT || 3000;

// Раздача статических файлов
app.use(express.static(path.join(__dirname)));

// Все запросы перенаправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});