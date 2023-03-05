const Dado = require('../dado/empresa');
class empresa {
  static async get() {
    var jsonRetorno = { status: 500, json: {} };
    try {
        const lista = await Dado.find()
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
    
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
}
module.exports = empresa;