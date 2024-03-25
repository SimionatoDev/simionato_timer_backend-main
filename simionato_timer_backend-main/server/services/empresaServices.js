const empresaData = require('../data/empresaData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');


const TABELA = 'CLIENTES';

exports.getEmpresa = async function(id) {
    return empresaData.getEmpresa(id);
};


exports.getEmpresas = async function(params) {
    return empresaData.getEmpresas(params);
};

exports.insertEmpresa = async function(empresa) {

    try {

        await regras.Empresas_Inclusao(empresa);

        validacao.Validacao('EMPRESAS', empresa, parametros.Empresas());

        return empresaData.insertEmpresa(empresa);


    } catch (err) {

        throw new erroDB.UserException(err.erro, err);

    }
};

exports.updateEmpresa = async function(empresa) {
    try {

        await regras.Empresas_Alteracao(empresa);

        validacao.Validacao('EMPRESAS', empresa, parametros.Empresas());

        return empresaData.updateEmpresa(empresa);


    } catch (err) {

        throw new erroDB.UserException(err.erro, err);

    }
};

exports.deleteEmpresa = async function(id) {

    try {
        await regras.Empresas_Exclusao(id);
        return empresaData.deleteEmpresa(id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

//funcões de teste
exports.insertData = async function() {

    try {
        return empresaData.insertData();
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


exports.getDatas = async function() {

    try {
        return empresaData.getDatas();
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};