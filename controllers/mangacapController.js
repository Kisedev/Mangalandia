var mangacap = require('../models/mangacap');
var manga = require('../models/manga');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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

exports.mangacap_add_get = function(req, res, next) {
    manga.find({}, 'titulo')
    .exec(function(err, mangas) {
        if (err) {next(err)}
        res.render('forms/capitulo', {title: 'Adicionar Capítulo', mangas_lista: mangas})
    })
}

exports.mangacap_add_post = [
    body('manga', 'Mangá é necessário').isLength({min: 1}).trim(),
    body('isbn', 'ISBN é necessário').isLength({min: 1}).trim(),
    body('num', 'Número do capítulo é necessário').isLength({min: 1}).trim(),
    body('lancamento', 'Data de lançamento inválida').optional({checkFalsy: true}).isISO8601(),

    sanitizeBody('manga').escape(),
    sanitizeBody('isbn').escape(),
    sanitizeBody('num').escape(),
    sanitizeBody('lancamento').toDate(),
    sanitizeBody('nome').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let cap = new mangacap({
            manga: req.body.manga,
            isbn: req.body.isbn,
            num: req.body.num,
            lancamento: req.body.lancamento,
            nome: req.body.nome
        });

        if(!errors.isEmpty()) {
            manga.find({}, 'titulo')
            .exec((err, mangas) => {
                if (err) {return next(err)}
                res.render('forms/capitulo', {title: 'Adicionar Mangá', mangas_lista: mangas, manga_selecionado: cap.manga._id, errors: errors.array(), capitulo: cap});
            });
            return;
        } else {
            cap.save(function(err) {
                if (err) {return next(err)}
                res.redirect(cap.url)
            });
        }
    }
]

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