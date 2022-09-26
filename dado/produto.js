const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaProduto  = new Schema({
    descricao:{
        type:String
    },
    ingrediente:{
        type:[SchemaInsumo]
    },
    receita:{
        type:String
    },
    produto:{
        type:[SchemaProduto]
    },

});

const SchemaInsumo = ({
    _id:{
        type:String
    },
    quantidade:{
        type:number
    },
});


const produto = mongoose.model('produto', SchemaProduto);
module.exports = produto