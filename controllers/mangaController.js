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
      res.render("forms/manga_form", {
        titulo: "Adicionar Mangá",
        autores: results.autores,
        categorias: results.categorias
      });
    }
  );
};

exports.manga_add_post = function(req, res) {
  res.send("TAMO TRABALHANDO MEU CONSAGRADO: adicionar mangá por POST");
};

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
