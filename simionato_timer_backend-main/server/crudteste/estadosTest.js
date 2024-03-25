const db = require('../infra/database');

const estadoSrv = require('../services/estadoServices');


html = "";

Inclusao = async function() {

    estado = '';

    await estadoSrv.deleteUf('SP', 'SÃO PAULO');

    const uf = { sigla: 'SP', estado: 'SÃO PAULO' };

    try {

        const retorno = await estadoSrv.insertUf(uf);

        console.log(retorno);

        console.log("Inclusão OK");

        estado = retorno.sigla;

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return estado;
}

Atualizacao = async function(sigla) {

    uf = await estadoSrv.getUf(sigla);

    uf.estado = 'ESTADO ALTERADO.';

    console.log("ESTADO PARA ALTERACAO", uf);

    try {
        const retorno = await estadoSrv.updateUf(uf);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Estado Não Alterado..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(sigla) {


    try {

        const retorno = await estadoSrv.getUf(sigla);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "UF Não EncontradO..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await estadoSrv.getUfs();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "UFS Não Encontrados..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(sigla) {

    try {

        await estadoSrv.deleteUf(sigla);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {

    sigla = "";

    sigla = await Inclusao();

    console.log('retorno', sigla);

    if (sigla == 'SP') {

        await Atualizacao(sigla);

        await consultaUnitaria(sigla);

        await consultaGenerica();

        await Exclusao(sigla);
    }

}