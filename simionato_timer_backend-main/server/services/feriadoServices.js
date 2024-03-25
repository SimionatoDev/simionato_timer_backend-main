const feriadoData = require('../data/feriadoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');


const TABELA = 'FERIADOS';


exports.getFeriado = async function(id_empresa, id_usuario, id_tipo, data) {
    return feriadoData.getFeriado(id_empresa, id_usuario, id_tipo, data);
};


exports.getPonte = async function(id_empresa, data) {
    return feriadoData.getPonte(id_empresa, data);
};

exports.getFeriados = async function(params) {
    return feriadoData.getFeriados(params);
};

exports.insertFeriado = async function(feriado) {
    try {
        const lanca = await regras.Feriados_Inclusao(feriado);
        feriado.nlanc_manha = lanca.nlanc01;
        feriado.nlanc_tarde = lanca.nlanc02;
        validacao.Validacao(TABELA, feriado, parametros.Feriados());
        return feriadoData.insertFeriado(feriado);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateFeriado = async function(feriado) {
    try {
        await regras.Feriados_Alteracao(feriado);
        validacao.Validacao(TABELA, feriado, parametros.Feriados());
        return feriadoData.updateFeriado(feriado);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updatePonte = async function(ponte) {
    try {
        await regras.Feriados_Alteracao_Ponte(ponte);
        return feriadoData.updatePonte(ponte);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteFeriado = async function(id_empresa, id_usuario, id_tipo, data) {
    try {
        await regras.Feriados_Exclusao(id_empresa, id_usuario, id_tipo, data);
        return feriadoData.deleteFeriado(id_empresa, id_usuario, id_tipo, data);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

};

exports.deletePonte = async function(id_empresa, data) {
    try {
        await regras.Feriados_Exclusao_Ponte(id_empresa, data);
        return feriadoData.deletePonte(id_empresa, data)
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

};