const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Insumo = require('./servico/insumo');
const Insumodepara = require('./servico/insumodepara');
const Receita = require('./servico/receita');
const RegistraReceita = require('./servico/registrareceita');
const Usuario = require('./servico/usuario');
const Compra = require('./servico/compra');
const Produto = require('./servico/produto');
const Pedido = require('./servico/pedido');
const Cliente = require('./servico/cliente');
const NotaFiscal = require('./servico/notafiscal');
const Parametro = require('./servico/parametro');
const Empresa = require('./servico/empresa');
const cors = require('cors');
require('dotenv').config()

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE'
}));
app.use(
    express.urlencoded({
        extended: true,
    })

),

    app.use(express.json())

app.put('/:entidade', async (req, res) => {
    var jsonRetorno = {status:500,json:{}};
    switch(req.params.entidade){
        case "insumo" : jsonRetorno = await Insumo.put(req.body); break;
        case "insumodepara" : jsonRetorno = await Insumodepara.put(req.body); break;
        case "receita" : jsonRetorno = await Receita.put(req.body); break;
        case "compra" : jsonRetorno = await Compra.put(req.body); break;
        case "produto" : jsonRetorno = await Produto.put(req.body); break;
        case "pedido" : jsonRetorno = await Pedido.put(req.body); break;
        case "cliente" : jsonRetorno = await Cliente.put(req.body); break;
        case "parametro" : jsonRetorno = await Parametro.put(req.body); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})


app.get('/:entidade', async (req, res) => {
    var jsonRetorno = {status:500,json:{}};
    switch(req.params.entidade){
        case "empresa" : jsonRetorno = await Empresa.get(); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/:entidade/:codigo', async (req, res) => {
    var jsonRetorno = {status:500,json:{}};
    switch(req.params.entidade){
        case "insumo" : jsonRetorno = await Insumo.get(req.params.codigo); break;
        case "insumodepara" : jsonRetorno = await Insumodepara.get(req.params.codigo); break;
        case "receita" : jsonRetorno = await Receita.get(req.params.codigo); break;
        case "compra" : jsonRetorno = await Compra.get(req.params.codigo); break;
        case "produto" : jsonRetorno = await Produto.get(req.params.codigo); break;
        case "usuario" : jsonRetorno = await Usuario.get(req.params.codigo); break;
        case "pedido" : jsonRetorno = await Pedido.get(req.params.codigo); break;
        case "cliente" : jsonRetorno = await Cliente.get(req.params.codigo); break;
        case "notafiscal" : jsonRetorno = await NotaFiscal.get(req.params.codigo); break;
        case "parametro" : jsonRetorno = await Parametro.get(req.params.codigo); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/:entidade/:codigo/:entidade2', async (req, res) => {
    var jsonRetorno = {status:500,json:{}};
    switch(req.params.entidade){
        case "receita" : jsonRetorno = await Receita.get(req.params.codigo,req.params.entidade2); break;
        case "compra" : jsonRetorno = await Compra.get(req.params.codigo,req.params.entidade2); break;
        case "produto" : jsonRetorno = await Produto.get(req.params.codigo,req.params.entidade2); break;
        case "pedido" : jsonRetorno = await Pedido.get(req.params.codigo,req.params.entidade2); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/:entidade/:codigo/:entidade2/:empresa', async (req, res) => {
    var jsonRetorno = {status:500,json:{}}
    switch(req.params.entidade){
        case "insumo" : jsonRetorno = await Insumo.get(req.params.codigo,"",req.params.empresa); break;
        case "insumodepara" : jsonRetorno = await Insumodepara.get("","",req.params.empresa); break;
        case "receita" : jsonRetorno = await Receita.get("","",req.params.empresa); break;
        case "compra" : jsonRetorno = await Compra.get("","",req.params.empresa); break;
        case "produto" : jsonRetorno = await Produto.get("","",req.params.empresa); break;
        case "pedido" : jsonRetorno = await Pedido.get("","",req.params.empresa); break;
        case "cliente" : jsonRetorno = await Cliente.get("","",req.params.empresa); break;
        case "parametro" : jsonRetorno = await Parametro.get("","",req.params.empresa); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/insumodepara/:codigo/:entidade2/:empresa/:cnpj/:codigo', async (req, res) => {
    var jsonRetorno = {status:500,json:{}}
    jsonRetorno = await Insumodepara.get("","",req.params.empresa,req.params.cnpj,req.params.codigo);
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/notafiscal/:chave/:entidade2/:empresa/notafiscal', async (req, res) => {
    var jsonRetorno = {status:500,json:{}}
    jsonRetorno = await NotaFiscal.get(req.params.chave,req.params.entidade2,req.params.empresa);
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/produto/:codigo/:entidade2/:empresa/:eSubProduto', async (req, res) => {
    var jsonRetorno = {status:500,json:{}}
    jsonRetorno = await Produto.get("","",req.params.empresa,req.params.eSubProduto);
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.delete('/:entidade/:codigo', async (req, res) => {
    var jsonRetorno = {status:500,json:{}};
    switch(req.params.entidade){
        case "insumo" : jsonRetorno = await Insumo.delete(req.params.codigo); break;
        case "insumodepara" : jsonRetorno = await Insumodepara.delete(req.params.codigo); break;
        case "receita" : jsonRetorno = await Receita.delete(req.params.codigo); break;
        case "compra" : jsonRetorno = await Compra.delete(req.params.codigo); break;
        case "produto" : jsonRetorno = await Produto.delete(req.params.codigo); break;
        case "pedido" : jsonRetorno = await Pedido.delete(req.params.codigo); break;
        case "cliente" : jsonRetorno = await Pedido.delete(req.params.codigo); break;
        case "parametro" : jsonRetorno = await Parametro.delete(req.params.codigo); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.post('/:entidade', async (req, res) => {
    var jsonRetorno = {status:500,json:{}};
    switch(req.params.entidade){
        case "insumo" : jsonRetorno = await Insumo.post(req.body); break;
        case "insumodepara" : jsonRetorno = await Insumodepara.post(req.body); break;
        case "receita" : jsonRetorno = await Receita.post(req.body); break;
        case "usuario" : jsonRetorno = await Usuario.post(req.body); break;
        case "compra" : jsonRetorno = await Compra.post(req.body); break;
        case "registrareceita" : jsonRetorno = await RegistraReceita.post(req.body); break;
        case "produto" : jsonRetorno = await Produto.post(req.body); break;
        case "pedido" : jsonRetorno = await Pedido.post(req.body); break;
        case "cliente" : jsonRetorno = await Cliente.post(req.body); break;
        case "parametro" : jsonRetorno = await Parametro.post(req.body); break;
    }
    res.status(jsonRetorno.status).json(jsonRetorno.json)
})

app.get('/', (req, res) => {
    res.json({ teste: "Olá Mundo!" })
})

mongoose.connect('mongodb+srv://lucas:123@cluster0.dziy0r6.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        
        app.listen(process.env.PORT, () => {
            console.log("conectado!!!!!!!!!!: "+process.env.PORT)
        });

    })
    .catch((err) => {
        console.log(err)
    });
