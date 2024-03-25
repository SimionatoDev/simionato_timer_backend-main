const motivoApoData = require('../data/motivoApoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');


const TABELA = 'MOTIVOAPO';

exports.getMotivoApo = async function(id_empresa, codigo) {
    return motivoApoData.getMotivoApo(id_empresa, codigo);
};

exports.getMotivoApos = async function(params) {

    return motivoApoData.getMotivoApos(params);
};

exports.insertMotivoApo = async function(motivoApo) {

    try {
        await regras.MotivosApo_Inclusao(motivoApo);
        validacao.Validacao(TABELA, motivoApo, parametros.MotivoApo());
        return motivoApoData.insertMotivoApo(motivoApo);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

};

exports.updateMotivoApo = async function(motivoApo) {

    try {
        await regras.MotivosApo_Alteracao(motivoApo);
        validacao.Validacao(TABELA, motivoApo, parametros.MotivoApo());
        return motivoApoData.updateMotivoApo(motivoApo);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteMotivoApo = async function(id_empresa, codigo) {

    try {
        await regras.MotivosApo_Exclusao(id_empresa, codigo);
        return motivoApoData.deleteMotivoApo(id_empresa, codigo);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }(id_empresa, codigo);

};