const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaProduto = new Schema({
    descricao: {
        type: String
    },
    insumo: {
        type: [{
            _id: {
                type: String
            },
            quantidade: {
                type: Number
            },
        }]
    },
    receita: {
        type: String
    },
    quantidade:{
        type:String
    },
    unidadeMedida:{
        type:String
    },
    produto: {
        type: [{
            _id:{
                type: String,
            },
            porcentagem:{
                type:Number,
            },
        }]
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
    valorVenda:{
        type: Number
    },
    eSubProduto:{
        type: Boolean
    }
});


const produto = mongoose.model('produto', SchemaProduto);
module.exports = produto