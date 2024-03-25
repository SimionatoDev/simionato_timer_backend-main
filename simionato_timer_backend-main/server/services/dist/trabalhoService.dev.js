"use strict";

/* SERVICE trabalho */
var trabalhoData = require('../data/trabalhoData'); ////const validacao = require('../util/validacao');
////const parametros = require('../util/parametrostabelas');


var erroDB = require('../util/userfunctiondb'); ////const regras = require('../util/regrasdenegocio');


var TABELA = 'TRABALHOS';
/* CRUD GET SERVICE */

exports.getTrabalho = function _callee(id_empresa, id_projeto, id_atividade, id) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", trabalhoData.getTrabalho(id_empresa, id_projeto, id_atividade, id));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* CRUD GET ALL SERVICE */


exports.getTrabalhos = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", trabalhoData.getTrabalhos(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //* CRUD - INSERT - SERVICE */


exports.insertTrabalho = function _callee3(trabalho) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          return _context3.abrupt("return", trabalhoData.insertTrabalho(trabalho));

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


exports.updateTrabalho = function _callee4(trabalho) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          return _context4.abrupt("return", trabalhoData.updateTrabalho(trabalho));

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


exports.deleteTrabalho = function _callee5(id_empresa, id_projeto, id_atividade, id) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          return _context5.abrupt("return", trabalhoData.deleteTrabalho(id_empresa, id_projeto, id_atividade, id));

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