const db = require('../infra/database');
const empresaSrv = require('../services/empresaServices');

const id_empresa = 0;

html = "";

Inclusao = async function() {

    id = 0;

    const empresa = {
        id: 0,
        cnpj_cpf: "",
        razao: "TESTE 01",
        fantasi: "TESTE 01",
        inscri: "",
        cadastr: Date.now(),
        enderecof: "",
        nrof: "",
        complementof: "",
        bairrof: "",
        cidadef: "",
        uff: "",
        cepf: "",
        tel1: "",
        tel2: "",
        emailf: "",
        obs: ""
    }

    try {

        const retorno = await empresaSrv.insertEmpresa(empresa);

        id = retorno.id;

        console.log("Inclusão OK");

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id;
}

Atualizacao = async function(id) {

    const empresa = await empresaSrv.getEmpresa(id);

    empresa.obs = "Empresa alterada"

    try {
        const retorno = await empresaSrv.updateEmpresa(empresa);

        if (retorno == null) {

            console.log("Falha Na Atualização", "Empresa Não Encontrada..");

        } else {

            console.log("Alteração OK", retorno);
        }

    } catch (err) {

        console.log("Falha Na Alteração..", err.message);

    }

}


consultaUnitaria = async function(id) {



    try {

        const retorno = await empresaSrv.getEmpresa(id);

        if (retorno == null) {

            console.log("Falha Na Consulta Unitária", "Empresa Não Encontrada..");

        } else {

            console.log("Consulta Unitária OK", retorno);

        }

    } catch (err) {

        console.log("Falha Na Consulta Unitária", err.message);

    }

}


consultaGenerica = async function() {

    try {
        const lsretorno = await empresaSrv.getEmpresas();

        if (lsretorno == null) {

            console.log("Falha Na Consulta Geral", "Empresas Não Encontradas..");

        } else {

            console.log("Consulta Geral OK", lsretorno);
        }

    } catch (err) {

        console.log("Falha Na Consulta Geral", err.message);

    }
}


Exclusao = async function(id) {

    try {


        await empresaSrv.deleteEmpresa(id);

        console.log("Exclusão OK");

    } catch (err) {

        console.log("Falha Na Exclusão !!", err.message);

    }
}
exports.geral = async function() {

    id = 0;

    id = await Inclusao();

    if (id > 0) {


        await Atualizacao(id);

        await consultaUnitaria(id);

        await consultaGenerica(id);

        await Exclusao(id);


    }

}