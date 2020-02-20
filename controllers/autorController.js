var autor = require("../models/autor");
var manga = require("../models/manga");

const async = require('async');
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.autor_lista = function(req, res) {
  autor
    .find({})
    .populate('autor')
    .sort([['sobrenome', 'ascending']])
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      res.render("autores", { title: "Mangakás", autores: result });
    });
};

// Pagina do autor
exports.autor_info = function(req, res) {
  async.parallel({
    autor: function(callback) {
      autor.findById(req.params.id).exec(callback);
    },
    autor_mangas: function(callback) {
      manga.find({ 'autor': req.params.id }, "titulo sumario").exec(callback);
    }
  }, function(err, results) {
      if (err) {next(err)};
      if (!results.autor) {
          var err = new Error('Mangaká não encontrado');
          err.status = 404;
          return next(err);
      }
      res.render('autor', {title: 'Detalhes do Autor', autor: results.autor, autor_mangas: results.autor_mangas});
  }
  );
};

// Exibe form de criar autor via GET
exports.autor_add_get = function(req, res) {
  res.render('forms/autor', {title: 'Adicionar Mangaká'});
};

exports.autor_add_post = [
  body('primeiro_nome').isLength({min: 3, max: 100}).trim().withMessage('Primeiro nome necessário (max 100 letras)')
  .isAlphanumeric().withMessage('Não deve conter números'),
  body('sobrenome').isLength({min: 3, max: 100}).trim().withMessage('Sobrenome é necessário (max 100 letras)')
  .isAlphanumeric().withMessage('Não deve conter números'),
  body('nascimento', 'Data de nascimento incorreta').optional({ checkFalsy: true }).isISO8601(),
  body('falecimento', 'Data de falecimento incorreta').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('primeiro_nome').escape(),
  sanitizeBody('sobrenome').escape(),
  sanitizeBody('nascimento').toDate(),
  sanitizeBody('falecimento').toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('forms/autor', {title: 'Adicionar Mangaká', autor: req.body, errors: errors.array()});
      return;
    } else {
      let mgk = new autor({
        primeiro_nome: req.body.primeiro_nome,
        sobrenome: req.body.sobrenome,
        nascimento: req.body.nascimento,
        falecimento: req.body.falecimento
      });
      mgk.save(function(err) {
        if (err){ return next(err)}
        res.redirect(mgk.url)
      });
    }
  }
];

// Exibe form p deletar autor GET
exports.autor_rm_get = function(req, res, next) {
  async.parallel({
    autor: function(callback) {
      autor.findById(req.params.id)
      .exec(callback);
    },
    autor_mangas: function(callback) {
      manga.find({autor: req.params.id})
      .exec(callback);
    }
  }, (err, results) => {
    if(err) {return next(err)}
    if(results.autor==null) {
      res.redirect('/catalogo/autores');
    }

    res.render('forms/autor_rm', {title: 'Remover Autor', autor: results.autor, autor_mangas: results.autor_mangas});
  });
}

exports.autor_rm_post = function(req, res, next) {
  async.parallel({
    autor: function(callback) {
      autor.findById(req.body.autor_id)
      .exec(callback)
    },
    autor_mangas: function(callback) {
      manga.find({autor: req.body.autor_id})
      .exec(callback)
    }
  }, (err, results) => {
    if(err) {return next(err)}
    
    if(results.autor_mangas > 0) {
      res.render('forms/autor_rm', {title: 'Remover Autor', autor: results.autor, autor_mangas: results.autor_mangas})
      return;
    } else {
      autor.findByIdAndRemove(req.body.autor_id, function removerAutor(err) {
        if (err) { return next(err)}
        res.redirect('/catalogo/autores');
      })
    }
  }
  )
};

// Exibe form atualizar autor por GET
exports.autor_att_get = function(req, res) {
  res.send("DX O HOMEM TRABAIA: atualizar autor GET");
};

// Atualiza por POST
exports.autor_att_post = function(req, res) {
  res.send("DX O HOMEM TRABAIA: atualizar autor POST");
};
