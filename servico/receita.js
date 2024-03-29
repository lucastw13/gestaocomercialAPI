const Dado = require('../dado/receita');
const DadoInsumo = require('../dado/insumo');
const DadoUsuario = require('../dado/usuario');
class receita {
  static async get(_id, entidade, pEmpresa) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        var lista = JSON.parse(JSON.stringify(await Dado.find({ empresa: pEmpresa })))
        var listaReceitaTemp = []
        for(var itemReceita of lista){
          var listaInsumoTemp = []
          for(var itemInsumo of itemReceita.insumo){
            var itemInsumoSalvo = await DadoInsumo.findById(itemInsumo._id)
            itemInsumo.descricao = itemInsumoSalvo.descricao
            itemInsumo.unidadeMedida = itemInsumoSalvo.unidadeMedida
            listaInsumoTemp.push(itemInsumo)
          }
          itemReceita.insumo = listaInsumoTemp
          listaReceitaTemp.push(itemReceita)
        }
        lista = listaReceitaTemp
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = await Dado.findById(_id)
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "receita não encontrado!" }
        } else {
          if (entidade != "" && entidade != undefined) {
            if (entidade == "insumo") {
              var lista = []
              for (var itemInsumoTemp of item.insumo) {
                var itemInsumo = JSON.parse(JSON.stringify(await DadoInsumo.findById(itemInsumoTemp._id)))
                itemInsumo.quantidadeReceita = itemInsumoTemp.quantidade
                lista.push(itemInsumo)
                jsonRetorno.status = 200
              }
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }

            } else {
              jsonRetorno.status = 200
              jsonRetorno.json = { status: false, descricao: "receita não encontrado!" }
            }

          } else {
            var listaRegistroTemp = []
            for (var itemRegistroTemp of item.registro) {
              var itemUsuario = JSON.parse(JSON.stringify(await DadoUsuario.findById(itemRegistroTemp.usuario)))
              itemRegistroTemp.usuarioNome = itemUsuario.nome
              listaRegistroTemp.push(itemRegistroTemp)
            }
            item.registro = listaRegistroTemp
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
      jsonRetorno.json = { status: true, descricao: "receita deletado com sucesso!", item: item }
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
      jsonRetorno.json = { status: true, descricao: "receita criado com sucesso!", item: itemCriado }
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
      jsonRetorno.json = { status: true, descricao: "receita atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = receita;