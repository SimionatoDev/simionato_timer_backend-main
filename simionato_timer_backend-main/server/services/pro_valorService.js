/* SERVICE projeto_valores */
const pro_valorData = require('../data/pro_valorData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');
const TABELA = 'PROJETO_VALORES';
/* CRUD GET SERVICE */
exports.getPro_Valor = async function(id_empresa, id) {
    return pro_valorData.getPro_Valor(id_empresa, id);
};
/* CRUD GET ALL SERVICE */
exports.getPro_Valores = async function(params) {
    return pro_valorData.getPro_Valores(params);
};
//* CRUD - INSERT - SERVICE */
exports.insertPro_Valor = async function(pro_valor) {
    try {
        //await regras.Clientes_Inclusao(cliente);
        //validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return pro_valorData.insertPro_Valor(pro_valor);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};
//* CRUD - UPDATE - SERVICE */
exports.updatePro_Valor = async function(pro_valor) {
    try {
        //await regras.Pro_Valores_Inclusao(pro_valor);
        //validacao.Validacao(TABELA, pro_valor, parametros.Pro_Valores());
        return pro_valorData.updatePro_Valor(pro_valor);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};
//* CRUD - DELETE - SERVICE */
exports.deletePro_Valor = async function(id_empresa, id) {
    try {
        //await regras.Pro_Valores_Exclusao(id_empresa,id);
        //validacao.Validacao(TABELA, pro_valor, parametros.Pro_Valores());
        return pro_valorData.deletePro_Valor(id_empresa, id);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};