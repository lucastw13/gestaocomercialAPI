
const axios = require('axios');
const DadoInsumoDePara = require('../dado/insumodepara');
const DadoInsumo = require('../dado/insumo');
class notafiscal {
  static async get(chave, entidade2, empresa) {
    try {
      var jsonRetorno = { status: 500, json: {} };
      var token = process.env.TOKEN_CONSULTA_NOTA
      var config = {
        headers: {
          Accept: "application/json",
          authorization: "Bearer " + token
        }
      }
      jsonRetorno.status = 200
      //var url = "https://gateway.apiserpro.serpro.gov.br/consulta-nfe-df-trial/api/v1/nfe/" + chave
      var url = process.env.URL_CONSULTA_NOTA + chave
      await axios.get(url, config)
        .then(async response => {
          if (response.data != null) {
            var retorno = {}
            var lista = []

            for (var item of response.data.nfeProc.NFe.infNFe.det) {
              if ((entidade2 == "" || entidade2 == undefined) && (empresa == "" || empresa == undefined)) {
                
                jsonRetorno.json = { descricao: "consulta realizada com sucesso", status: true, fornecedor:{cnpj: response.data.nfeProc.NFe.infNFe.emit.CNPJ,nome:response.data.nfeProc.NFe.infNFe.emit.xFant}, lista: lista }
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
                var itemInsumoDePara = await DadoInsumoDePara.findOne({ fornecedor:{cnpj: response.data.nfeProc.NFe.infNFe.emit.CNPJ}, codigo: item.prod.cProd })
                if (itemInsumoDePara != "" && itemInsumoDePara != undefined) {
                  var itemInsumo = await DadoInsumo.findById(itemInsumoDePara.insumo)
                  lista.push(
                    {
                      insumo: itemInsumoDePara.insumo,
                      insumoDescricao: itemInsumo.descricao,
                      quantidade: item.prod.qTrib,
                      valor: item.prod.vProd,
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