const db = require('../infra/database');
const trabalhoProjetoSrv = require('../services/trabalhoProjetoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {

    id_trabalhoProjeto = 0;

    const trabalhoProjeto = {
        id_empresa: 1,
        id: 0,
        id_projeto: 1,
        id_tarefa: 1,
        id_trabalho: 1,
        seq: 1,
        id_resp: 1,
        id_exec: 1,
        inicial: Date.now(),
        final: Date.now(),
        obs: "Trabalhos Do Projeto",
        horasplan: 10,
        horasapon: 11,
        status: '0'
    }

    try {

        const retorno = await trabalhoProjetoSrv.insertTrabalhoProjeto(trabalhoProjeto);

        id_trabalhoProjeto = retorno.id;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_trabalhoProjeto;
}

Atualizacao = async function(id_trabalhoProjeto) {

    const tarefa = await trabalhoProjetoSrv.getTrabalhoProjeto(1, id_trabalhoProjeto);

    console.log(id_trabalhoProjeto, tarefa);

    tarefa.obs = 'Tarefa Projeto Alterada...';

    console.log("Registro Alteração", tarefa);

    try {
        const retorno = await trabalhoProjetoSrv.updateTrabalhoProjeto(tarefa);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Tarefa Projeto Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id_trabalhoProjeto) {


    try {

        const retorno = await trabalhoProjetoSrv.getTrabalhoProjeto(1, id_trabalhoProjeto);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Tarefa Projeto Não Encontrada..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await trabalhoProjetoSrv.getTrabalhoProjetos();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Tarefas Projeto Não Encontradas..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id_trabalhoProjeto) {

    try {


        await trabalhoProjetoSrv.deleteTrabalhoProjeto(1, id_trabalhoProjeto);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var id_trabalhoProjeto = 0;

    id_trabalhoProjeto = await Inclusao();

    if (id_trabalhoProjeto > 0) {

        await Atualizacao(id_trabalhoProjeto);

        await consultaUnitaria(id_trabalhoProjeto);

        await consultaGenerica();

        await Exclusao(id_trabalhoProjeto);

    }
}