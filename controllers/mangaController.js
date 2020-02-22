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
      capitulo_count: function(callback) {
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
      capitulos: function(callback) {
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
        capitulos: results.capitulos
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
        title: "Adicionar Mangá",
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
            title: "Adicionar Mangá",
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
  async.parallel({
    manga: function(callback) {
      manga.findById(req.params.id)
      .populate('categoria')
      .exec(callback)
    },
    manga_capitulos: function(callback) {
      mangacap.find({'manga': req.params.id})
      .exec(callback)
    }
  }, (err, results) => {
    if(err) {return next(err)}
    if(!results.manga) {
      res.redirect('/catalogo/mangas');
    }

    res.render('forms/manga_rm', {title: 'Remover Mangá', manga: results.manga, manga_capitulos: results.manga_capitulos})
  })
};

exports.manga_rm_post = function(req, res) {
  async.parallel({
    manga: function(callback) {
      manga.findById(req.body.manga_id)
      .populate('categoria')
      .exec(callback)
    },
    manga_capitulos: function(callback) {
      mangacap.find({'manga': req.body.manga_id})
      .exec(callback)
    }
  }, (err, results) => {
    if(err) {return next(err)}
    if(results.manga_capitulos.length > 0) {
      res.render('forms/manga_rm', {title: 'Remover Mangá', manga: results.manga, manga_capitulos: results.manga_capitulos})
      return;
    }

    manga.findByIdAndRemove(req.body.manga_id, function removerManga(err) {
      if(err) {return next(err)}
      res.redirect('/catalogo/mangas');
    })
  })
};

exports.manga_att_get = function(req, res, next) {
  async.parallel({
    manga: function(callback) {
      manga.findById(req.params.id)
      .populate('categoria')
      .populate('autor')
      .exec(callback)
    },
    autores: function(callback) {
      autor.find({})
      .exec(callback)
    },
    categorias: function(callback) {
      categoria.find({})
      .exec(callback)
    }
  }, (err, results) => {
    if(err) {return next(err)}
    if(!results.manga) {
      let err = new Error('Mangá não encontrado')
      err.status = 404;
      return next(err);
    }

    // adiciona checked para categorias que estao ligadas ao manga 
    for(let iCat = 0; iCat < results.categorias.length; iCat++) {
      for(let iMCat = 0; iMCat < results.manga.categoria.length; iMCat++) {
        if(results.categorias[iCat]._id.toString()==results.manga.categoria[iMCat]._id.toString()) {
          results.categorias[iCat].checked = 'true';
        }
      }
    }
    res.render('forms/manga', {title: 'Atualizar Mangá', manga: results.manga, autores: results.autores, categorias: results.categorias})
  })
};

exports.manga_att_post = [
  // checa se categorias é array 
  (req, res, next) => {
    if(!(req.body.categoria instanceof Array)) {
      if(typeof req.body.categoria==='undefined')
        req.body.categoria = [];
      else
        req.body.categoria = new Array(req.body.categoria);
    }
    next();
  },

  body('titulo', 'É preciso um Título').trim().isLength({min: 1}),
  body('sumario', 'Forneça um Sumário').trim().isLength({min: 1}),
  body('autor', 'É preciso do Autor').trim().isLength({min: 1}),
  body('categoria', 'É preciso ao menos uma Categoria').isLength({min: 1}),

  sanitizeBody('titulo').escape(),
  sanitizeBody('sumario').escape(),
  sanitizeBody('autor').escape(),
  sanitizeBody('categoria.*').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    let manga_editado = new manga({
      titulo: req.body.titulo,
      sumario: req.body.sumario,
      autor: req.body.autor,
      categoria: req.body.categoria,
      _id: req.params.id
    })
    if(!errors.isEmpty()) {
      async.parallel({
        autores: function(callback) {autor.find({}).exec(callback)},
        categorias: function(callback) {categoria.find({}).exec(callback)}
      }, (err, results) => {
        if (err) { return next(err)}
        for(let iCat = 0; iCat < results.categorias.length; i++) {
          if(manga_editado.categoria.indexOf(results.categorias[iCat]) > -1) {
            results.categorias[iCat].checked ='true';
          }
        }
        res.render('forms/manga', {title: 'Atualizar Mangá', manga: manga_editado, autores: results.autores, categorias: results.categorias})
      })
    }
    else {
    // ta tudo certo bora finalmente atualizar isso aq
      manga.findByIdAndUpdate(req.params.id, manga_editado, (err, manga_atualizado) => {
        if(err) {return next(err)}
        res.redirect(manga_atualizado.url);
      })
    }
  }
]
