const mongoose = require('mongoose')

const usuario = mongoose.model('usuario',{
    nome:String,
    senha:String,
    empresa:String,
});

module.exports = usuario