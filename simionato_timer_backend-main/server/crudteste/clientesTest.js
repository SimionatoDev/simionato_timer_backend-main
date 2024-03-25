const db = require('../infra/database');
const clienteSrv = require('../services/clienteServices');

html = "";

Inclusao = async function() {

    id_cliente = 0;

    const cliente = {
        id_empresa: 1,
        id: 0,
        cnpj_cpf: "",
        razao: "CLIENTE DA INCLUSÃO",
        fantasi: "",
        inscri: "",
        cadastr: Date.now(),
        ruaf: "",
        nrof: "",
        complementof: "",
        bairrof: "",
        cidadef: "",
        uff: "SP",
        cepf: "",
        tel1: "",
        tel2: "",
        emailf: "",
        obs: "",
        gru_econo: 1
    }

    try {

        const retorno = await clienteSrv.insertCliente(cliente);

        id_cliente = retorno.id;

        console.log('id_cliente', id_cliente);

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_cliente;
}

Atualizacao = async function(id_cliente) {


    cliente = clienteSrv.getCliente(1, id_cliente)

    try {
        const retorno = await clienteSrv.updateCliente(1, cliente);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Cliente Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id_cliente) {


    try {

        const retorno = await clienteSrv.getCliente(1, id);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Cliente Não Encontrada..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await clienteSrv.getClientes();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Clientes Não Encontradas..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id_cliente) {

    try {


        await clienteSrv.deleteCliente(1, id_cliente);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var id = 0;

    id = await Inclusao();

    if (id > 0) {


        await Atualizacao(id);

        await consultaUnitaria(id);

        await consultaGenerica();

        await Exclusao(id);

    }

}