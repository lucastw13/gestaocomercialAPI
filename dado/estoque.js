const mongoose = require('mongoose')

const estoque = mongoose.model('estoque',{
    empresa:String,
    tipo:String,
    codigo:String,
    quantidade:Number,
    valor:Number,
    quantidadeMinima:Number,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
});

module.exports = estoque