const mongoose = require('mongoose')

const empresa = mongoose.model('empresa',{
    nome:String,
});

module.exports = empresa