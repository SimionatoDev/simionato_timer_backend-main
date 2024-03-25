const db = require('../infra/database');
const projetoSrv = require('../services/projetoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {

    id_projeto = 0;

    const projeto = {
        id_empresa: 1,
        id: 0,
        id_cliente: 1,
        id_diretor: 1,
        dataprop: Date.now(),
        dataproj: Date.now(),
        dataenc: Date.now(),
        descricao: "PROJETO TESTE",
        horasve: 10,
        horaspl: 10,
        horasex: 10,
        status: 0
    }

    try {

        const retorno = await projetoSrv.insertProjeto(projeto);

        id_projeto = retorno.id;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_projeto;
}

Atualizacao = async function(id_projeto) {


    const projeto = await projetoSrv.getProjeto(1, id_projeto);

    projeto.descricao = 'Descrição Alterada !';

    try {
        const retorno = await projetoSrv.updateProjeto(projeto);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Projeto Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id_projeto) {


    try {

        const retorno = await projetoSrv.getProjeto(1, id_projeto);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Projeto Não Encontrado..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await projetoSrv.getProjetos();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Projetos Não Encontrados..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id_projeto) {

    try {


        await projetoSrv.deleteProjeto(1, id_projeto);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var id_projeto = 0;

    id_projeto = await Inclusao();

    if (id_projeto > 0) {

        await Atualizacao(id_projeto);

        await consultaUnitaria(id_projeto);

        await consultaGenerica();

        await Exclusao(id_projeto);

    }
}