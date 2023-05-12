const mongoose = require('mongoose')

const cliente = mongoose.model('cliente',{
    nome:String,
    empresa:String,
});

module.exports = cliente