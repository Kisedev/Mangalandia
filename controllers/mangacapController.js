var mangacap = require('../models/mangacap');

// exibe lista com todos caps 
exports.mangacap_lista = function(req, res, next) {
    mangacap.find()
    .populate('manga')
    .exec((err, lista_capitulos) => {
        if (err) {return next(err)};
        res.render('todos_capitulos', { title: 'Todos Capítulos', lista_capitulos});
    })
};

exports.mangacap_info = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: detalhes do capítulo: ' + req.params.id);
}

exports.mangacap_add_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: adicionar capítulo por GET');
}

exports.mangacap_add_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: adicionar capítulo por POST');
}

exports.mangacap_rm_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: remover capítulo por GET');
}

exports.mangacap_rm_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: remover capítulo por POST');
}

exports.mangacap_att_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: atualizar capítulo por GET');
}

exports.mangacap_att_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: atualizar capítulo por POST');
}