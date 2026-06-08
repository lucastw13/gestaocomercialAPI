const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const Dado = require('../dado/documentocompra');
const DadoInsumo = require('../dado/insumo');
class documentocompra {
  static async get(_id, entidade, pEmpresa) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
      if (item == "" || item == undefined) {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: false, descricao: "documento compra não encontrado!" }
      } else {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
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
      jsonRetorno.json = { status: true, descricao: "documento compra deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async post(body) {
          return { status: false, descricao:process.env.TOKEN_GEMINI+" - "+process.env.URL_GEMINI }
          /*
    try {

      var jsonRetorno = { status: 500, json: {} };
      var item = body
      var caminhoPrompt = path.join(__dirname, '..', 'prompt', 'documentocompra');
      var prompt = await fs.readFile(caminhoPrompt, 'utf8');
      var prompt = JSON.stringify(prompt+JSON.stringify(await DadoInsumo.find()))
      var requestBody = {
                      contents: [
                        {
                          parts: [
                            {
                              text: prompt
                              },
                            {
                              inlineData: {
                                mimeType: "application/pdf",
                                data: item.base64
                                }
                            }
                          ]
                        }
                      ],
                      generationConfig: {
                        responseMimeType: "application/json",
                        temperature: 0.1
                      }
                    }
      var requestHeader = {"x-goog-api-key":process.env.TOKEN_GEMINI,"Content-Type":"application/json"}
      var response = await axios.post(process.env.URL_GEMINI,requestBody,{headers:requestHeader})

      var resonseJson = JSON.parse(response.data.candidates[0].content.parts[0].text)
      item.chaveAcesso = resonseJson.chaveAcesso
      item.insumo = resonseJson.insumo
      var itemCriado = await Dado.create(item);
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "documento compra criado com sucesso!", item: itemCriado }
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
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "documento compra atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno*/
  }

}

module.exports = documentocompra;