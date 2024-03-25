/* SERVICE estruturas */
const estruturasData = require('../data/estruturasData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');
const TABELA = 'ESTRUTURAS';

/* CRUD GET SERVICE */
exports.getEstrutura = async function(id_empresa, conta, versao, subconta) {
    return estruturasData.getEstrutura(id_empresa, conta, versao, subconta);
};
/* CRUD GET CONTA SERVICE */
exports.getConta = async function(id_empresa, conta, versao) {
    return estruturasData.getConta(id_empresa, conta, versao);
};
/* CRUD GET ALL SERVICE */
exports.getEstruturas = async function(params) {
    return estruturasData.getEstruturas(params);
};

//* CRUD - INSERT - SERVICE */
exports.insertEstrutura = async function(estrutura) {
    try {
        //await regras.Clientes_Inclusao(cliente);
        //validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return estruturasData.insertEstrutura(estrutura);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

//* CRUD - UPDATE - SERVICE */
exports.updateEstrutura = async function(estrutura) {
    try {
        //await regras.GrusEco_Alteracao(grupoEco);
        //validacao.Validacao(TABELA, grupoEco, parametros.GrupoEco());
        return estruturasData.updateEstrutura(estrutura);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.saveAllEstrutura = async function(estruturas) {
    try {
        //Verificar se a estrutura existe
        //await regras.Clientes_Inclusao(cliente);
        //validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return estruturasData.saveAllEstrutura(estruturas);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


/* CRUD DELETE SERVICE */
exports.deleteEstrutura = async function(id_empresa, conta, versao, subconta) {
    try {
        await estruturasData.deleteEstrutura(id_empresa, conta, versao, subconta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteAllEstrutura = async function(id_empresa, conta, versao) {
    try {
        console.log('deleteAllEstrutura');
        await regras.Atividades_Delete_Estrutura(id_empresa, conta, versao);
        await estruturasData.deleteAllEstrutura(id_empresa, conta, versao);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


/* CRUD LAST ESTRUTURA SERVICE */
exports.lastConta = async function(id_empresa) {
    try {
        return estruturasData.lastConta(id_empresa);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

/* CRUD LAST SUBCONTA SERVICE */
exports.lastSubConta = async function(id_empresa, conta, versao, subconta, nivel) {
    try {
        return estruturasData.lastSubConta(id_empresa, conta, versao, subconta, nivel);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

/* MUDA O STATUS */
exports.mudaStatus = async function(id_empresa, conta, versao, status) {
    try {
        return estruturasData.mudaStatus(id_empresa, conta, versao, status);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

/* COPIA ESTRUTURA */
exports.Estrutura_header = async function(id_empresa, conta, versao, controle, descricao) {
    try {
        return estruturasData.Estrutura_header(id_empresa, conta, versao, controle, descricao);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


/* COPIA ESTRUTURA */
exports.getEstrutura_histo = async function(par) {
    try {
        return estruturasData.getEstrutura_Histo(par);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};