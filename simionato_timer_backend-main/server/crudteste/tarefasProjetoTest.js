const db = require('../infra/database');
const tarefaProjetoSrv = require('../services/tarefaProjetoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {

    id_tarefaProjeto = 0;

    const tarefaProjeto = {
        id_empresa: 1,
        id: 0,
        id_projeto: 1,
        id_tarefa: '00100',
        id_resp: 1,
        seq: 1,
        inicial: Date.now(),
        final: Date.now(),
        obs: 'Tarefa Projeto Teste',
        horasplan: 10,
        horasapon: 10,
        status: '0'
    }

    try {

        const retorno = await tarefaProjetoSrv.insertTarefaProjeto(tarefaProjeto);

        id_tarefaProjeto = retorno.id;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_tarefaProjeto;
}

Atualizacao = async function(id_tarefaProjeto) {

    const tarefa = await tarefaProjetoSrv.getTarefaProjeto(1, id_tarefaProjeto);

    console.log(id_tarefaProjeto, tarefa);

    tarefa.obs = 'Tarefa Projeto Alterada...';

    console.log("Registro Alteração", tarefa);

    try {
        const retorno = await tarefaProjetoSrv.updateTarefaProjeto(tarefa);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Tarefa Projeto Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id_tarefaProjeto) {


    try {

        const retorno = await tarefaProjetoSrv.getTarefaProjeto(1, id_tarefaProjeto);

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
        const lsretorno = await tarefaProjetoSrv.getTarefaProjetos();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Tarefas Projeto Não Encontradas..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id_tarefaProjeto) {

    try {


        await tarefaProjetoSrv.deleteTarefaProjeto(1, id_tarefaProjeto);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var id_tarefaProjeto = 0;

    id_tarefaProjeto = await Inclusao();

    if (id_tarefaProjeto > 0) {

        await Atualizacao(id_tarefaProjeto);

        await consultaUnitaria(10);

        await consultaGenerica();

        await Exclusao(id_tarefaProjeto);

    }
}