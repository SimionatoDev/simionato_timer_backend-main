"use strict";

var express = require('express');

var router = express.Router();

var projetoSrv = require('../services/projetoServices');

router.get('/api/projeto/:id_empresa/:id', function _callee(req, res) {
  var lsLista;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(projetoSrv.getProjeto(req.params.id_empresa, req.params.id));

        case 3:
          lsLista = _context.sent;

          if (lsLista == null) {
            res.status(409).json({
              message: 'Projeto Não Encontrado.'
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
              tabela: 'PROJETO',
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
router.get('/api/projetos', function _callee2(req, res) {
  var lsLista;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(projetoSrv.getProjetos());

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
              tabela: 'PROJETO',
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
router.post('/api/projeto', function _callee3(req, res) {
  var projeto, reg;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          projeto = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(projetoSrv.insertProjeto(projeto));

        case 4:
          reg = _context3.sent;

          if (reg == null) {
            res.status(409).json({
              message: 'Projeto Não Cadastrado!'
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
              tabela: 'PROJETO',
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
router.put('/api/projeto', function _callee4(req, res) {
  var projeto, reg;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          projeto = req.body;
          _context4.next = 4;
          return regeneratorRuntime.awrap(projetoSrv.updateProjeto(projeto));

        case 4:
          reg = _context4.sent;
          res.status(200).json({
            message: 'Projeto Alterado Com Sucesso!'
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
              tabela: 'PROJETO',
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
router["delete"]('/api/projeto/:id_empresa/:id', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(projetoSrv.deleteProjeto(req.params.id_empresa, req.params.id));

        case 3:
          res.status(200).json({
            message: 'Projeto Excluído Com Sucesso!'
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
              tabela: 'PROJETO',
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

router.post('/api/projetos', function _callee6(req, res) {
  var params, lsProjetos;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          /*
                  public id_empresa: number = 0;
                  public id: number = 0;
                  public descricao: string = '';
                  public id_diretor: string = '';
                  public cli_razao: string = '';
                  public cli_grupo: string = '';
                  public dataproj: string = '';
                  public dataenc:string = '';
                  public status: string = '';
                  public status_pl: string = '';
                  public status_ex: string = '';
                  public tem_atividade: string = 'N';
                  public pagina: number = 0;
                  public tamPagina: number = 50;
                  public contador: string = 'N';
                  public orderby: string = '';
                  public sharp: boolean = false;
                    Não implementado dataproj,dataenc
          */
          params = req.body;
          console.log('params', params);
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(projetoSrv.getProjetos(params));

        case 5:
          lsProjetos = _context6.sent;

          if (lsProjetos.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsProjetos);
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
              tabela: 'PROJETOS',
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
router.post('/api/agehoras', function _callee7(req, res) {
  var params, lsHoras;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          /*
              {
                  public id_empresa: number = 0;
                  public id: number = 0;
                  public id_projeto: number = 0;
                  public id_conta: string = '';
                  public id_subconta: string = '';
                  public id_resp: number = 0;
                  public id_exec: number = 0;
                  public mes: string = '';
                  public ano: string = '';
                  public orderby: string = '';
                  public sharp: Boolean = true;
              }
          */
          params = req.body;
          console.log('getAgeHoras params: ', params);
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(projetoSrv.getAgeHoras(params));

        case 5:
          lsHoras = _context7.sent;

          if (lsHoras == null) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsHoras);
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
              tabela: 'PROJETOS',
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