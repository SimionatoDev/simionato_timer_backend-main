"use strict";

/* SERVICE titulos_projeto */
var titulo_projetoData = require('../data/titulo_projetoData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var erroDB = require('../util/userfunctiondb');

var regras = require('../util/regrasdenegocio');

var shared = require('../util/shared');

var TABELA = 'TITULOS_PROJETO';
/* CRUD GET SERVICE */

exports.getTitulo_Projeto = function _callee(id_empresa, id_projeto, data_vencto) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", titulo_projetoData.getTitulo_Projeto(id_empresa, id_projeto, data_vencto));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* CRUD GET ALL SERVICE */


exports.getTitulos_Projeto = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", titulo_projetoData.getTitulos_Projeto(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //* CRUD - INSERT - SERVICE */


exports.insertTitulo_Projeto = function _callee3(titulo_projeto) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(regras.Titulo_Projeto_Inclusao(titulo_projeto));

        case 3:
          validacao.Validacao(TABELA, titulo_projeto, parametros.TITULOS_PROJETO());
          return _context3.abrupt("return", titulo_projetoData.insertTitulo_Projeto(titulo_projeto));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw new erroDB.UserException(_context3.t0.erro, _context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //* CRUD - UPDATE - SERVICE */


exports.updateTitulo_Projeto = function _callee4(titulo_projeto) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(regras.Titulo_Projeto_Alteracao(titulo_projeto));

        case 3:
          validacao.Validacao(TABELA, titulo_projeto, parametros.TITULOS_PROJETO());
          return _context4.abrupt("return", titulo_projetoData.updateTitulo_Projeto(titulo_projeto));

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
}; //* CRUD - DELETE - SERVICE */


exports.deleteTitulo_Projeto = function _callee5(id_empresa, id_projeto, data_vencto) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(regras.Titulo_Projeto_Exclusao(id_empresa, id_projeto, data_vencto));

        case 3:
          return _context5.abrupt("return", titulo_projetoData.deleteTitulo_Projeto(id_empresa, id_projeto, data_vencto));

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