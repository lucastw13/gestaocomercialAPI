const mongoose = require('mongoose')

const usuario = mongoose.model('usuario',{
    nome:String,
    senha:String
});

module.exports = usuario