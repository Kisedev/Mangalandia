var categoria = require("../models/categoria");
var manga = require("../models/manga");

const async = require("async");
const validator = require("express-validator");

exports.categoria_lista = function(req, res, next) {
  categoria.find({}).exec((err, result) => {
    if (err) {
      return next(err);
    }
    res.render("categorias", {
      title: "Categorias & Gêneros",
      categorias: result
    });
  });
};

exports.categoria_info = function(req, res, next) {
  async.parallel(
    {
      categoria: function(callback) {
        categoria.findById(req.params.id).exec(callback);
      },
      categoria_mangas: function(callback) {
        manga.find({ categoria: req.params.id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        next(err);
      }
      res.render("categoria", {
        title: results.categoria.nome,
        categoria: results.categoria,
        categoria_mangas: results.categoria_mangas
      });
    }
  );
};

exports.categoria_add_get = function(req, res, next) {
  res.render("forms/categoria", { title: "Adicionar Categoria" });
};

exports.categoria_add_post = [
  // lista de middlewares para executar assicronamente
  validator
    .body("nome", "O Nome deve ter pelo menos 3 caracteres")
    .isLength({ min: 3, max: 30 })
    .trim(),
  // valida campo nome do form
  validator.sanitizeBody("nome").escape(),
  // anti cross script attack de tags html ou cod js
  (req, res, next) => {
    const errors = validator.validationResult(req);

    let cat = new categoria({ nome: req.body.nome });

    if (!errors.isEmpty()) {
      // ha erros ent renderiza novamente com os dados e alerta
      res.render("forms/categoria", {
        title: "Adicionar Categoria",
        categoria: cat,
        errors: errors.array()
      });
      return;
    } else {
      // os dados estao corretos
      categoria.find({ nome: req.body.nome }).exec((err, cat_encontrada) => {
        if (err) {
          return next(err);
        }

        if (cat_encontrada) {
          // vai pra pagina do genero que ja existia
          res.redirect(cat_encontrada.url);
        } else {
          cat.save(function(err) {
            if (err) {
              return next(err);
            }
            // salvou vai pra pagina
            res.redirect(cat.url);
          });
        }
      });
    }
  }
];

exports.categoria_rm_get = function(req, res, next) {
  async.parallel(
    {
      categoria: function(callback) {
        categoria.findById(req.params.id).exec(callback);
      },
      categoria_mangas: function(callback) {
        manga.find({ categoria: req.params.id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        next(err);
      }
      if (!results.categoria) {
        res.redirect("/catalogo/categorias");
      }

      res.render("forms/categoria_rm", {
        title: "Remover Categoria",
        categoria: results.categoria,
        categoria_mangas: results.categoria_mangas
      });
    }
  );
};

exports.categoria_rm_post = function(req, res, next) {
  async.parallel(
    {
      categoria: function(callback) {
        categoria.findById(req.body.cat_id).exec(callback);
      },
      categoria_mangas: function(callback) {
        manga.find({ categoria: req.body.cat_id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.categoria_mangas.length > 0) {
        res.render("forms/categoria_rm", {
          title: "Remover Categoria",
          categoria: results.categoria,
          categoria_mangas: results.categoria_mangas
        });
        return;
      } else {
        categoria.findByIdAndRemove(req.body.cat_id, function removerCategoria(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/catalogo/categorias");
        });
      }
    }
  );
};

exports.categoria_att_get = function(req, res, next) {
  categoria.findById(req.params.id).exec((err, cat) => {
    if (err) {
      return next(err);
    }
    res.render("forms/categoria", {
      title: "Atualizar Categoria",
      categoria: cat
    });
  });
};

exports.categoria_att_post = [
  validator
    .body("nome", "O Nome deve ter pelo menos 3 caracteres")
    .isLength({ min: 3, max: 30 })
    .trim(),
  validator.sanitizeBody("nome").escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);

    let cat_editada = new categoria({
      nome: req.body.nome,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      res.render("forms/categoria", {
        title: "Atualizar Categoria",
        categoria: cat_editada,
        errors: errors.array()
      });
      return;
    } else {
      categoria.find({ nome: req.body.nome }).exec((err, cat_encontrada) => {
        console.log('cat_encontrada', cat_encontrada, cat_encontrada.url)
        if (err) {
          return next(err);
        }
        if (cat_encontrada.url) {
          res.redirect(cat_encontrada.url);
        } else {
          categoria.findByIdAndUpdate(
            req.params.id,
            cat_editada,
            (err, cat_atualizada) => {
              if (err) {
                return next(err);
              }
              console.log('cat_atualizada', cat_atualizada, cat_atualizada.url);
              res.redirect(cat_atualizada.url);
            }
          );
        }
      });
    }
  }
];
