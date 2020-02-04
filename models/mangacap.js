var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capituloSchema = new Schema({
    manga: {type: Schema.Types.ObjectId, ref: 'Manga', required: true},
    isbn: {type: String, required: true},
    num: {type: Number, required: true},
    lancamento: {type: Date, default: Date.now},
    nome: {type: String}
});

// Virtual para titulo
capituloSchema
.virtual('titulo')
.get(function () {
    if (this.nome) {
        return `-${this.nome}`;
    }
    return `#${this.num}`;
});

// Virtual para url
capituloSchema
.virtual('url')
.get(function () {
    return `/catalogo/manga/${this.manga}/${this.num}`;
});

module.exports = mongoose.model('MangaCap', capituloSchema);