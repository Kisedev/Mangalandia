var express = require('express');
var router = express.Router();

const manga_cntlr = require('../controllers/mangaController');
const mangacap_cntlr = require('../controllers/mangacapController');
const autor_cntlr = require('../controllers/autorController');
const categoria_cntlr = require('../controllers/categoriaController');

// Rotas Mangás
router.get('/', manga_cntlr.index)

router.get('/manga/adicionar', manga_cntlr.manga_add_get)

router.post('/manga/adicionar', manga_cntlr.manga_add_post)

router.get('/manga/:id/remover', manga_cntlr.manga_rm_get)

router.post('/manga/:id/remover', manga_cntlr.manga_rm_post)

router.get('/manga/:id/atualizar', manga_cntlr.manga_att_get)

router.post('/manga/:id/atualizar', manga_cntlr.manga_att_post)

router.get('/manga/:id', manga_cntlr.manga_info)

router.get('/mangas', manga_cntlr.manga_lista)

// Rotas Capítulos

router.get('/mangacap/adicionar', mangacap_cntlr.mangacap_add_get)

router.post('/mangacap/adicionar', mangacap_cntlr.mangacap_add_post)

router.get('/mangacap/:id/remover', mangacap_cntlr.mangacap_rm_get)

router.post('/mangacap/:id/remover', mangacap_cntlr.mangacap_rm_post)

router.get('/mangacap/:id/atualizar', mangacap_cntlr.mangacap_att_get)

router.post('/mangacap/:id/atualizar', mangacap_cntlr.mangacap_att_post)
// rota que deve abrir leitor
router.get('/mangacap/:id', mangacap_cntlr.mangacap_info)
// *criar get para capitulos de um manga especifico
// todos capitulos de mangas 
router.get('/capitulos', mangacap_cntlr.mangacap_lista)

// Rotas Autores

router.get('/autor/adicionar', autor_cntlr.autor_add_get)

router.post('/autor/adicionar', autor_cntlr.autor_add_post)

router.get('/autor/:id/remover', autor_cntlr.autor_rm_get)

router.post('/autor/:id/remover', autor_cntlr.autor_rm_post)

router.get('/autor/:id/atualizar', autor_cntlr.autor_att_get)

router.post('/autor/:id/atualizar', autor_cntlr.autor_att_post)

router.get('/autor/:id', autor_cntlr.autor_info)

router.get('/autores', autor_cntlr.autor_lista)

// Rotas Categorias

router.get('/categoria/adicionar', categoria_cntlr.categoria_add_get)

router.post('/categoria/adicionar', categoria_cntlr.categoria_add_post)

router.get('/categoria/:id/remover', categoria_cntlr.categoria_rm_get)

router.post('/categoria/:id/remover', categoria_cntlr.categoria_rm_post)

router.get('/categoria/:id/atualizar', categoria_cntlr.categoria_att_get)

router.post('/categoria/:id/atualizar', categoria_cntlr.categoria_att_post)

router.get('/categoria/:id', categoria_cntlr.categoria_info)

router.get('/categorias', categoria_cntlr.categoria_lista)

module.exports = router;