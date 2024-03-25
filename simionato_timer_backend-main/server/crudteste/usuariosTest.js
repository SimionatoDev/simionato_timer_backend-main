const db = require('../infra/database');
const usuarioSrv = require('../services/usuarioServices');
const shared = require('../util/shared');

html = "";

Inclusao = async function() {

    id_usuario = 0;

    const usuario = {
        id_empresa: 1,
        id: id_usuario,
        razao: "usuario teste",
        cnpj_cpf: "",
        cadastr: shared.formatDate(Date.now()),
        rua: "",
        nro: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        tel1: "",
        tel2: "",
        email: "",
        senha: "",
        pasta: "",
        grupo: 1
    }

    try {

        const retorno = await usuarioSrv.insertUsuario(usuario);

        id_usuario = retorno.id;

        console.log('id_usuario', id_usuario);

        console.log(retorno);

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_usuario;
}

Atualizacao = async function(id_usuario) {

    const usuario = await usuarioSrv.getUsuario(1, id_usuario);

    console.log(usuario);

    usuario.razao = 'Usuário Alterado !!!!';

    try {
        const retorno = await usuarioSrv.updateUsuario(usuario);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Cliente Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id_usuario) {


    try {

        const retorno = await usuarioSrv.getUsuario(1, id_usuario);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Cliente Não Encontrada..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await usuarioSrv.getUsuarios();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Clientes Não Encontradas..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id_usuario) {

    try {


        await usuarioSrv.deleteUsuario(1, id_usuario);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {


    var id_usuario = 0;

    id_usuario = await Inclusao();

    if (id_usuario > 0) {

        await Atualizacao(id_usuario);

        await consultaUnitaria(id_usuario);

        await consultaGenerica();

        await Exclusao(id_usuario);

    }
}