const Dado = require('../dado/pedido');
const DadoProduto = require('../dado/produto');
const DadoCliente = require('../dado/cliente');
class pedido {
  static async get(_id, entidade, pEmpresa) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        var lista = JSON.parse(JSON.stringify(await Dado.find({ empresa: pEmpresa })))
        var listaTemp = []
        for (var itemTemp of lista) {
          var itemCliente = JSON.parse(JSON.stringify(await DadoCliente.findById(itemTemp.cliente)))
          itemTemp.clienteNome = itemCliente.nome
          listaTemp.push(itemTemp)
        }
        lista = listaTemp
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "pedido não encontrado!" }
        } else {
          if (entidade != "" && entidade != undefined) {
            if (entidade == "produto") {
              var lista = []
              for (var itemProdutoTemp of item.produto) {
                var itemProduto = JSON.parse(JSON.stringify(await DadoProduto.findById(itemProdutoTemp._id)))
                itemProduto.quantidadePedido = itemProdutoTemp.quantidade
                lista.push(itemProduto)
                jsonRetorno.status = 200
              }
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }

            } else {
              jsonRetorno.status = 200
              jsonRetorno.json = { status: false, descricao: "pedido não encontrado!" }
            }

          } else {
            jsonRetorno.status = 200
            jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
          }
        }
      }

    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async delete(_id) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = await Dado.findByIdAndDelete(_id)
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "pedido deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    try {
      var itemCriado = await Dado.create(item);
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "pedido criado com sucesso!", item: itemCriado }
      
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async put(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    try {
      var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item);
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "pedido atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = pedido;