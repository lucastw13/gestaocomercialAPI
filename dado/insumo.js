const mongoose = require('mongoose')

const insumo = mongoose.model('insumo',{
    descricao:String,
    unidadeMedida:String,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
});

module.exports = insumo