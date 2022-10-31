const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaPedido = new Schema({
    quantidade:{
        type:String
    },
    unidadeMedida:{
        type:String
    },
    pedidoItem: {
        type: [{
            sequencial:{
                type:Number
            },
            produto:{
                type:String
            },
            quantidade:{
                type:Number,
            }
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