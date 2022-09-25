const mongoose = require('mongoose')

const insumo = mongoose.model('insumo',{
    codigo:Number,
    descricao:String,
});

module.exports = insumo