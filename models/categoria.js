var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nome: {type: String, required: true, minlength: 3, maxlength: 20},
    descricao: {type: String, required: true},
    faixa_etaria: {type: Number, required: true}
});

// Virtual para url 
categoriaSchema
.virtual('url')
.get(() => {
    return `/catalogo/categoria/${this._id}`;
});

module.exports = mongoose.model('Categoria', categoriaSchema);