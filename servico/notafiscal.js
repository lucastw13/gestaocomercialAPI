
const axios = require('axios');
class notafiscal {
  static async get(notafiscal) {
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
      var url = "https://gateway.apiserpro.serpro.gov.br/consulta-nfe-df-trial/api/v1/nfe/" + notafiscal
      await axios.get(url, config)
        .then(response => {
          if (response.data != null) {
            var retorno = {}
            retorno.cnpj = response.data.nfeProc.NFe.infNFe.emit.CNPJ
            var lista = []

            for (var item of response.data.nfeProc.NFe.infNFe.det) {
              lista.push(
                {
                  produto: {
                    descricao     : item.prod.xProd,
                    codigo        : item.prod.cProd,
                    quantidade    : item.prod.qTrib,
                    unidadeMedida : item.prod.uTrib,
                    valorUnitario : item.prod.vUnTrib,
                    valor         : item.prod.vProd
                  }
                }
              )
            }

            retorno.lista = lista


            jsonRetorno.json = { descricao: "consulta realizada com sucesso", status: true, notafiscal: retorno }
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