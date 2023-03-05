const Dado = require('../dado/insumodepara');
const DadoInsumo = require('../dado/insumo');
class insumodepara {
  static async get(_id, entidade, pEmpresa, pCnpj,pCodigo) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        if (pCnpj == "" || pCnpj == undefined || pCodigo == "" || pCodigo == undefined) {
          var lista = JSON.parse(JSON.stringify(await Dado.find()))
          var listaTemp = []
          for(var item of lista){
            var itemInsumo = await DadoInsumo.findById(item.insumo)
            item.insumoDescricao = itemInsumo.descricao
            listaTemp.push(item)
          }
          lista = listaTemp
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
        } else {
          const item = await Dado.findOne({ fornecedor:{cnpj:pCnpj}, codigo: pCodigo })
          if (item == "" || item == undefined) {
            jsonRetorno.json = { status: false, descricao: "insumo não encontrado!" }
          }else{
            jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
          }
          jsonRetorno.status = 200
          
        }
      } else {
        const item = await Dado.findById(_id)
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "insumo de para não encontrado!" }
        } else {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
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
      jsonRetorno.json = { status: true, descricao: "insumo de para deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (body instanceof Array) {
        var lista = []
        for (var item of body) {
          var itemCriado = await Dado.create(item);
          lista.push(itemCriado)
        }
        jsonRetorno.status = 201
        jsonRetorno.json = { status: true, descricao: "insumo de/para criado com sucesso!", lista: lista }
      } else {
        item = body
        var itemCriado = await Dado.create(item);
        jsonRetorno.status = 201
        jsonRetorno.json = { status: true, descricao: "insumo de/para criado com sucesso!", item: item }
      }
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
      jsonRetorno.json = { status: true, descricao: "insumo de para atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = insumodepara;