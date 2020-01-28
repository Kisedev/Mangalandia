var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoria = new Schema({
    nome: {type: String, required: true, enum: ['Kodomo', 'Shounen', 'Shoujo', 'Hentai', 'Ecchi', 'Yaoi', 'Yuri', 'Gekigá', 'Seinen', 'Josei']},
    desc: {type: String},
    faixa_etaria: {type: Number, required: true}
});

// Virtual para url 
categoria
.virtual('url')
.get(() => {
    return `/catalogo/categoria/${this.nome}`;
});