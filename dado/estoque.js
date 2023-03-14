const mongoose = require('mongoose')

const estoque = mongoose.model('estoque',{
    empresa:String,
    tipo:String,
    codigo:String,
    quantidade:Number,
    valor:Number
});

module.exports = estoque