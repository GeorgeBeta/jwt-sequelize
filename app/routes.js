const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('./controllers/AuthController');

// Home
router.get('/', (req, res) => {
    res.json({
        message: 'Hola mundo ya estoy aquí'
    });
});

// Rutas: Login y Register
// api/signin & api/signup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

module.exports = router;