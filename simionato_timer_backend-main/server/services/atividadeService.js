/* SERVICE atividades */
const atividadeData = require('../data/atividadeData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');
const TABELA = 'ATIVIDADES';
/* CRUD GET SERVICE */
exports.getAtividade = async function(id_empresa, id) {
    return atividadeData.getAtividade(id_empresa, id);
};
/* CRUD GET ALL SERVICE */
exports.getAtividadesVazia = async function(params) {
    return atividadeData.getAtividadesVazia(params);
};
exports.getAtividades = async function(params) {
    return atividadeData.getAtividades(params);
};
//* CRUD - INSERT - SERVICE */
exports.insertAtividade = async function(atividade) {
    try {
        //await regras.Clientes_Inclusao(cliente);
        //validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return atividadeData.insertAtividade(atividade);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};
//* CRUD - UPDATE - SERVICE */
exports.updateAtividade = async function(atividade) {
    try {
        //await regras.Atividades_Inclusao(atividade);
        //validacao.Validacao(TABELA, atividade, parametros.Atividades());
        return atividadeData.updateAtividade(atividade);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.updateAtividadeHorasDir = async function(atividadeHorasDir) {
    try {
        //await regras.Atividades_Inclusao(atividade);
        //validacao.Validacao(TABELA, atividade, parametros.Atividades());
        return atividadeData.updateAtividadeHorasDir(atividadeHorasDir);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

//* CRUD - DELETE - SERVICE */
exports.deleteAtividade = async function(id_empresa, id_projeto, conta, versao, subconta) {
    try {
        await regras.Atividade_Exclusao(id_empresa, id_projeto, conta, versao, subconta);
        return atividadeData.deleteAtividade(id_empresa, id_projeto, conta, versao, subconta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

//
exports.deleteAtividadeEstrutura = async function(id_empresa, conta) {
    try {
        await regras.Atividades_Inclusao(id_empresa, conta, id_projeto);
        return atividadeData.deleteAtividadeEstrutura(id_empresa, conta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


//* ANEXA ESTRUTURA - SERVICE */
exports.anexaAtividade = async function(id_empresa, conta, versao, id_projeto, id_resp, id_exec) {
    try {
        //await regras.Atividades_Inclusao(id_empresa, conta, versao, id_projeto);
        //validacao.Validacao(TABELA, atividade, parametros.Atividades());
        return atividadeData.anexaAtividade(id_empresa, conta, versao, id_projeto, id_resp, id_exec);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};



exports.anexaAtividadev2 = async function(atividades) {
    try {
        return atividadeData.anexaAtividadev2(atividades);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


//* DESANEXA ESTRUTURA - SERVICE */
exports.desanexaAtividade = async function(id_empresa, conta, versao, id_projeto) {
    try {
        await regras.Atividades_Exclusao(id_empresa, conta, versao, id_projeto);
        return atividadeData.desanexaAtividade(id_empresa, conta, versao, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


//* EXISTE ESTRUTURA - SERVICE */
exports.existeAtividade = async function(id_empresa, id_projeto, conta, versao, subconta) {
    try {
        return atividadeData.existeAtividade(id_empresa, id_projeto, conta, versao, subconta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


exports.existeAtividades = async function(id_empresa, id_projeto, conta, versao) {
    try {
        return atividadeData.existeAtividades(id_empresa, id_projeto, conta, versao);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.existeAtividadesByProj = async function(id_empresa, id_projeto) {
    try {
        return atividadeData.existeAtividadesByProj(id_empresa, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};


exports.existeAtividadesEstrutura = async function(id_empresa, conta, versao) {
    try {
        return atividadeData.existeAtividadesEstrutura(id_empresa, conta, versao);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.setStatus = async function(id_empresa, id_projeto, id_subconta) {
    try {
        return atividadeData.setatus(id_empresa, id_projeto, id_subconta);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
};

exports.existeAtividadesByProj = async function(id_empresa, id_projeto) {
    try {
        return atividadeData.existeAtividadesByProj(id_empresa, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
}


exports.existeLancamentosSubconta = function(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
    return atividadeData.existeLancamentosSubconta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel);
}

/*
exports.existeAtividadesByProj = async function desanexarsubconta(id_empresa, id_projeto, conta, id_conta_versao, id_subconta, nivel) {
    try {
        await regras.Atividades_Exclusao(id_empresa, conta, versao, id_projeto);
        return atividadeData.existeAtividadesByProj(id_empresa, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

}
*/
exports.desanexasubconta = async function(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
    try {
        await regras.Atividades_Delete_SubConta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel);
        return atividadeData.desanexasubconta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
}