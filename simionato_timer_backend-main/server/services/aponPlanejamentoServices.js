const AponPlanejamentoData = require('../data/aponPlanejamentoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');

const TABELA = 'APONSPLANEJAMENTO';

exports.getAponPlanejamento = async function(id_empresa, id) {

    return AponPlanejamentoData.getAponPlanejamento(id_empresa, id);
};

exports.getAponPlanejamentos = async function(params) {

    return AponPlanejamentoData.getAponPlanejamentos(params);

};

exports.getAponAgendaPlanejamentos = async function(id_empresa, id_exec, data) {

    return AponPlanejamentoData.getAponAgendaPlanejamentos(id_empresa, id_exec, data);

};


exports.insertAponPlanejamento = async function(AponPlanejamento) {

    try {
        await regras.Apons_Planejamento_Inclusao(AponPlanejamento);
        validacao.Validacao(TABELA, AponPlanejamento, parametros.AponPlanejamento());
        return AponPlanejamentoData.insertAponPlanejamento(AponPlanejamento);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateAponPlanejamento = async function(AponPlanejamento) {


    try {
        await regras.Apons_Planejamento_Alteracao(AponPlanejamento);
        validacao.Validacao(TABELA, AponPlanejamento, parametros.AponPlanejamento());
        return AponPlanejamentoData.updateAponPlanejamento(AponPlanejamento);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateAponPlanejamentoObs = async function(id_empresa, id, obs) {


    try {
        return AponPlanejamentoData.updateAponPlanejamentoObs(id_empresa, id, obs);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteAponPlanejamento = async function(id_empresa, id) {

    try {
        await regras.Apons_Planejamento_Exclusao(id_empresa, id);
        return AponPlanejamentoData.deleteAponPlanejamento(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.existeAponPlanejamentoAtividadeUnica = function(id_empresa, id_projeto, conta, versao, subconta) {
    try {
        return AponPlanejamentoData.existeAponPlanejamentoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.existeAponPlanejamentoAtividade = function(id_empresa, id_projeto) {
    try {
        return AponPlanejamentoData.existeAponPlanejamentoAtividade(id_empresa, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};