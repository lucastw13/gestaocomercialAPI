const Dado = require('../dado/receita');
class registrarreceita {
    static async post(body) {
        var jsonRetorno = { status: 500, json: {} };
        try {
            var item = await Dado.findById(body.receita)
            if (item.registro == "" || item.registro == undefined) {
                item.registro = []
            }

            item.registro.push({
                data: body.data,
                hora: body.hora,
                usuario: body.usuario,
                insumo: item.insumo
            })

            var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item)
            jsonRetorno.status = 201
            jsonRetorno.json = { status: true, descricao: "receita atualizada com sucesso!", item: itemAtualizado }
        } catch (error) {
            jsonRetorno.status = 500
            jsonRetorno.json = { status: false, descricao: error }
        }
        return jsonRetorno
    }

}

module.exports = registrarreceita;