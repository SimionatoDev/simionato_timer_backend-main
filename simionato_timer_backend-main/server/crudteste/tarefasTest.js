const db = require('../infra/database');

const tarefaSrv = require('../services/tarefaServices');

const codigoTeste = "888xxx";

html = "";

Inclusao = async function() {

    await tarefaSrv.deleteTarefa(1, codigoTeste);

    const tarefa = { id_empresa: 1, codigo: codigoTeste, descricao: 'teste' };

    try {

        const retorno = await tarefaSrv.insertTarefa(tarefa);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

}

Atualizacao = async function() {

    const tarefa = { id_empresa: 1, codigo: codigoTeste, descricao: 'Registro Alterado..' };

    try {
        const retorno = await tarefaSrv.updateTarefa(tarefa);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Tarefa Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function() {


    const tarefa = { id_empresa: 1, codigo: codigoTeste, descricao: 'Registro Alterado..' };

    try {

        const retorno = await tarefaSrv.getTarefa(tarefa.id_empresa, tarefa.codigo);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Tarefa Não Encontrada..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await tarefaSrv.getTarefas();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Tarefas Não Encontradas..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function() {

    try {

        await tarefaSrv.deleteTarefa(1, codigoTeste);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {

    await Inclusao();

    /*
    await Atualizacao();

    await consultaUnitaria();

    await consultaGenerica();

    await Exclusao();
*/
}