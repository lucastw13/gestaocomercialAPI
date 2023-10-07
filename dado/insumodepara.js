const mongoose = require('mongoose')

const insumodepara = mongoose.model('insumodepara',{
    cnpj:String,
    codigo:String,
    insumo:String,
    fornecedorCnpj:String,
    fornecedorNome:String,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
    empresa:String,
});

module.exports = insumodepara