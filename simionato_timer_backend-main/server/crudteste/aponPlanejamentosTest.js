const db = require('../infra/database');
const aponPlanejamentoSrv = require('../services/aponPlanejamentoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {

    chave = 0;

    const aponPlanejamento = {
        id_empresa: 1,
        id: 0,
        id_projeto: 1,
        id_tarefa: '001000',
        id_trabalho: '001001',
        id_resp: 1,
        id_exec: 1,
        inicial: Date.now(),
        final: Date.now(),
        obs: "Apontamento Execução",
        horasapon: 4,
        encerra: "N"
    }

    try {

        const retorno = await aponPlanejamentoSrv.insertAponPlanejamento(aponPlanejamento);

        chave = retorno.id;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return chave;
}

Atualizacao = async function(chave) {

    const aponPlanejamento = await aponPlanejamentoSrv.getAponPlanejamento(1, chave);

    aponPlanejamento.obs = 'Apontamento Alterado !!!!';

    try {
        const retorno = await aponPlanejamentoSrv.updateAponPlanejamento(aponPlanejamento);

        if (retorno == null) {

            console.log("Falha Na Atualização", "AponPlanejamento Não Encontrado..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(chave) {


    try {

        const retorno = await aponPlanejamentoSrv.getAponPlanejamento(1, chave);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Apontamento Não Encontrado..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await aponPlanejamentoSrv.getAponPlanejamentos();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Apontamentos Não Encontrados..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(chave) {

    try {


        await aponPlanejamentoSrv.deleteAponPlanejamento(1, chave)

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var chave = {};

    chave = await Inclusao();

    console.log(chave);


    if (chave > 0) {

        await Atualizacao(chave);

        await consultaUnitaria(chave);

        await consultaGenerica();

        await Exclusao(chave);

    }

}