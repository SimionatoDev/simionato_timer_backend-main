"use strict";

var AponPlanejamentoData = require('../data/aponPlanejamentoData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var erroDB = require('../util/userfunctiondb');

var regras = require('../util/regrasdenegocio');

var TABELA = 'APONSPLANEJAMENTO';

exports.getAponPlanejamento = function _callee(id_empresa, id) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", AponPlanejamentoData.getAponPlanejamento(id_empresa, id));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAponPlanejamentos = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", AponPlanejamentoData.getAponPlanejamentos(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAponAgendaPlanejamentos = function _callee3(id_empresa, id_exec, data) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", AponPlanejamentoData.getAponAgendaPlanejamentos(id_empresa, id_exec, data));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.insertAponPlanejamento = function _callee4(AponPlanejamento) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(regras.Apons_Planejamento_Inclusao(AponPlanejamento));

        case 3:
          validacao.Validacao(TABELA, AponPlanejamento, parametros.AponPlanejamento());
          return _context4.abrupt("return", AponPlanejamentoData.insertAponPlanejamento(AponPlanejamento));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw new erroDB.UserException(_context4.t0.erro, _context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateAponPlanejamento = function _callee5(AponPlanejamento) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(regras.Apons_Planejamento_Alteracao(AponPlanejamento));

        case 3:
          validacao.Validacao(TABELA, AponPlanejamento, parametros.AponPlanejamento());
          return _context5.abrupt("return", AponPlanejamentoData.updateAponPlanejamento(AponPlanejamento));

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

exports.updateAponPlanejamentoObs = function _callee6(id_empresa, id, obs) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          return _context6.abrupt("return", AponPlanejamentoData.updateAponPlanejamentoObs(id_empresa, id, obs));

        case 4:
          _context6.prev = 4;
          _context6.t0 = _context6["catch"](0);
          throw new erroDB.UserException(_context6.t0.erro, _context6.t0);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.deleteAponPlanejamento = function _callee7(id_empresa, id) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(regras.Apons_Planejamento_Exclusao(id_empresa, id));

        case 3:
          return _context7.abrupt("return", AponPlanejamentoData.deleteAponPlanejamento(id_empresa, id));

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

exports.existeAponPlanejamentoAtividadeUnica = function (id_empresa, id_projeto, conta, versao, subconta) {
  try {
    return AponPlanejamentoData.existeAponPlanejamentoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta);
  } catch (err) {
    throw new erroDB.UserException(err.erro, err);
  }
};

exports.existeAponPlanejamentoAtividade = function (id_empresa, id_projeto) {
  try {
    return AponPlanejamentoData.existeAponPlanejamentoAtividade(id_empresa, id_projeto);
  } catch (err) {
    throw new erroDB.UserException(err.erro, err);
  }
};