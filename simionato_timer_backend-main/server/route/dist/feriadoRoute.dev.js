"use strict";

var express = require('express');

var router = express.Router();

var feriadoSrv = require('../services/feriadoServices');

router.get('/api/feriado/:id_empresa/:id_usuario:/id_tipo/:data', function _callee(req, res) {
  var lsFeriados;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(feriadoSrv.getFeriado(req.params.id_empresa, req.params.id_usuario, req.params.id_tipo, req.params.data));

        case 3:
          lsFeriados = _context.sent;

          if (lsFeriados == null) {
            res.status(409).json({
              message: 'Feriado Não Encontrado.'
            });
          } else {
            res.status(200).json(lsFeriados);
          }

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);

          if (_context.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'FERIADOS',
              message: _context.t0.message
            });
          }

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/api/feriados', function _callee2(req, res) {
  var lsFeriados;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(feriadoSrv.getFeriados());

        case 3:
          lsFeriados = _context2.sent;

          if (lsFeriados.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsFeriados);
          }

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);

          if (_context2.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context2.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'FERIADOS',
              message: _context2.t0.message
            });
          }

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/api/feriado', function _callee3(req, res) {
  var feriado, reg;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log('Post feriado', req.body);
          feriado = req.body;
          _context3.next = 5;
          return regeneratorRuntime.awrap(feriadoSrv.insertFeriado(feriado));

        case 5:
          reg = _context3.sent;

          if (reg == null) {
            res.status(409).json({
              message: 'Feriado Não Cadastrato!'
            });
          } else {
            res.status(200).json(reg);
          }

          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);

          if (_context3.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context3.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'FERIADOS',
              message: _context3.t0.message
            });
          }

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.put('/api/feriado', function _callee4(req, res) {
  var feriado, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          feriado = req.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(feriadoSrv.updateFeriado(feriado));

        case 4:
          user = _context4.sent;
          res.status(200).json({
            message: 'Feriado Alterado Com Sucesso!'
          });
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);

          if (_context4.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context4.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'FERIADOS',
              message: _context4.t0.message
            });
          }

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router["delete"]('/api/feriado/:id_empresa/:id_usuario:/id_tipo/:data', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(feriadoSrv.deleteFeriado(req.params.id_empresa, req.params.id_usuario, req.params.id_tipo, req.params.data));

        case 3:
          res.status(200).json({
            message: 'Feriado Excluído Com Sucesso!'
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);

          if (_context5.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context5.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'FERIADOS',
              message: _context5.t0.message
            });
          }

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.post('/api/feriados', function _callee6(req, res) {
  var params, lsferiados;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          params = req.body;
          console.log('params=>Rota Feriados', params);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(feriadoSrv.getFeriados(params));

        case 5:
          lsferiados = _context6.sent;

          if (params.contador == "S") {
            res.status(200).json(lsferiados);
          } else {
            if (lsferiados.length == 0) {
              res.status(409).json({
                message: 'Nehuma Informação Para Esta Consulta.'
              });
            } else {
              res.status(200).json(lsferiados);
            }
          }

          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](2);

          if (_context6.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context6.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'FERIADOS',
              message: _context6.t0.message
            });
          }

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = router;