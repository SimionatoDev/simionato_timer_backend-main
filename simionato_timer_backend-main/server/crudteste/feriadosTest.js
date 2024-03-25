const db = require('../infra/database');
const feriadoSrv = require('../services/feriadoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {


    datafer = null;

    const feriado = {
        id_empresa: 1,
        datafer: shared.formatDate(Date.now()),
        descricao: 'FERIADO DO MARCÃO'
    }

    try {

        await feriadoSrv.deleteFeriado(feriado.id_empresa, feriado.datafer);

        const retorno = await feriadoSrv.insertFeriado(feriado);

        datafer = retorno.datafer;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return datafer;
}

Atualizacao = async function(datafer) {


    const feriado = await feriadoSrv.getFeriado(1, datafer);

    feriado.descricao = 'FERIADO ALTERADO';

    try {
        const retorno = await feriadoSrv.updateFeriado(feriado);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Feriado Não Encontrado..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(datafer) {


    try {

        const retorno = await feriadoSrv.getFeriado(1, datafer);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Feriado Não Encontrado..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await feriadoSrv.getFeriados();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Feriados Não Encontrados..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(codigo) {

    try {


        await feriadoSrv.deleteFeriado(1, codigo);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    datafer = null;

    datafer = await Inclusao();

    if (datafer != null) {

        await Atualizacao(datafer);

        await consultaUnitaria(datafer);

        await consultaGenerica();

        await Exclusao(datafer);

    }
}