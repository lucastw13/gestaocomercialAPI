const mongoose = require('mongoose')

const cliente = mongoose.model('cliente',{
    nome:String,
});

module.exports = cliente