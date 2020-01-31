var manga = require('../models/manga');

exports.index = function(req, res) {
    res.send('TAMO TRABALHANDO AINDA: Casa do Mangá');
}

exports.manga_list = function(req, res) {
    res.send('TAMO TRABALHANDO MEU CONSAGRADO: lista de mangás');
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