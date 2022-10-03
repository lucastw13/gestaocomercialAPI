const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaProduto = new Schema({
    descricao: {
        type: String
    },
    ingrediente: {
        type: [SchemaInsumo]
    },
    receita: {
        type: String
    },
    produto: {
        type: [SchemaProduto]
    },
    data: {
        type: String
    },
    hora: {
        type: String
    },
    usuario: {
        type: String
    },
    dataAlteracao: {
        type: String
    },
    horaAlteracao: {
        type: String
    },
    usuarioAlteracao: {
        type: String
    },
    empresa: {
        type: String
    },

});

const SchemaInsumo = ({
    _id: {
        type: String
    },
    quantidade: {
        type: number
    },
});


const produto = mongoose.model('produto', SchemaProduto);
module.exports = produto