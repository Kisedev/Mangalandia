var manga = require('../models/manga');
var mangacap = require('../models/mangacap');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// exibe lista com todos caps 
exports.mangacap_lista = function(req, res, next) {
    manga.findById(req.params.manga_id)
    .populate('capitulo')
    .exec((err, manga) => {
        if (err) {return next(err)};
        res.render('capitulos', { title: 'Todos Capítulos', manga});
    })
};

exports.mangacap_info = function(req, res) {
    // encontra capitulo diretamente e preenche dados do manga 
    mangacap.findById(req.params.id)
    .populate('manga')
    .exec((err, cap) => {
        // se der erro ao buscar
        if (err) {return next(err)};
        // se nao tiver encontrado ao ter buscado
        if (!cap) {
            var err = new Error('Capítulo não encontrado');
            err.status = 404;
            return next(err);
        }
        // achou o cap
        res.render('capitulo', {title: cap.titulo, capitulo: cap});
    })
}

exports.mangacap_add_get = function(req, res, next) {
    manga.findById(req.params.manga_id)
    .exec(function(err, manga) {
        if (err) {next(err)}
        res.render('forms/capitulo', {title: 'Adicionar Capítulo', manga})
    })
}

exports.mangacap_add_post = [
    body('isbn', 'ISBN é necessário').isLength({min: 1}).trim(),
    body('num', 'Número do capítulo é necessário').isLength({min: 1}).trim(),
    body('lancamento', 'Data de lançamento inválida').optional({checkFalsy: true}).isISO8601(),

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
            manga.findById(req.body.manga)
            .exec((err, manga) => {
                if (err) {return next(err)}
                res.render('forms/capitulo', {title: 'Adicionar Mangá', errors: errors.array(), manga, capitulo: manga.capitulo});
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

exports.mangacap_rm_get = function(req, res, next) {
    mangacap.findById(req.params.id)
    .populate('manga')
    .exec((err, cap) => {
        if (err) {return next(err)}
        if(!cap) {
            res.redirect(`/catalogo/manga/${req.params.manga_id}/capitulos`)
        }

        res.render('forms/capitulo_rm', {title: 'Remover Capítulo', cap})
    })
}

exports.mangacap_rm_post = function(req, res, next) {
    mangacap.findById(req.body.cap_id)
    .populate('manga')
    .exec((err, cap) => {
        if(err) {return next(err)}
        mangacap.findByIdAndRemove(req.body.cap_id, function removerCap(err) {
            if(err) {return next(err)}
            res.redirect(`/catalogo/manga/${req.params.manga_id}/capitulos`)
        })
    })
}

exports.mangacap_att_get = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: atualizar capítulo por GET');
}

exports.mangacap_att_post = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: atualizar capítulo por POST');
}