"use strict";

var express = require('express');

var router = express.Router();

var aponExecucaoSrv = require('../services/aponExecucaoServices');

var atividadeSrv = require('../services/atividadeService');

router.get('/api/aponexec/:id_empresa/:id', function _callee(req, res) {
  var lsApontamentos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucao(req.params.id_empresa, req.params.id));

        case 3:
          lsApontamentos = _context.sent;

          if (lsApontamentos == null) {
            res.status(409).json({
              message: 'Apontamento De Execução  Não Encontrado.'
            });
          } else {
            res.status(200).json(lsApontamentos);
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
              tabela: 'APONEXEC',
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
router.get('/api/aponexecs', function _callee2(req, res) {
  var lsApontamentos;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucoes());

        case 3:
          lsApontamentos = _context2.sent;

          if (lsApontamentos.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsApontamentos);
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
              tabela: 'APONEXEC',
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
router.post('/api/aponexec', function _callee3(req, res) {
  var apontamento, apon;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          apontamento = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(aponExecucaoSrv.insertAponExecucao(apontamento));

        case 4:
          apon = _context3.sent;

          if (apon == null) {
            res.status(409).json({
              message: 'Apontamento De Execução  Não Encontrado!'
            });
          } else {
            //await atividadeSrv.setStatus(apon.id_empresa, apon.id_projeto, apon.id_subconta);
            res.status(200).json(apon);
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
              tabela: 'APONEXEC',
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
router.put('/api/aponexec', function _callee4(req, res) {
  var apontamento, apon;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          apontamento = req.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(aponExecucaoSrv.updateAponExecucao(apontamento));

        case 4:
          apon = _context4.sent;
          //await atividadeSrv.setStatus(apon.id_empresa, apon.id_projeto, apon.id_subconta);
          res.status(200).json({
            message: 'Apontamento De Execução  Alterado Com Sucesso!'
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
              tabela: 'APONEXEC',
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
router["delete"]('/api/aponexec/:id_empresa/:id', function _callee5(req, res) {
  var apon;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucao(req.params.id_empresa, req.params.id));

        case 3:
          apon = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(aponExecucaoSrv.deleteAponExecucao(req.params.id_empresa, req.params.id));

        case 6:
          if (apon !== null) {//await atividadeSrv.setStatus(apon.id_empresa, apon.id_projeto, apon.id_subconta);
          }

          res.status(200).json({
            message: 'Apontamento De Execução  Exclído Com Sucesso!'
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);

          if (_context5.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context5.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'APONEXEC',
              message: _context5.t0.message
            });
          }

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //consultas post

router.post('/api/aponexecs', function _callee6(req, res) {
  var params, lsApontamentos;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          /*
              {
                  "id_empresa"  : 1 , 
                  "id"          : "",
                  "id_projeto"  : "",
                  "id_conta"    : "",
                  "id_subconta" : "",
                  "id_resp"     : 0,
                  "id_exec"     : 0,
                  "data"        : "",
                  "orderby"     : '',     
                  "sharp"       : true
              }
          */
          params = req.body;
          console.log('params', params);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucoes(params));

        case 5:
          lsApontamentos = _context6.sent;

          if (lsApontamentos.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsApontamentos);
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
              tabela: 'APONT. EXECUÇÃO',
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
router.get('/api/getaponexecbyexecutor/:id_empresa/:id_usuario/:data_ref', function _callee7(req, res) {
  var lsApontamentos;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecByExecutor(req.params.id_empresa, req.params.id_usuario, req.params.data_ref.replace('_', '/')));

        case 3:
          lsApontamentos = _context7.sent;

          if (lsApontamentos.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsApontamentos);
          }

          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);

          if (_context7.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context7.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'APONEXEC',
              message: _context7.t0.message
            });
          }

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;