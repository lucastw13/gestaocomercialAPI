const Dado = require('../dado/compra');
const DadoInsumo = require('../dado/insumo');
class compra {
  static async get(_id, entidade,pEmpresa) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        const lista = await Dado.find({empresa:pEmpresa})
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = await Dado.findById(_id)
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "compra não encontrado!" }
        } else {
          if (entidade!="" && entidade!=undefined) {
            if (entidade == "insumo") {
              var lista = []
              for (var itemInsumoTemp of item.insumo) {
                var itemInsumo = JSON.parse(JSON.stringify(await DadoInsumo.findById(itemInsumoTemp._id)))
                itemInsumo.quantidadeCompra = itemInsumoTemp.quantidade
                lista.push(itemInsumo)
                jsonRetorno.status = 200
              }
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }

            } else {
              jsonRetorno.status = 200
              jsonRetorno.json = { status: false, descricao: "Compra não encontrado!" }
            }

          } else {
            jsonRetorno.status = 200
            jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
          }
        }
      }

    } catch (error) {
      jsonRetorno.status = 500
      jsonRetorno.json = { status: false, descricao: error }
    }
    return jsonRetorno
  }
  static async delete(_id) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = await Dado.findByIdAndDelete(_id)
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "compra deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 500
      jsonRetorno.json = { status: false, descricao: error }
    }
    return jsonRetorno
  }
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    try {
      var itemCriado = await Dado.create(item);
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "compra criado com sucesso!", item: itemCriado }
    } catch (error) {
      jsonRetorno.status = 500
      jsonRetorno.json = { status: false, descricao: error }
    }
    return jsonRetorno
  }
  static async put(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    try {
      var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item);
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "compra atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 500
      jsonRetorno.json = { status: false, descricao: error }
    }
    return jsonRetorno
  }

}

module.exports = compra;