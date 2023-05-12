const Dado = require('../dado/insumo');
const DadoEstoque = require('../dado/estoque');
class insumo {
  static async get(_id, entidade, pEmpresa) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if ((_id == "codigo") || (_id == "") || (_id == undefined)) {
        var lista = JSON.parse(JSON.stringify(await Dado.find()))
        var listaTemp = []
        for (var item of lista) {
          var itemEstoque = await DadoEstoque.findOne({ empresa: pEmpresa, tipo: "insumo", codigo: item._id })
          if ((itemEstoque == "") || (itemEstoque == undefined)) {
            itemEstoque = await DadoEstoque.create({
              empresa: pEmpresa,
              tipo: "insumo",
              codigo: item._id,
              quantidade: 0,
              valor: 0,
              quantidadeMinima: 0,
              usuario: item.usuario,
              data: item.data,
              hora: item.hora,
            });
          }
          item.quantidade = itemEstoque.quantidade
          item.quantidadeMinima = itemEstoque.quantidadeMinima
          item.valor = itemEstoque.valor
          listaTemp.push(item)
        }
        lista = listaTemp
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "insumo não encontrado!" }
        } else {
          var itemEstoque = await DadoEstoque.findOne({ empresa: pEmpresa, tipo: "insumo", codigo: item._id })
          if ((itemEstoque == "") || (itemEstoque == undefined)) {
            itemEstoque = await DadoEstoque.create({
              empresa: pEmpresa,
              tipo: "insumo",
              codigo: item._id,
              quantidade: 0, valor: 0,
              quantidadeMinima: 0,
              usuario: item.usuario,
              data: item.data,
              hora: item.hora,
            });
          }
          item.quantidade = itemEstoque.quantidade
          item.quantidadeMinima = itemEstoque.quantidadeMinima
          item.valor = itemEstoque.valor
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
      jsonRetorno.json = { status: true, descricao: "insumo deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    var quantidadeMinima = item.quantidadeMinima
    delete item.quantidadeMinima
    try {
      var itemCriado = await Dado.create(item);
      await DadoEstoque.create({
        empresa: item.empresa,
        tipo: "insumo",
        codigo: itemCriado._id,
        quantidade: 0,
        valor: 0,
        quantidadeMinima: quantidadeMinima,
        usuario: itemCriado.usuario,
        data: itemCriado.data,
        hora: itemCriado.hora,
      });
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "insumo criado com sucesso!", item: itemCriado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async put(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    var quantidadeMinimaTemp = item.quantidadeMinima
    delete item.quantidadeMinima
    var empresaTemp = item.empresa
    delete item.empresa
    try {
      var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item);
      await DadoEstoque.findOneAndUpdate({
        empresa: empresaTemp,
        tipo: "insumo",
        codigo: itemAtualizado._id
      },
        {
          quantidadeMinima: quantidadeMinimaTemp,
          usuarioAlteracao: itemAtualizado.usuarioAlteracao,
          dataAlteracao: itemAtualizado.dataAlteracao,
          horaAlteracao: itemAtualizado.horaAlteracao,
        });
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "insumo atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = insumo;