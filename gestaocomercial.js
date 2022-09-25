const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Insumo = require('./dado/insumo');
const Produto = require('./dado/produto');
const cors = require('cors');
app.use(cors({
        origin:'*',
        methods:'GET,POST,PUT,PATCH,DELETE'
}));
app.use(
    express.urlencoded({
        extended: true,
    })

),

    app.use(express.json())

app.post('/insumo', async (req, res) => {
    var insumo = {
        descricao: req.body.descricao,
    }
    try {
        var insumoCriado = await Insumo.create(insumo);
        res.status(201).json({ status: true, descricao: "insumo criado com sucesso!", insumo: insumoCriado })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
    }
})

app.put('/insumo', async (req, res) => {
    var insumo = {
        _id : req.body._id,
        descricao: req.body.descricao,
    }
    try {
        var insumoCriado = await Insumo.updateOne(insumo);
        res.status(201).json({ status: true, descricao: "insumo atualizado com sucesso!", insumo: insumoCriado })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
    }
})

app.get('/insumo', async (req, res) => {
    try {
        const insumo = await Insumo.find({ tipo: "insumo" })
        res.status(201).json({ status: true, descricao: "busca realizada com sucesso!", insumo: insumo })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
    }
})

app.get('/insumo/:codigo', async (req, res) => {
    try {
        const insumo = await Insumo.findById(req.params.codigo)
        if (!insumo) {
            res.status(422).json({ status: false, descricao: "insumo não encontrado!" });

        }
        res.status(201).json({ status: true, descricao: "busca realizada com sucesso!", insumo: insumo })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
    }
})
app.get('/insumo/:codigo/deletar', async (req, res) => {
    try {
        const insumo = await Insumo.findByIdAndDelete(req.params.codigo)
        res.status(201).json({ status: true, descricao: "insumo deletado com sucesso!", insumo: insumo })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
    }
})


app.delete('/insumo/:codigo', async (req, res) => {
    try {
        const insumo = await Insumo.findByIdAndDelete(req.params.codigo)
        res.status(201).json({ status: true, descricao: "insumo deletado com sucesso!", insumo: insumo })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
    }
})

app.post('/produto', async (req, res) => {
    var insumo = []
    if (req.body.insumo != undefined) {
        if (req.body.insumo.length > 0) {
            for (var item of req.body.insumo) {
                insumo.push(item)
            }

        }

    }
    var produto = {
        descricao: req.body.descricao,
        insumo: insumo
    }
    try {
        var produtoCriado = await Produto.create(produto);

        res.status(201).json({ status: true, descricao: "produto criado com sucesso!", produto: produtoCriado })
    } catch (error) {
        res.status(500).json({ status: false, descricao: error })
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
