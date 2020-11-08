const express = require('express');
const app = express();
const { sequelize } = require('./models/index');

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
    // sequelize.sync({ force: true }).then(() => {
    sequelize.authenticate().then(() => {
        console.log('Nos hemos conectado a la base de datos');
    })
});