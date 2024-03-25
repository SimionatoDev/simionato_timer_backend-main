/* SERVICE titulos_projeto */
const titulo_projetoData = require('../data/titulo_projetoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');
const shared = require('../util/shared');

const TABELA = 'TITULOS_PROJETO';
/* CRUD GET SERVICE */
exports.getTitulo_Projeto = async function(id_empresa, id_projeto, data_vencto) {
    return titulo_projetoData.getTitulo_Projeto(id_empresa, id_projeto, data_vencto);
};

/* CRUD GET ALL SERVICE */
exports.getTitulos_Projeto = async function(params) {
    return titulo_projetoData.getTitulos_Projeto(params);
};

//* CRUD - INSERT - SERVICE */
exports.insertTitulo_Projeto = async function(titulo_projeto) {
    try {
        await regras.Titulo_Projeto_Inclusao(titulo_projeto);
        validacao.Validacao(TABELA, titulo_projeto, parametros.TITULOS_PROJETO());
        return titulo_projetoData.insertTitulo_Projeto(titulo_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

//* CRUD - UPDATE - SERVICE */
exports.updateTitulo_Projeto = async function(titulo_projeto) {
    try {
        await regras.Titulo_Projeto_Alteracao(titulo_projeto);
        validacao.Validacao(TABELA, titulo_projeto, parametros.TITULOS_PROJETO());
        return titulo_projetoData.updateTitulo_Projeto(titulo_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

//* CRUD - DELETE - SERVICE */
exports.deleteTitulo_Projeto = async function(id_empresa, id_projeto, data_vencto) {
    try {
        await regras.Titulo_Projeto_Exclusao(id_empresa, id_projeto, data_vencto);
        return titulo_projetoData.deleteTitulo_Projeto(id_empresa, id_projeto, data_vencto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.getResumoProjetosTitulos = async function(iparams) {
    return titulo_projetoData.getResumoProjetosTitulos(params);
};