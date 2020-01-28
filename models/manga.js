var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    titulo: {type: String, required: true},
    autor: {type: Schema.Types.ObjectId, ref: 'Autor', required: true},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true},
    sumario: {type: String},
    isbn: {type: String, required: true},
    genero: [{type: Schema.Types.ObjectId, ref: 'Genero'}],
    capitulos: [{type: Schema.Types.ObjectId, ref: 'MangaCap', required: true}],
    avaliacoes: [{type: Number, min: 0, max: 5}]
});

// Virtual para URL 
mangaSchema
.virtual('url')
.get(() => {
    return `/catalogo/manga/${this._id}`
});

// Virtual para estrelas
mangaSchema
.virtual('estrelas')
.get(() => {
    let media = Math.round(this.avaliacoes.reduce((soma, valor) => soma + valor, 0) / this.avaliacoes.length);
    if (isNaN(media)) {
        return;
    }
    return media;
});

module.exports = mongoose.model('Manga', mangaSchema);