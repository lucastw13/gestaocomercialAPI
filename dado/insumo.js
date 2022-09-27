const mongoose = require('mongoose')

const insumo = mongoose.model('insumo',{
    descricao:String,
    unidadeMedida:String,
    quantidade:Number,
    quantidadeMinima:Number
});

module.exports = insumo