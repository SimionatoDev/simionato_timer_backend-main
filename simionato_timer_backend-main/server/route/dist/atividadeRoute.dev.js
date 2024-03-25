"use strict";

/* ROUTE atividades */
var db = require('../infra/database');

var express = require('express');

var router = express.Router();

var atividadeSrv = require('../services/atividadeService');
/* ROTA GETONE atividade */


router.get("/api/atividade/:id_empresa/:id", function _callee(req, res) {
  var lsLista;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(atividadeSrv.getAtividade(req.params.id_empresa, req.params.id));

        case 3:
          lsLista = _context.sent;

          if (lsLista == null) {
            res.status(409).json({
              message: 'Atividade Não Encontrada.'
            });
          } else {
            res.status(200).json(lsLista);
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
              tabela: 'atividade',
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
/* ROTA GETALL atividade */

router.get("/api/atividades", function _callee2(req, res) {
  var lsLista;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(atividadeSrv.getAtividades());

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
              tabela: 'atividade',
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
/* ROTA INSERT atividade */

router.post("/api/atividade", function _callee3(req, res) {
  var atividade, registro;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          atividade = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.insertAtividade(atividade));

        case 4:
          registro = _context3.sent;

          if (registro == null) {
            res.status(409).json({
              message: 'Atividade Não Cadastrada!'
            });
          } else {
            res.status(200).json(registro);
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
              tabela: 'Atividade',
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
/* ROTA UPDATE atividade */

router.put("/api/atividade", function _callee4(req, res) {
  var atividade, registro;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          atividade = req.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.updateAtividade(atividade));

        case 4:
          registro = _context4.sent;

          if (registro == null) {
            res.status(409).json({
              message: 'Atividade Não Alterada !'
            });
          } else {
            res.status(200).json(registro);
          }

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
              tabela: 'Atividade',
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
router.put("/api/updateAtividadehorasdir", function _callee5(req, res) {
  var atividadeHorasDir, registro;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log("updateAtividadehorasdir");
          atividadeHorasDir = req.body;
          _context5.next = 5;
          return regeneratorRuntime.awrap(atividadeSrv.updateAtividadeHorasDir(atividadeHorasDir));

        case 5:
          registro = _context5.sent;

          if (registro == null) {
            res.status(409).json({
              message: 'Horas Da Diretoria Não Alterada!'
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
              tabela: 'Atividade - Hora Diretoria',
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
/* ROTA DELETE atividade */

router["delete"]("/api/atividade/:id_empresa/:id_projeto/:conta/:versao/:subconta", function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          console.log("deleteatividade", req.params);
          _context6.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.deleteAtividade(req.params.id_empresa, req.params.id_projeto, req.params.conta, req.params.versao, req.params.subconta));

        case 4:
          res.status(200).json({
            message: 'Atividade Excluída Com Sucesso!'
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
              tabela: 'Atividade',
              message: _context6.t0.message
            });
          }

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
/* ROTA  anexa atividade */

router.get("/api/anexaatividade/:id_empresa/:conta/:versao/:id_projeto/:id_exec/:id_resp", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          console.log('Entrei no anexo...');
          _context7.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.anexaAtividade(req.params.id_empresa, req.params.conta, req.params.versao, req.params.id_projeto, req.params.id_exec, req.params.id_resp));

        case 4:
          res.status(200).json({
            message: 'Atividade Anexada Com Sucesso!'
          });
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
              tabela: 'Atividade',
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
/* ROTA  anexa atividadev2 */

router.post("/api/anexaatividadev2", function _callee8(req, res) {
  var atividades;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          atividades = req.body;
          console.log("anexaatividadev2");
          _context8.next = 5;
          return regeneratorRuntime.awrap(atividadeSrv.anexaAtividadev2(atividades));

        case 5:
          res.status(200).json({
            message: 'Atividade Anexada Com Sucesso!'
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);

          if (_context8.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context8.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'Atividade',
              message: _context8.t0.message
            });
          }

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/* ROTA  anexa atividade */

router.get("/api/desanexaatividade/:id_empresa/:conta/:versao/:id_projeto", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          console.log('desanexaatividade');
          _context9.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.desanexaAtividade(req.params.id_empresa, req.params.conta, req.params.versao, req.params.id_projeto));

        case 4:
          res.status(200).json({
            message: 'Atividade Desanexada Com Sucesso!'
          });
          _context9.next = 10;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);

          if (_context9.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context9.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'Atividade',
              message: _context9.t0.message
            });
          }

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
/* ROTA  desanexarsubconta */

router.get("/api/desanexasubconta/:id_empresa/:id_projeto/:id_conta/:id_conta_versao/:id_subconta/:nivel", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          console.log('desanexarsubconta');
          _context10.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.desanexasubconta(req.params.id_empresa, req.params.id_projeto, req.params.id_conta, req.params.id_conta_versao, req.params.id_subconta, req.params.nivel));

        case 4:
          res.status(200).json({
            message: 'SubAtividade Apagada Com Sucesso!'
          });
          _context10.next = 10;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);

          if (_context10.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context10.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'Atividade',
              message: _context10.t0.message
            });
          }

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //consultas post

router.post('/api/atividades', function _callee11(req, res) {
  var params, lsLista;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          /*
              public id_empresa: number = 0;
              public id: number = 0;
              public id_projeto: number = 0;
              public conta: string = '';
              public versao: string = '';
              public subconta: string = '';
              public tipo:string = '';
              public nivel: number = 0;
              public id_resp: number = 0;
              public id_exec: number = 0;
              public id_subcliente: number = 0;
              public so_abertas_ex: string = '';
              public orderby: string = '';
              public sharp: Boolean = true;
          */
          params = req.body;
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(atividadeSrv.getAtividades(params));

        case 4:
          lsLista = _context11.sent;
          console.log('Parametros ATIVIDADES');
          console.log(params);

          if (lsLista.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsLista);
          }

          _context11.next = 13;
          break;

        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](1);

          if (_context11.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context11.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'ATIVIDADES',
              message: _context11.t0.message
            });
          }

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.post('/api/atividadesvazia', function _callee12(req, res) {
  var params, lsLista;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          /*
              public id_empresa: number = 0;
              public conta: string = '';
              public versao: string = '';
              public id_projeto: number = 0;
              public id_resp: number = 0;
              public id_exec: number = 0;
          */
          params = req.body;
          _context12.prev = 1;
          console.log('Parametros ATIVIDADES VAZIAS');
          console.log(params);
          _context12.next = 6;
          return regeneratorRuntime.awrap(atividadeSrv.getAtividadesVazia(params));

        case 6:
          lsLista = _context12.sent;

          if (lsLista.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsLista);
          }

          _context12.next = 13;
          break;

        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](1);

          if (_context12.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context12.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'ATIVIDADES',
              message: _context12.t0.message
            });
          }

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
module.exports = router;