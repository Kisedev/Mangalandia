var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    nome: {type: String, required: true, minlength: 3, maxlength: 20},
    descricao: {type: String},
    classificacao: {type: Number}
});

// Virtual para url 
categoriaSchema
.virtual('url')
.get(() => {
    return `/catalogo/categoria/${this._id}`;
});

module.exports = mongoose.model('Categoria', categoriaSchema);