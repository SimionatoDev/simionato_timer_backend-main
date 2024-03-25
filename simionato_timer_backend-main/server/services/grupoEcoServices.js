const grupoEcoData = require('../data/grupoEcoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const regras = require('../util/regrasdenegocio');
const erroDB = require('../util/userfunctiondb');

const TABELA = 'GRUPO_ECONOMICO';

exports.getGrupoEco = async function(id_empresa, id) {
    return grupoEcoData.getGrupoEco(id_empresa, id);
};

exports.getGrupoEcos = async function(params) {
    return grupoEcoData.getGrupoEcos(params);
};


exports.insertGrupoEco = async function(grupoEco) {

    try {
        await regras.GrusEco_Inclusao(grupoEco);
        validacao.Validacao(TABELA, grupoEco, parametros.GrupoEco());
        return grupoEcoData.insertGrupoEco(grupoEco);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);

    }

};

exports.updateGrupoEco = async function(grupoEco) {
    console.log('grupoEco', grupoEco);
    try {
        await regras.GrusEco_Alteracao(grupoEco);
        validacao.Validacao(TABELA, grupoEco, parametros.GrupoEco());
        return grupoEcoData.updateGrupoEco(grupoEco);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

};

exports.deleteGrupoEco = async function(id_empresa, id) {
    try {
        await regras.GrusEco_Exclusao(id_empresa, id);
        return ""; //grupoEcoData.deleteGrupoEco(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};