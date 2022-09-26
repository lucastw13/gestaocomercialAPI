const Dado = require('../dado/receita');
class receita {
  constructor() {

  }
  static async get(_id) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        const lista = await Dado.find()
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = await Dado.findById(_id)
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "receita não encontrado!" }
        } else {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
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
      jsonRetorno.json = { status: true, descricao: "receita deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 500
      jsonRetorno.json = { status: false, descricao: error }
    }
    return jsonRetorno
  }
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    console.log(item)
    try {
      var itemCriado = await Dado.create(item);
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "insumo criado com sucesso!", item: itemCriado }
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
      var itemAtualizado = await Dado.findByIdAndUpdate(item._id,item);
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "receita atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 500
      jsonRetorno.json = { status: false, descricao: error }
    }
    return jsonRetorno
  }

}

module.exports = receita;