const db = require('../infra/database');
const aponExecucaoSrv = require('../services/aponExecucaoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {

    chave = 0;

    const aponExecucao = {
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
        encerramento: "N"
    }

    try {

        const retorno = await aponExecucaoSrv.insertAponExecucao(aponExecucao);

        chave = retorno.id;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return chave;
}

Atualizacao = async function(chave) {

    const aponExecucao = await aponExecucaoSrv.getAponExecucao(1, chave);

    aponExecucao.obs = 'Apontamento Alterado !!!!';

    try {
        const retorno = await aponExecucaoSrv.updateAponExecucao(aponExecucao);

        if (retorno == null) {

            console.log("Falha Na Atualização", "AponExecucao Não Encontrado..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(chave) {


    try {

        const retorno = await aponExecucaoSrv.getAponExecucao(1, chave);

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
        const lsretorno = await aponExecucaoSrv.getAponExecucoes();

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

        await aponExecucaoSrv.deleteAponExecucao(chave)

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