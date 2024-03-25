"use strict";

var express = require('express');

var router = express.Router();

var gruEcoSrv = require('../services/grupoEcoServices');

router.get('/api/grueco/:id_empresa/:codigo', function _callee(req, res) {
  var lsGrupoEco;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(gruEcoSrv.getGrupoEco(req.params.id_empresa, req.params.codigo));

        case 3:
          lsGrupoEco = _context.sent;

          if (lsGrupoEco == null) {
            res.status(409).json({
              message: 'Grupo Econômico Não Encontrado.'
            });
          } else {
            res.status(200).json(lsGrupoEco);
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
              tabela: 'GRUPOECO',
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
router.get('/api/gruecos', function _callee2(req, res) {
  var lsGrupoEco;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(gruEcoSrv.getGrupoEcos());

        case 3:
          lsGrupoEco = _context2.sent;

          if (lsGrupoEco.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsGrupoEco);
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
              tabela: 'GRUPOECO',
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
router.post('/api/grueco', function _callee3(req, res) {
  var grueco, reg;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          grueco = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(gruEcoSrv.insertGrupoEco(grueco));

        case 4:
          reg = _context3.sent;

          if (reg == null) {
            res.status(409).json({
              message: 'Grupo Econômico Não Encontrado!'
            });
          } else {
            res.status(200).json(reg);
          }

          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);

          if (_context3.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context3.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'GRUPOECO',
              message: _context3.t0.message
            });
          }

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.put('/api/grueco', function _callee4(req, res) {
  var grueco, motivo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          grueco = req.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(gruEcoSrv.updateGrupoEco(grueco));

        case 4:
          motivo = _context4.sent;
          res.status(200).json({
            message: 'Grupo Econômico Alterado Com Sucesso!'
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
              tabela: 'GRUPOECO',
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
router["delete"]('/api/grueco/:id_empresa/:id', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(gruEcoSrv.deleteGrupoEco(req.params.id_empresa, req.params.id));

        case 3:
          res.status(200).json({
            message: 'Grupo Econômico Excluído Com Sucesso!'
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
              tabela: 'GRUPOECO',
              message: _context5.t0.message
            });
          }

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); //consultas post

router.post('/api/gruecos', function _callee6(req, res) {
  var params, lsGrupo;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          /*
              {
                  "id_empresa: 1", 
                  "id" : 3,
                  "razao" : "",
                  "sharp" : true
              }
          */
          params = req.body;
          console.log('gruecos params', params);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(gruEcoSrv.getGrupoEcos(params));

        case 5:
          lsGrupo = _context6.sent;

          if (params.contador == "S") {
            res.status(200).json(lsGrupo);
          } else {
            if (lsGrupo.length == 0) {
              res.status(409).json({
                message: 'Nehuma Informação Para Esta Consulta.'
              });
            } else {
              res.status(200).json(lsGrupo);
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
              tabela: 'GRUPO ECONOMICO',
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