const mongoose = require('mongoose')

const insumodepara = mongoose.model('insumodepara',{
    cnpj:String,
    codigo:String,
    insumo:String,
    empresa:{
        cnpj:String,
        nome:String
    },
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
});

module.exports = insumodepara