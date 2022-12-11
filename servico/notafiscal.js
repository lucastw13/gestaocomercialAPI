
const axios = require('axios');
const Dado = require('../dado/insumodepara');
class notafiscal {
  static async get(chave, entidade2, empresa) {
    try {
      var jsonRetorno = { status: 500, json: {} };
      var token = "06aef429-a981-3ec5-a1f8-71d38d86481e"
      var config = {
        headers: {
          Accept: "application/json",
          authorization: "Bearer " + token
        }
      }
      jsonRetorno.status = 200
      var url = "https://gateway.apiserpro.serpro.gov.br/consulta-nfe-df-trial/api/v1/nfe/" + chave
      await axios.get(url, config)
        .then(async response => {
          if (response.data != null) {
            var retorno = {}
            retorno.cnpj = response.data.nfeProc.NFe.infNFe.emit.CNPJ
            var lista = []

            for (var item of response.data.nfeProc.NFe.infNFe.det) {
              if ((entidade2 == "" || entidade2 == undefined) && (empresa == "" || empresa == undefined)) {
                jsonRetorno.json = { descricao: "consulta realizada com sucesso", status: true, cnpj: response.data.nfeProc.NFe.infNFe.emit.CNPJ, lista: lista }
                lista.push(
                  {
                    descricao: item.prod.xProd,
                    codigo: item.prod.cProd,
                    quantidade: item.prod.qTrib,
                    unidadeMedida: item.prod.uTrib,
                    valorUnitario: item.prod.vUnTrib,
                    valor: item.prod.vProd
                  }

                )
              } else if (entidade2 == "insumo") {
                var itemInsumoDePara = await Dado.findOne({ empresa: empresa, cnpj: response.data.nfeProc.NFe.infNFe.emit.CNPJ, codigo: item.prod.cProd })
                if (itemInsumoDePara != "" && itemInsumoDePara != undefined) {
                  lista.push(
                    {
                      insumo: itemInsumoDePara.insumo,
                      quantidade: item.prod.qTrib,
                    }
                  )
                  jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
                }

                jsonRetorno.status = 200

              } else {
                throw "Erro Inesperado"
              }
            }

            retorno.lista = lista
          } else {
            jsonRetorno.json = { descricao: "nota não existe", status: false }

          }
        }, (error) => {
          console.log("error: " + error)
          jsonRetorno.json = { descricao: error, status: false }
        })
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
}

module.exports = notafiscal;