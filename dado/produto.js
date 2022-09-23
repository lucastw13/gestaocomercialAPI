const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema  = new Schema({
    descricao:{
        type:String
    },
    ingrediente:{
        type:[String]
    }
});
const produto = mongoose.model('produto', UserSchema);
module.exports = produto