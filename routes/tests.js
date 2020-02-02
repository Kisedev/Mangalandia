var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('test', {title: 'Testando a testa'});
})

module.exports = router;