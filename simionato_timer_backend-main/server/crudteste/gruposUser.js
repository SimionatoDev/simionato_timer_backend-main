const db = require('../infra/database');
const grupoUserSrv = require('../services/grupoUserServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {


    id_grupo = 0;

    const grupoUser = {
        id_empresa: 1,
        id: 0,
        grupo: "DIRETOR"
    }

    try {

        const retorno = await grupoUserSrv.insertGrupoUser(grupoUser);

        id_grupo = retorno.id;

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_grupo;
}

Atualizacao = async function(id_grupo) {


    const grupoUser = await grupoUserSrv.getGrupoUser(1, id_grupo);

    grupoUser.grupo = 'AUDITOR';

    try {
        const retorno = await grupoUserSrv.updateGrupoUser(grupoUser);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Grupo Não Encontrado..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id_grupo) {


    try {

        const retorno = await grupoUserSrv.getGrupoUser(1, id_grupo);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Grupo Não Encontrado..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await grupoUserSrv.getGrupoUsers();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Grupos Não Encontrados..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id_grupo) {

    try {


        await grupoUserSrv.deleteGrupoUser(1, id_grupo);

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