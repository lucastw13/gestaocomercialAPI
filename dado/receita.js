const mongoose = require('mongoose')

const SchemaReceita = ({
    descricao: {
        type: String
    },
    modoPreparo: {
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
    },
    data: {
        type: String
    },
    hora: {
        type: String
    },
    usuario: {
        type: String
    },
    dataAlteracao: {
        type: String
    },
    horaAlteracao: {
        type: String
    },
    usuarioAlteracao: {
        type: String
    },
    empresa: {
        type: String
    },
});

const receita = mongoose.model('receita', SchemaReceita);
module.exports = receita