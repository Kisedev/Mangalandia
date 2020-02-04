var Categoria = require('../models/categoria');

exports.categoria_lista = function(req, res) {
    res.send('DX O HOMEM TRABAIA: lista de categorias');
};

exports.categoria_info = function(req, res) {
    res.send('DX O HOMEM TRABAIA: detalhes da categoria : ' + req.params.id);
};

exports.categoria_add_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: criar categoria GET');
};

exports.categoria_add_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: criar categoria POST');
};

exports.categoria_rm_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: remover categoria GET');
};

exports.categoria_rm_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: remover categoria POST');
};

exports.categoria_att_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar categoria GET');
};

exports.categoria_att_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar categoria POST');
};