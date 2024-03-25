const projetoData = require('../data/projetoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const regras = require('../util/regrasdenegocio');
const erroDB = require('../util/userfunctiondb');

const TABELA = 'PROJETOS';


exports.getProjeto = async function(id_empresa, id) {
    return projetoData.getProjeto(id_empresa, id);
};

exports.getProjetos = async function(params) {
    return projetoData.getProjetos(params);
};


exports.getProjetosByIdEmpresa = async function(id_empresa) {
    return projetoData.getProjetosByIdEmpresa(id_empresa);
};

exports.getProjetosByIdEmpresaIdCliente = async function(id_empresa, id_cliente) {
    return projetoData.getProjetosByIdEmpresaIdCliente(id_empresa, id_cliente);
};


exports.getLastProjects = async function(params) {
    return projetoData.getLastProjects(params);
};

exports.getAgeHoras = async function(params) {
    return projetoData.getAgeHoras(params);
};


exports.insertProjeto = async function(projeto) {

    try {
        await regras.Projetos_Inclusao(projeto);
        validacao.Validacao(TABELA, projeto, parametros.Projetos());
        return projetoData.insertProjeto(projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateProjeto = async function(projeto) {

    try {
        await regras.Projetos_Alteracao(projeto);
        validacao.Validacao(TABELA, projeto, parametros.Projetos());
        return projetoData.updateProjeto(projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteProjeto = async function(id_empresa, id) {
    try {
        await regras.Projetos_Exclusao(id_empresa, id);
        return projetoData.deleteProjeto(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};