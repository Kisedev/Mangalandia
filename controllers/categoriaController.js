var Categoria = require('../models/categoria');

exports.cat_list = function(req, res) {
    res.send('DX O HOMEM TRABAIA: lista de generos');
};

exports.cat_info = function(req, res) {
    res.send('DX O HOMEM TRABAIA: detalhes da categoria : ' + req.params.id);
};

exports.cat_add_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: criar categoria GET');
};

exports.cat_add_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: criar categoria POST');
};

exports.cat_rm_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: remover categoria GET');
};

exports.cat_rm_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: remover categoria POST');
};

exports.cat_att_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar categoria GET');
};

exports.cat_att_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar categoria POST');
};