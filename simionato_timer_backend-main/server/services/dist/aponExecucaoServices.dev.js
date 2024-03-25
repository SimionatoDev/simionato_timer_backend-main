"use strict";

var aponExecucaoData = require('../data/aponExecucaoData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var regras = require('../util/regrasdenegocio');

var erroDB = require('../util/userfunctiondb');

var TABELA = 'APONS_EXECUCAO';

exports.getAponExecucao = function _callee(id_empresa, id) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", aponExecucaoData.getAponExecucao(id_empresa, id));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAponExecucoes = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", aponExecucaoData.getAponExecucoes(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.ExisteLancamentoNestaHora = function _callee3(aponExecucao, operacao) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", aponExecucaoData.ExisteLancamentoNestaHora(aponExecucao, operacao));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.ExisteLancamentoNestaHoraExato = function _callee4(aponExecucao, operacao) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", aponExecucaoData.ExisteLancamentoNestaHoraExato(aponExecucao, operacao));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.insertAponExecucao = function _callee5(aponExecucao) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(regras.Apons_Execucao_Inclusao(aponExecucao));

        case 3:
          validacao.Validacao(TABELA, aponExecucao, parametros.AponExecucao());
          return _context5.abrupt("return", aponExecucaoData.insertAponExecucao(aponExecucao));

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw new erroDB.UserException(_context5.t0.erro, _context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateAponExecucao = function _callee6(aponExecucao) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(regras.Apons_Execucao_Alteracao(aponExecucao));

        case 3:
          validacao.Validacao(TABELA, aponExecucao, parametros.AponExecucao());
          return _context6.abrupt("return", aponExecucaoData.updateAponExecucao(aponExecucao));

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw new erroDB.UserException(_context6.t0.erro, _context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteAponExecucao = function _callee7(id_empresa, id) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(regras.Apons_Execucao_Exclusao(id_empresa, id));

        case 3:
          return _context7.abrupt("return", aponExecucaoData.deleteAponExecucao(id_empresa, id));

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          throw new erroDB.UserException(_context7.t0.erro, _context7.t0);

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.existeAponExecucaoAtividadeUnica = function (id_empresa, id_projeto, conta, versao, subconta) {
  try {
    return aponExecucaoData.existeAponExecucaoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta);
  } catch (err) {
    throw new erroDB.UserException(err.erro, err);
  }
};

exports.existeAponExecucaoAtividade = function (id_empresa, id_projeto) {
  try {
    return aponExecucaoData.existeAponExecucaoAtividade(id_empresa, id_projeto);
  } catch (err) {
    throw new erroDB.UserException(err.erro, err);
  }
};

exports.getAponExecByExecutor = function (id_empresa, id_usuario, data_ref) {
  try {
    return aponExecucaoData.getAponExecByExecutor(id_empresa, id_usuario, data_ref);
  } catch (err) {
    throw new erroDB.UserException(err.erro, err);
  }
};