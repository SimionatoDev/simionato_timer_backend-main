const clienteData = require('../data/clienteData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');


const TABELA = 'CLIENTES';


exports.getCliente = async function(id_empresa, id) {
    return clienteData.getCliente(id_empresa, id);
};

exports.getClientes = async function(params) {
    return clienteData.getClientes(params);
};


exports.getClientesByGrupo = async function(id_empresa, id_grupo) {
    return clienteData.getClientesByGrupo(id_empresa, id_grupo)
};

exports.insertCliente = async function(cliente) {

    try {

        await regras.Clientes_Inclusao(cliente);
        validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return clienteData.insertCliente(cliente);
    } catch (err) {

        throw new erroDB.UserException(err.erro, err);
    }

};

exports.updateCliente = async function(cliente) {

    try {

        await regras.Clientes_Alteracao(cliente);
        validacao.Validacao(TABELA, cliente, parametros.Clientes());
        return clienteData.updateCliente(cliente);
    } catch (err) {

        throw new erroDB.UserException(err.erro, err);
    }
};

exports.deleteCliente = async function(id_empresa, id_cliente) {
    try {
        await regras.Clientes_Exclusao(id_empresa, id_cliente);
        return clienteData.deleteCliente(id_empresa, id_cliente);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

};


exports.existeClientes = async function(id_empresa) {
    try {
        return clienteData.existeClientes(id_empresa);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }
}