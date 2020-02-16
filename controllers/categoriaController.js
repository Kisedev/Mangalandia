var categoria = require('../models/categoria');
const validator = require('express-validator');

exports.categoria_lista = function (req, res) {
    categoria.find({})
        .exec((err, result) => {
            if (err) { return next(err) };
            res.render('categorias', { title: 'Categorias & Gêneros', categorias: result })
        })
};

exports.categoria_info = function (req, res) {
    res.send('DX O HOMEM TRABAIA: detalhes da categoria : ' + req.params.id);
};

exports.categoria_add_get = function (req, res) {
    res.render('forms/categoria', { title: 'Adicionar Categoria' })
};

exports.categoria_add_post = [
    // lista de middlewares para executar assicronamente
    validator.body('nome', 'O Nome deve ter pelo menos 3 caracteres').isLength({ min: 3 }).trim(),
    // valida campo nome do form
    validator.sanitizeBody('nome').escape(),
    // anti cross script attack de tags html ou cod js 
    (req, res, next) => {
        const errors = validator.validationResult(req);

        let cat = new categoria(
            { nome: req.body.nome }
        );

        if (!errors.isEmpty()) {
            // ha erros ent renderiza novamente com os dados e alerta 
            res.render('forms/categoria', { title: 'Adicionar Categoria', categoria: cat, errors: errors.array() });
            return;
        } else {
            // os dados estao corretos
            categoria.findOne({ nome: req.body.nome })
                .exec((err, cat_encontrada) => {
                    if (err) { return next(err) };

                    if (cat_encontrada) {
                        // vai pra pagina do genero que ja existia 
                        res.redirect(cat_encontrada.url);
                    } else {
                        cat.save(function (err) {
                            if (err) { return next(err) };
                            // salvou vai pra pagina
                            res.redirect(cat.url);
                        });
                    }
                })
        }
    }
];


exports.categoria_rm_get = function (req, res) {
    res.send('DX O HOMEM TRABAIA: remover categoria GET');
};

exports.categoria_rm_post = function (req, res) {
    res.send('DX O HOMEM TRABAIA: remover categoria POST');
};

exports.categoria_att_get = function (req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar categoria GET');
};

exports.categoria_att_post = function (req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar categoria POST');
};