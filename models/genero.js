var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generoSchema = new Schema({
    nome: {type: String, required: true, enum: ['Ação', 'Comédia', 'Drama', 'Fantasia', 'Ficção', 'Romance', 'Suspense', 'Terror', 'Nacional']},
});

// Virtual para url 
generoSchema
.virtual('url')
.get(() => {
    let lcs = this.nome.toLowerCase();
    return `/catalogo/categoria/${lcs}`;
});

module.exports = mongoose.model('Genero', generoSchema);