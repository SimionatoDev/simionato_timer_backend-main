"use strict";

/* ROUTE parametros */
var db = require('../infra/database');

var express = require('express');

var router = express.Router();

var parametroSrv = require('../services/parametroService');
/* ROTA GETONE parametro */


router.get("/api/parametro/:id_empresa/:modulo/:assinatura/:id_usuario", function _callee(req, res) {
  var lsLista;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("GET PARAMETRO", req.params);
          _context.next = 4;
          return regeneratorRuntime.awrap(parametroSrv.getParametro(req.params.id_empresa, req.params.modulo, req.assinatura, req.params.id_usuario));

        case 4:
          lsLista = _context.sent;

          if (lsLista == null) {
            res.status(409).json({
              message: 'Parametro Não Encontrada.'
            });
          } else {
            res.status(200).json(lsLista);
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

          if (_context.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'parametro',
              message: _context.t0.message
            });
          }

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/* ROTA GETALL parametro */

router.get("/api/parametros", function _callee2(req, res) {
  var lsLista;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(parametroSrv.getParametros());

        case 3:
          lsLista = _context2.sent;

          if (lsLista.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsLista);
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
              tabela: 'parametro',
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
/* ROTA INSERT parametro */

router.post("/api/parametro", function _callee3(req, res) {
  var parametro, registro;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log(req.body);
          parametro = req.body;
          _context3.next = 5;
          return regeneratorRuntime.awrap(parametroSrv.insertParametro(parametro));

        case 5:
          registro = _context3.sent;

          if (registro == null) {
            res.status(409).json({
              message: 'Parametro Não Cadastrado!'
            });
          } else {
            res.status(200).json(registro);
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
              tabela: 'Parametro',
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
/* ATUALIZA parametro */

router.post("/api/atualizarparametro", function _callee4(req, res) {
  var parametro, param, registro, _registro;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log(req.body);
          parametro = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(parametroSrv.getParametro(parametro.id_empresa, parametro.modulo, parametro.assinatura, parametro.id_usuario));

        case 5:
          param = _context4.sent;
          console.log('atualizarparametro seek', param);

          if (!(param.length == 0)) {
            _context4.next = 15;
            break;
          }

          console.log('Inseri', parametro);
          _context4.next = 11;
          return regeneratorRuntime.awrap(parametroSrv.insertParametro(parametro));

        case 11:
          registro = _context4.sent;

          if (registro == null) {
            res.status(409).json({
              message: 'Parametro Não Cadastrado!'
            });
          } else {
            res.status(200).json(registro);
          }

          _context4.next = 20;
          break;

        case 15:
          console.log('Alterei', parametro);
          _context4.next = 18;
          return regeneratorRuntime.awrap(parametroSrv.updateParametro(parametro));

        case 18:
          _registro = _context4.sent;

          if (_registro == null) {
            res.status(409).json({
              message: 'Parametro Alterado Com Sucesso!'
            });
          } else {
            res.status(200).json(_registro);
          }

        case 20:
          _context4.next = 25;
          break;

        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](0);

          if (_context4.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context4.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'Parametro',
              message: _context4.t0.message
            });
          }

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 22]]);
});
/* ROTA UPDATE parametro */

router.put("/api/parametro", function _callee5(req, res) {
  var parametro, registro;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          parametro = req.body;
          console.log(req.body);
          _context5.next = 5;
          return regeneratorRuntime.awrap(parametroSrv.updateParametro(parametro));

        case 5:
          registro = _context5.sent;

          if (registro == null) {
            res.status(409).json({
              message: 'Parametro Alterado Com Sucesso!'
            });
          } else {
            res.status(200).json(registro);
          }

          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);

          if (_context5.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context5.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'Parametro',
              message: _context5.t0.message
            });
          }

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
/* ROTA DELETE parametro */

router["delete"]("/api/parametro/:id_empresa/:modulo/:assinatura/:id_usuario", function _callee6(req, res) {
  var parametro;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          parametro = req.body;
          _context6.next = 4;
          return regeneratorRuntime.awrap(parametroSrv.deleteParametro(parametro.id_empresa, parametro.modulo, parametro.assinatura, parametro.id_usuario));

        case 4:
          res.status(200).json({
            message: 'Parametro Excluído Com Sucesso!'
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);

          if (_context6.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context6.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'Parametro',
              message: _context6.t0.message
            });
          }

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //consultas post

router.post('/api/parametros', function _callee7(req, res) {
  var params, lsParametros;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          /*
              public id_empresa: number = 0;
              public modulo: string = '';
              public assinatura: string = '';
              public id_usuario: number = 0;
              public pagina: number = 0;
              public tamPagina: number = 50;
              public contador: string = 'N';
              public orderby: string = '';
              public sharp: Boolean = false;
          */
          params = req.body;
          console.log('params=>Parametros', params);
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(parametroSrv.getParametros(params));

        case 5:
          lsParametros = _context7.sent;

          if (params.contador == "S") {
            res.status(200).json(lsParametros);
          } else {
            if (lsParametros.length == 0) {
              res.status(409).json({
                message: 'Nehuma Informação Para Esta Consulta.'
              });
            } else {
              res.status(200).json(lsParametros);
            }
          }

          _context7.next = 12;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](2);

          if (_context7.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context7.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'PARAMETROS',
              message: _context7.t0.message
            });
          }

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = router;