const mongoose = require('mongoose')

const ingrediente = mongoose.model('ingrediente',{
    codigo:Number,
    descricao:String,
    tipo:String,

});

module.exports = ingrediente