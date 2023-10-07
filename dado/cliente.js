const mongoose = require('mongoose')

const cliente = mongoose.model('cliente',{
    nome:String,
    empresa:String,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
});

module.exports = cliente