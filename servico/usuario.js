const Dado = require('../dado/usuario');
class usuario {
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = await Dado.findOne({ nome: body.nome })
      if (item != "" && item != undefined) {
        if (item.senha == body.senha) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "usuário autenticado com sucesso!", item }

        } else {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "usuário ou senha inválida" }

        }
      } else {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: false, descricao: "usuário ou senha inválida" }

      }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }


}

module.exports = usuario;