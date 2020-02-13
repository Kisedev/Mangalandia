var mangacap = require('../models/mangacap');

// exibe lista com todos caps 
exports.mangacap_lista = function(req, res, next) {
    mangacap.find()
    .populate('manga')
    .exec((err, lista_capitulos) => {
        if (err) {return next(err)};
        res.render('capitulos', { title: 'Todos Capítulos', lista_capitulos});
    })
};

exports.mangacap_info = function(req, res) {
    mangacap.findById(req.params.id)
    .populate('manga')
    .exec((err, cap) => {
        // se der erro ao buscar
        if (err) {return next(err)};
        // se nao tiver encontrado ao ter buscado
        if (!cap) {
            var err = new Error('Capitulo nao encontrado');
            err.status = 404;
            return next(err);
        }
        // achou o cap
        res.render('capitulo', {title: cap.titulo, info: cap});
    })
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