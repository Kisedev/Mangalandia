var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genero = new Schema({
    nome: {type: String, required: true, enum: ['Ação', 'Comédia', 'Drama', 'Fantasia', 'Ficção', 'Romance', 'Suspense', 'Terror', 'Nacional']},
});

// Virtual para url 
genero
.virtual('url')
.get(() => {
    let lcs = this.nome.toLowerCase();
    return `/catalogo/categoria/${lcs}`;
});