var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capitulo = new Schema({
    manga: {type: Schema.Types.ObjectId, ref: 'Manga', required: true},
    nome: {type: String},
    vol: {type: Number, required: true},
    lancamento: {type: Date, default: Date.now}
});

// Virtual para titulo
capitulo
.virtual('titulo')
.get(() => {
    if (this.nome) {
        return `-${this.nome}`;
    }
    return `#${this.vol}`;
});

// Virtual para url
capitulo
.virtual('url')
.get(() => {
    return `/catalogo/manga/${this.manga}/${this.vol}`;
});