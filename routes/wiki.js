var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Wikipedia ata');
});

router.get('/sobre', (req, res) => {
    res.send('Sobre isso aqui...');
});

module.exports = router;