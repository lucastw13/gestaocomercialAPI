const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaPedido = new Schema({
    produto: {
        type: [{
            _id: {
                type: String
            },
            quantidade: {
                type: Number,
            },
            valor: {
                type: Number,
            }
        }]
    },
    numero: {
        type: Number
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
    valor: {
        type: Number
    },
});


const pedido = mongoose.model('pedido', SchemaPedido);
module.exports = pedido