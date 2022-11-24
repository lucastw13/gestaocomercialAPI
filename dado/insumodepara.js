const mongoose = require('mongoose')

const insumodepara = mongoose.model('insumodepara',{
    cnpj:String,
    codigo:String,
    insumo:String,
    empresa:String,
});

module.exports = insumodepara