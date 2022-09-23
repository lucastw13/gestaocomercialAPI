const mongoose = require('mongoose')

const ingrediente = mongoose.model('ingrediente',{
    codigo:Number,
    descricao:String,
});

module.exports = ingrediente