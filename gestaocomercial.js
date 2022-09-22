const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Ingrediente = require('./dado/ingrediente')
app.use(
    express.urlencoded({
        extended: true,
    })

),

    app.use(express.json())

app.post('/ingrediente', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    var ingrediente = {
        descricao:req.body.descricao,
        tipo:"ingrediente"
    }
    try {
        var ingredienteCriado = await Ingrediente.create(ingrediente);
        res.status(201).json({status:true,descricao:"ingrediente criado com sucesso!",ingrediente:ingredienteCriado})
    } catch (error) {
        res.status(500).json({ status:false,descricao:error})
    }
})

app.get('/ingrediente', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    try {
        const ingrediente = await Ingrediente.find({tipo:"ingrediente"})
        res.status(201).json({status:true,descricao:"busca realizada com sucesso!",ingrediente:ingrediente})
    } catch (error) {
        res.status(500).json({ status:false,descricao: error })
    }
})

app.get('/ingrediente/:codigo', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    try {
        const ingrediente = await Ingrediente.findById(req.params.codigo)
        if (!ingrediente){
            res.status(422).json({ status:false,descricao: "ingrediente não encontrado!"});
        
        }
        res.status(201).json({status:true,descricao:"busca realizada com sucesso!",ingrediente:ingrediente})
    } catch (error) {
        res.status(500).json({ status:false,descricao: error })
    }
})

app.delete('/ingrediente/:codigo', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    try {
        const ingrediente = await Ingrediente.findByIdAndDelete(req.params.codigo)
        /*if (!ingrediente){
            res.status(422).json({ status:false,descricao: "ingrediente não encontrado!"});
        
        }*/
        res.status(201).json({status:true,descricao:"ingrediente deletado com sucesso!",ingrediente:ingrediente})
    } catch (error) {
        res.status(500).json({ status:false,descricao: error })
    }
})

app.get('/', (req, res) => {
    res.json({ teste: "Olá Mundo!" })

})

mongoose.connect('mongodb+srv://lucas:123@cluster0.dziy0r6.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("conectado!!!!!!!!!!")
        app.listen(3001)

    })
    .catch((err) => {
        console.log(err)
    });
