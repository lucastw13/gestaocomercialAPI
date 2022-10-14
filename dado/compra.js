const mongoose = require('mongoose')

const SchemaCompra = ({
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
            valor:{
                type:Number
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

});

const compra = mongoose.model('compra', SchemaCompra);
module.exports = compra