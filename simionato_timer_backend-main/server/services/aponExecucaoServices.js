const aponExecucaoData = require('../data/aponExecucaoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const regras = require('../util/regrasdenegocio');
const erroDB = require('../util/userfunctiondb');


const TABELA = 'APONS_EXECUCAO';

exports.getAponExecucao = async function(id_empresa, id) {

    return aponExecucaoData.getAponExecucao(id_empresa, id);
};

exports.getAponExecucaoByNlanc = async function(id_empresa, nlanc) {

    return aponExecucaoData.getAponExecucaoByNlanc(id_empresa, nlanc);
};


exports.getAponExecucoes = async function(params) {

    return aponExecucaoData.getAponExecucoes(params);

};

exports.ExisteLancamentoNestaHora = async function(aponExecucao, operacao) {
    return aponExecucaoData.ExisteLancamentoNestaHora(aponExecucao, operacao);
}

exports.ExisteLancamentoNestaHoraExato = async function(aponExecucao, operacao) {
    return aponExecucaoData.ExisteLancamentoNestaHoraExato(aponExecucao, operacao);
}

exports.insertAponExecucao = async function(aponExecucao) {

    try {

        await regras.Apons_Execucao_Inclusao(aponExecucao);

        validacao.Validacao(TABELA, aponExecucao, parametros.AponExecucao());

        return aponExecucaoData.insertAponExecucao(aponExecucao);

    } catch (err) {

        throw new erroDB.UserException(err.erro, err);

    }

};

exports.updateAponExecucao = async function(aponExecucao) {

    try {

        await regras.Apons_Execucao_Alteracao(aponExecucao);

        validacao.Validacao(TABELA, aponExecucao, parametros.AponExecucao());

        return aponExecucaoData.updateAponExecucao(aponExecucao);

    } catch (err) {

        throw new erroDB.UserException(err.erro, err);
    }

};

exports.deleteAponExecucao = async function(id_empresa, id) {
    try {
        await regras.Apons_Execucao_Exclusao(id_empresa, id);
        return aponExecucaoData.deleteAponExecucao(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteAponExecucaoByNlanc = async function(id_empresa, nlanc) {
    try {
        await regras.Apons_Execucao_ExclusaoByNlanc(id_empresa, nlanc);
        return aponExecucaoData.deleteAponExecucaoByNlanc(id_empresa, nlanc);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.existeAponExecucaoAtividadeUnica = function(id_empresa, id_projeto, conta, versao, subconta) {
    try {
        return aponExecucaoData.existeAponExecucaoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

}

exports.existeAponExecucaoAtividade = function(id_empresa, id_projeto) {
    try {
        return aponExecucaoData.existeAponExecucaoAtividade(id_empresa, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
}

exports.getAponExecByExecutor = function(id_empresa, id_usuario, data_ref) {
    try {
        return aponExecucaoData.getAponExecByExecutor(id_empresa, id_usuario, data_ref);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }


}