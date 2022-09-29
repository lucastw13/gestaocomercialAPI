const mongoose = require('mongoose')

const SchemaReceita = ({
    descricao: {
        type: String
    },
    insumo: {
        type: [{
            _id: {
                type: String
            },
            quantidade: {
                type: Number
            }
        }]
    },
    registro: {
        type: [{
            data: {
                type: String
            },
            hora: {
                type: String
            },
            usuario: {
                type: String
            },
            insumo: {
                type: [{
                    _id: {
                        type: String
                    },
                    quantidade: {
                        type: Number
                    }
                }]
            }
        }]
    }
});

const receita = mongoose.model('receita', SchemaReceita);
module.exports = receita