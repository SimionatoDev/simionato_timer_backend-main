const grupoUserData = require('../data/grupoUserData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const regras = require('../util/regrasdenegocio');
const erroDB = require('../util/userfunctiondb');

const TABELA = 'GRUPO_USER';


exports.getGrupoUser = async function(id_empresa, id) {
    return grupoUserData.getGrupoUser(id_empresa, id);
};

exports.getGrupoUsers = async function(params) {
    return grupoUserData.getGrupoUsers(params);
};

exports.insertGrupoUser = async function(grupoUser) {

    try {

        await regras.GrusUser_Inclusao(grupoUser);
        validacao.Validacao(TABELA, grupoUser, parametros.GrupoUser());
        return grupoUserData.insertGrupoUser(grupoUser);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateGrupoUser = async function(grupoUser) {

    try {
        await regras.GrusUser_Alteracao(grupoUser);
        validacao.Validacao(TABELA, grupoUser, parametros.GrupoUser());
        return grupoUserData.updateGrupoUser(grupoUser);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteGrupoUser = async function(id_empresa, id) {

    try {
        await regras.GrusUser_Exclusao(id_empresa, id);
        return grupoUserData.deleteGrupoUser(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

};