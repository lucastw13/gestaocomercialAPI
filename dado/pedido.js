const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaPedido = new Schema({
    produto: {
        type: [{
            _id:{
                type:String
            },
            quantidade:{
                type:Number,
            }
        }]
    },
    cliente: {
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


const pedido = mongoose.model('pedido', SchemaPedido);
module.exports = pedido