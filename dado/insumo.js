const mongoose = require('mongoose')

const insumo = mongoose.model('insumo',{
    descricao:String,
    unidadeMedida:String,
    quantidade:Number,
    quantidadeMinima:Number,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
    empresa:String,
});

module.exports = insumo