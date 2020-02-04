var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autorSchema = new Schema({
    primeiro_nome: {type: String, required: true, maxlength: 100},
    sobrenome: {type: String, required: true, maxlength: 100},
    nascimento: {type: Date},
    falecimento: {type: Date}
});

// Virtual para nome completo
autorSchema
.virtual('nome')
.get(function () {
    // se nao tiver um dos nomes entao retorna vazio o nome 
    if(!this.primeiro_nome || !this.sobrenome) {
        return "";
    }
    return this.sobrenome + ", " + this.primeiro_nome;
})

// Virtual para tempo vivido
autorSchema
.virtual('longevidade')
.get(function () {
    return (this.falecimento.getYear() - this.nascimento.getYear()).toString();
});

// Virtual para URL
autorSchema
.virtual('url')
.get(function () {
    return `/catalogo/autor/${this._id}`;
});

module.exports = mongoose.model('Autor', autorSchema);