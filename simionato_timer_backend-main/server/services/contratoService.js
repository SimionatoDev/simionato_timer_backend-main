const aponExecucaoData = require('../data/aponExecucaoData');
//const validacao = require('../util/validacao');
//const parametros = require('../util/parametrostabelas');
//const regras = require('../util/regrasdenegocio');
const erroDB = require('../util/userfunctiondb');


const TABELA = 'CONTRATOS';

exports.insertContrato = function(req, res) {

    const { name } = req.body;

    const file = req.file;

    console.log(name);

    console.log(file);

    return;
};