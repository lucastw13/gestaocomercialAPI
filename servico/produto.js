const Dado = require('../dado/produto');
const DadoInsumo = require('../dado/insumo');
const DadoReceita = require('../dado/receita');
const DadoEstoque = require('../dado/estoque');
class produto {
  static async get(_id, entidade, pEmpresa, peSubProduto) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        var lista = []
        if (peSubProduto != "" && peSubProduto != undefined) {
          lista = await Dado.find({ empresa: pEmpresa, eSubProduto: peSubProduto })
        } else {
          lista = await Dado.find({ empresa: pEmpresa })
        }

        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "produto não encontrado!" }
        } else {
          if (entidade != "" && entidade != undefined) {
            var lista = []
            if (entidade == "insumo") {

              for (var itemTemp of item.insumo) {
                var itemInsumo = JSON.parse(JSON.stringify(await DadoInsumo.findById(itemTemp._id)))
                itemInsumo.quantidadeInsumo = itemTemp.quantidade
                lista.push(itemInsumo)
              }

              jsonRetorno.status = 200
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }

            } else if (entidade == "produto") {

              for (var itemTemp of item.produto) {
                var itemProduto = JSON.parse(JSON.stringify(await Dado.findById(itemTemp._id)))
                itemProduto.porcentagemProduto = itemTemp.porcentagem
                lista.push(itemProduto)
              }
              jsonRetorno.status = 200
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
            } else {
              jsonRetorno.status = 200
              jsonRetorno.json = { status: false, descricao: "produto não encontrado!" }
            }

          } else {
            item.valorCalculado = 0
            if (item.eSubProduto) {
              for (var itemTemp of item.insumo) {
                var itemEstoque = await DadoEstoque.findOne({ empresa: item.empresa, tipo: "insumo", codigo: itemTemp._id })
                if (itemEstoque.valor != "" && itemEstoque.valor != undefined) {
                  item.valorCalculado = item.valorCalculado + itemEstoque.valor * itemTemp.quantidade

                }
              }
              for (var itemTemp1 of item.produto) {
                var itemProduto = JSON.parse(JSON.stringify(await Dado.findById(itemTemp1._id)))
                if (itemProduto.receita != "" && itemProduto.receita != undefined) {
                  var itemReceita = JSON.parse(JSON.stringify(await DadoReceita.findById(itemProduto.receita)))
                  for (var itemTemp2 of itemReceita.insumo) {
                    var itemEstoque = await DadoEstoque.findOne({ empresa: item.empresa, tipo: "insumo", codigo: itemTemp2._id })
                    if (itemEstoque.valor != "" && itemEstoque.valor != undefined) {
                      item.valorCalculado = item.valorCalculado + (((itemEstoque.valor * itemTemp2.quantidade)*itemTemp1.porcentagem)/100)
                    }
                  }
                }
              }
            } else {
              if (item.receita != "" && item.receita != undefined) {
                var itemReceita = JSON.parse(JSON.stringify(await DadoReceita.findById(item.receita)))
                for (var itemTemp of itemReceita.insumo) {
                  var itemEstoque = await DadoEstoque.findOne({ empresa: item.empresa, tipo: "insumo", codigo: itemTemp._id })
                  if (itemEstoque.valor != "" && itemEstoque.valor != undefined) {
                    item.valorCalculado = item.valorCalculado + itemEstoque.valor * itemTemp.quantidade
                  }
                }
              }
            }
            item.valorCalculado = parseFloat(item.valorCalculado.toFixed(2))

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
      jsonRetorno.json = { status: true, descricao: "produto deletado com sucesso!", item: item }
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
      jsonRetorno.json = { status: true, descricao: "produto criado com sucesso!", item: itemCriado }
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
      jsonRetorno.json = { status: true, descricao: "produto atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = produto;