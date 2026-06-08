const mongoose = require('mongoose')

const documentocompra = mongoose.model('documentocompra',{
    chaveAcesso:String,
    base64:String,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
    insumo: {
        type: [{
            _id:{
                type: String,
            },
            quantidade:{
                type:Number,
            },
            valor:{
                type:Number,
            }
        }]
    },
});

module.exports = documentocompra