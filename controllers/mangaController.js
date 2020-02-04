var manga = require('../models/manga');
var autor = require('../models/autor');
var categoria = require('../models/categoria');
var mangacap = require('../models/mangacap');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        manga_count: function(callback) {
            manga.countDocuments({}, callback)
        },
        autor_count: function(callback) {
            autor.countDocuments({}, callback)
        },
        categoria_count: function(callback) {
            categoria.countDocuments({}, callback)
        },
        mangacap_count: function(callback) {
            mangacap.countDocuments({}, callback)
        }
    }, (err, results) => {
            res.render('index', {title: 'Mangalandia', error: err, data: results});
        }
    )
}

exports.manga_lista = function(req, res, next) {
    manga.find({}, 'titulo autor')
    .populate('autor')
    .exec((err, lista_mangas) => {
        if(err) {return next(err)}
        res.render('mangas', { title: 'Mangás', lista: lista_mangas });
    })
};

exports.manga_info = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: detalhes do mangá: ' + req.params.id);
}

exports.manga_add_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: adicionar mangá por GET');
}

exports.manga_add_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: adicionar mangá por POST');
}

exports.manga_rm_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: remover mangá por GET');
}

exports.manga_rm_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: remover mangá por POST');
}

exports.manga_att_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: atualizar mangá por GET');
}

exports.manga_att_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: atualizar mangá por POST');
}