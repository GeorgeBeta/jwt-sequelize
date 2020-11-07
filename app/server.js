const express = require('express');
const app = express();

// Settings
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes'));

// Arranque del servidor
app.listen(PORT, () => {
    console.log(`El servidor ha arrancado en: http://localhost:${PORT}`);
})