const Dado = require('../dado/cliente');
const DadoPedido = require('../dado/pedido');
class ranking {
  static async get(pEmpresa) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      var lista = await Dado.find({ empresa: pEmpresa })
      var listaTemp = []
      for (var item of lista) {
        item = JSON.parse(JSON.stringify(item))
        item.total = 0
        var listaPedido = await DadoPedido.find({ cliente: item._id })

        for (var itemPedido of listaPedido) {
          var mesAtual = new Date().getMonth()
          var posicao = itemPedido.data.indexOf("/") + 1
          var mesString = itemPedido.data.substring(posicao, posicao + 2)
          var mesPedido = Number(mesString)
          if (mesPedido = mesAtual) {
            item.total = item.total + itemPedido.valor
          }
        }
        listaTemp.push(item)
      }
      lista = listaTemp

      lista.sort((a, b) => {
        if (a.total > b.total) {
          return -1
        }
      });
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
}
module.exports = ranking;