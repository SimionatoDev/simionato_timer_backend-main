"use strict";

var aponExecucaoData = require('../data/aponExecucaoData'); //const validacao = require('../util/validacao');
//const parametros = require('../util/parametrostabelas');
//const regras = require('../util/regrasdenegocio');


var erroDB = require('../util/userfunctiondb');

var TABELA = 'CONTRATOS';

exports.insertContrato = function (req, res) {
  var name = req.body.name;
  var file = req.file;
  console.log(name);
  console.log(file);
  return;
};