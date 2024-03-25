const db = require('../infra/database');
const motivoApoSrv = require('../services/motivoApoServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {


    codigo = '';

    const motivoApo = {
        id_empresa: 1,
        codigo: '001000',
        motivo: "RH"
    }

    try {

        await motivoApoSrv.deleteMotivoApo(motivoApo.id_empresa, motivoApo.codigo);

        const retorno = await motivoApoSrv.insertMotivoApo(motivoApo);

        codigo = retorno.codigo;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return codigo;
}

Atualizacao = async function(codigo) {


    const motivoApo = await motivoApoSrv.getMotivoApo(1, codigo);

    motivoApo.motivo = 'CONSULTA MÉDICA';

    try {
        const retorno = await motivoApoSrv.updateMotivoApo(motivoApo);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Motivo Não Encontrado..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(codigo) {


    try {

        const retorno = await motivoApoSrv.getMotivoApo(1, codigo);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Motivo Não Encontrado..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await motivoApoSrv.getMotivoApos();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Motivos Não Encontrados..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(codigo) {

    try {


        await motivoApoSrv.deleteMotivoApo(1, codigo);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var codigo = "";

    codigo = await Inclusao();

    if (codigo.length > 0) {

        await Atualizacao(codigo);

        await consultaUnitaria(codigo);

        await consultaGenerica();

        await Exclusao(codigo);

    }
}