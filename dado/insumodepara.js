const mongoose = require('mongoose')

const insumodepara = mongoose.model('insumodepara',{
    cnpj:String,
    codigo:String,
    insumo:String,
    fornecedor: {
        type: {
            cnpj: {
                type: String
            },
            nome: {
                type: String
            },
        }
    },
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
});

module.exports = insumodepara