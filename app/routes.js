const express = require('express');
const router = express.Router();

// Home
router.get('/', (req, res) => {
    res.json({
        message: 'Hola mundo ya estoy aquí'
    });
});

module.exports = router;