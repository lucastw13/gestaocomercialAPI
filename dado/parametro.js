const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaParametro= new Schema({
    chave: {
        type: String
    },
    valor: {
        type: String
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


const parametro = mongoose.model('Parametro', SchemaParametro);
module.exports = parametro