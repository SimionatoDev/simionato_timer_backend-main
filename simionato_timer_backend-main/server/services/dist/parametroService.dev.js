"use strict";

/* SERVICE parametros */
var parametroData = require('../data/parametroData'); ////const validacao = require('../util/validacao');
////const parametros = require('../util/parametrostabelas');


var erroDB = require('../util/userfunctiondb'); ////const regras = require('../util/regrasdenegocio');


var TABELA = 'PARAMETROS';
/* CRUD GET SERVICE */

exports.getParametro = function _callee(id_empresa, modulo, assinatura, id_usuario) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", parametroData.getParametro(id_empresa, modulo, assinatura, id_usuario));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* CRUD GET ALL SERVICE */


exports.getParametros = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", parametroData.getParametros(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //* CRUD - INSERT - SERVICE */


exports.insertParametro = function _callee3(parametro) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          return _context3.abrupt("return", parametroData.insertParametro(parametro));

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
}; //* CRUD - UPDATE - SERVICE */


exports.updateParametro = function _callee4(parametro) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          return _context4.abrupt("return", parametroData.updateParametro(parametro));

        case 4:
          _context4.prev = 4;
          _context4.t0 = _context4["catch"](0);
          throw new erroDB.UserException(_context4.t0.erro, _context4.t0);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 4]]);
}; //* CRUD - DELETE - SERVICE */


exports.deleteParametro = function _callee5(id_empresa, modulo, id_usuario) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          return _context5.abrupt("return", parametroData.deleteParametro(id_empresa, modulo, assinatura, id_usuario));

        case 4:
          _context5.prev = 4;
          _context5.t0 = _context5["catch"](0);
          throw new erroDB.UserException(_context5.t0.erro, _context5.t0);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 4]]);
};