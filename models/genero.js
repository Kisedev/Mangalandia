var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generoSchema = new Schema({
    nome: {type: String, required: true, minlength: 3, maxlength: 30},
});

// Virtual para url 
generoSchema
.virtual('url')
.get(() => {
    return `/catalogo/categoria/${this._id}`;
});

module.exports = mongoose.model('Genero', generoSchema);