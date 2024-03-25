"use strict";

var feriadoData = require('../data/feriadoData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var erroDB = require('../util/userfunctiondb');

var regras = require('../util/regrasdenegocio');

var TABELA = 'FERIADOS';

exports.getFeriado = function _callee(id_empresa, id_usuario, id_tipo, data) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", feriadoData.getFeriado(id_empresa, id_usuario, id_tipo, data));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getFeriados = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", feriadoData.getFeriados(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.insertFeriado = function _callee3(feriado) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          return _context3.abrupt("return", feriadoData.insertFeriado(feriado));

        case 4:
          _context3.prev = 4;
          _context3.t0 = _context3["catch"](0);
          throw new erroDB.UserException(_context3.t0.erro, _context3.t0);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.updateFeriado = function _callee4(feriado) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log('feriado', feriado);
          _context4.next = 4;
          return regeneratorRuntime.awrap(regras.Feriados_Alteracao(feriado));

        case 4:
          validacao.Validacao(TABELA, feriado, parametros.Feriados());
          return _context4.abrupt("return", feriadoData.updateFeriado(feriado));

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          throw new erroDB.UserException(_context4.t0.erro, _context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.deleteFeriado = function _callee5(id_empresa, datafer) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(regras.Feriados_Exclusao(id_empresa, datafer));

        case 3:
          return _context5.abrupt("return", feriadoData.deleteFeriado(id_empresa, datafer));

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          throw new erroDB.UserException(_context5.t0.erro, _context5.t0);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
};