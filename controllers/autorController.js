var Autor = require('../models/autor');

exports.autor_lista = function(req, res) {
    res.send('DX O HOMEM TRABAIA: lista de autores');
};

// Pagina do autor
exports.autor_info = function(req, res) {
    res.send('DX O HOMEM TRABAIA: detalhes do autor : ' + req.params.id);
};

// Exibe form de criar autor via GET
exports.autor_add_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: criar autor GET');
};

exports.autor_add_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: criar autor POST');
};

// Exibe form p deletar autor GET
exports.autor_rm_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: remover autor GET');
};

exports.autor_rm_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: remover autor POST');
};

// Exibe form atualizar autor por GET
exports.autor_att_get = function(req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar autor GET');
};

// Atualiza por POST
exports.autor_att_post = function(req, res) {
    res.send('DX O HOMEM TRABAIA: atualizar autor POST');
};