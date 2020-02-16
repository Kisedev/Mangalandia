var manga = require("../models/manga");
var autor = require("../models/autor");
var categoria = require("../models/categoria");
var mangacap = require("../models/mangacap");

const async = require("async");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

exports.index = function(req, res) {
  async.parallel(
    {
      manga_count: function(callback) {
        manga.countDocuments({}, callback);
      },
      autor_count: function(callback) {
        autor.countDocuments({}, callback);
      },
      categoria_count: function(callback) {
        categoria.countDocuments({}, callback);
      },
      mangacap_count: function(callback) {
        mangacap.countDocuments({}, callback);
      }
    },
    (err, results) => {
      res.render("index", { title: "Mangalandia", error: err, data: results });
    }
  );
};

exports.manga_lista = function(req, res, next) {
  manga
    .find({}, "-capitulo")
    .populate("autor categoria")
    .exec((err, lista_mangas) => {
      if (err) {
        return next(err);
      }
      res.render("mangas", { title: "Mangás", lista_mangas });
    });
};

exports.manga_info = function(req, res, next) {
  async.parallel(
    {
      manga: function(callback) {
        manga
          .findById(req.params.id)
          .populate("autor")
          .populate("categoria")
          .exec(callback);
      },
      capitulo: function(callback) {
        mangacap.find({ manga: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.render("manga", {
        title: results.manga.titulo,
        manga: results.manga,
        capitulos: results.capitulo
      });
    }
  );
};

exports.manga_add_get = function(req, res, next) {
  async.parallel(
    {
      autores: function(callback) {
        autor.find(callback);
      },
      categorias: function(callback) {
        categoria.find(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      res.render("forms/manga", {
        titulo: "Adicionar Mangá",
        autores: results.autores,
        categorias: results.categorias
      });
    }
  );
};

exports.manga_add_post = [
  (req, res, next) => {
    if (!(req.body.categoria instanceof Array)) {
      if (typeof req.body.categoria === "undefined") req.body.categoria = [];
      else req.body.categoria = new Array(req.body.categoria);
    }
    next();
  },

  body("titulo", "Titulo não pode estar vazio.")
    .isLength({ min: 1 })
    .trim(),
  body("autor", "Autor não pode estar vazio.")
    .isLength({ min: 1 })
    .trim(),
  body("sumario", "Sumario não deve estar vazio.")
    .isLength({ min: 1 })
    .trim(),

  sanitizeBody("*").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    let novo_manga = new manga({
      titulo: req.body.titulo,
      sumario: req.body.sumario,
      autor: req.body.autor,
      categoria: req.body.categoria,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          autores: function(callback) {
            autor.find(callback);
          },
          categorias: function(callback) {
            categoria.find(callback);
          }
        },
        function(err, results) {
          if (err) {
            return next(err);
          }

          for (let i = 0; i < results.categorias.length; i++) {
            if (novo_manga.categoria.indexOf(results.categorias[i]._id) > -1) {
              results.categorias[i].checked = "true";
            }
          }
          res.render("forms/manga", {
            titulo: "Adicionar Mangá",
            autores: results.autores,
            categorias: results.categorias,
            manga: novo_manga,
            errors: errors.array()
          });
        }
      );
      return;
    } else {
        novo_manga.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect(novo_manga.url);
      });
    }
  }
];

exports.manga_rm_get = function(req, res) {
  res.send("TAMO TRABALHANDO MEU CONSAGRADO: remover mangá por GET");
};

exports.manga_rm_post = function(req, res) {
  res.send("TAMO TRABALHANDO MEU CONSAGRADO: remover mangá por POST");
};

exports.manga_att_get = function(req, res) {
  res.send("TAMO TRABALHANDO MEU CONSAGRADO: atualizar mangá por GET");
};

exports.manga_att_post = function(req, res) {
  res.send("TAMO TRABALHANDO MEU CONSAGRADO: atualizar mangá por POST");
};
