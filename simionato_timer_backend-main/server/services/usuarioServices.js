const usuarioData = require('../data/usuarioData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');

const TABELA = 'USUARIOS';

exports.getUsuario = async function(id_empresa, id) {
    return usuarioData.getUsuario(id_empresa, id);
};

exports.getUsuarioByEmail = async function(id_empresa, email) {
    return usuarioData.getUsuarioByEmail(id_empresa, email);
};

exports.getUsuarioByEmail = async function(id_empresa, email) {
    return usuarioData.getUsuarioByEmail(id_empresa, email);
};



exports.getUsuarios = async function(params) {
    return usuarioData.getUsuarios(params);
};


exports.getUsuariosByProjeto = async function(params) {
    return usuarioData.getUsuariosByProjeto(params);
};


exports.insertUsuario = async function(usuario) {

    try {
        await regras.Usuarios_Inclusao(usuario);
        validacao.Validacao(TABELA, usuario, parametros.Usuarios());
        return usuarioData.insertUsuario(usuario);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateUsuario = async function(usuario) {
    try {
        await regras.Usuarios_Alteracao(usuario);
        validacao.Validacao(TABELA, usuario, parametros.Usuarios());
        return usuarioData.updateUsuario(usuario);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteUsuario = async function(id_empresa, id) {
    try {
        await regras.Usuarios_Exclusao(id_empresa, id);
        return usuarioData.deleteUsuario(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.existeUsuariosByGrupo = function(id_empresa, id_grupo) {
    return usuarioData.existeUsuariosByGrupo(id_empresa, id_grupo);
};

exports.usarioHorasExec = function(params) {
    return usuarioData.usarioHorasExec(params);
};

exports.getUsuariosByPonte = function(params) {
    return usuarioData.getUsuariosByPonte(params);
};