const Dado = require('../dado/receita');
class receita {
    static async get(_id) {
        var jsonRetorno = { status: 500, json: {} };
        try {
            var item = await Dado.findById(_id)
            if (item.registro == "" || item.registro == undefined) {
                item.registro = []
            }
            var dateTime = new Date()

            item.registro.push({
                data: dateTime.toLocaleDateString(),
                hora: dateTime.toLocaleTimeString(),
                usuario: "lucas",
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

module.exports = receita;