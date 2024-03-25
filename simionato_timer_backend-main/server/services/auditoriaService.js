/* SERVICE auditorias */
const auditoriaData = require('../data/auditoriaData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');
const TABELA = 'AUDITORIAS';
/* CRUD GET SERVICE */
exports.getAuditoria = async function(id_empresa, id) {
    return auditoriaData.getAuditoria(id_empresa, id);
};
/* CRUD GET ALL SERVICE */
exports.getAuditorias = async function(params) {
    return auditoriaData.getAuditorias(params);
};
//* CRUD - INSERT - SERVICE */
exports.insertAuditoria = async function(auditoria) {
    try {
        //await regras.Clientes_Inclusao(cliente);
        //validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return auditoriaData.insertAuditoria(auditoria);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};
//* CRUD - UPDATE - SERVICE */
exports.updateAuditoria = async function(auditoria) {
    try {
        //await regras.Auditorias_Inclusao(auditoria);
        //validacao.Validacao(TABELA, auditoria, parametros.Auditorias());
        return auditoriaData.updateAuditoria(auditoria);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


//* CRUD - DELETE - SERVICE */
exports.deleteAuditoria = async function(id_empresa, id) {
    try {
        //await regras.Auditorias_Exclusao(id_empresa,id);
        //validacao.Validacao(TABELA, auditoria, parametros.Auditorias());
        return auditoriaData.deleteAuditoria(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};