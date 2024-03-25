"use strict";

var express = require('express');

var _require = require('bcryptjs'),
    hash = _require.hash;

var router = express.Router();

var usuarioSrv = require('../services/usuarioServices');

router.get('/api/usuario/:id_empresa/:id_usuario', function _callee(req, res) {
  var lsUsuarios;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuario(req.params.id_empresa, req.params.id_usuario));

        case 3:
          lsUsuarios = _context.sent;

          if (lsUsuarios == null) {
            res.status(409).json({
              message: 'Usuario Não Encontrado.'
            });
          } else {
            res.status(200).json(lsUsuarios);
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
              tabela: 'USUARIOS',
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
router.get('/api/usuariobyemail/:id_empresa/:email', function _callee2(req, res) {
  var lsUsuarios;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuarioByEmail(req.params.id_empresa, req.params.email));

        case 3:
          lsUsuarios = _context2.sent;

          if (lsUsuarios == null) {
            res.status(409).json({
              message: 'Usuario Não Encontrado.'
            });
          } else {
            res.status(200).json(lsUsuarios);
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
              tabela: 'USUARIOS',
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
router.get('/api/usuarios', function _callee3(req, res) {
  var lsUsuarios;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuarios());

        case 3:
          lsUsuarios = _context3.sent;

          if (lsUsuarios.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsUsuarios);
          }

          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);

          if (_context3.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context3.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'USUARIOS',
              message: _context3.t0.message
            });
          }

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/api/usuario', function _callee4(req, res) {
  var usuario, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          usuario = req.body; //const passwordHash = await hash(usuario.senha, 8);
          //usuario.senha = passwordHash;

          _context4.next = 4;
          return regeneratorRuntime.awrap(usuarioSrv.insertUsuario(usuario));

        case 4:
          user = _context4.sent;

          if (user == null) {
            res.status(409).json({
              message: 'Usuario Não Encontrado!'
            });
          } else {
            res.status(200).json(user);
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
              tabela: 'USUARIOS',
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
router.put('/api/usuario', function _callee5(req, res) {
  var usuario, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          usuario = req.body;
          _context5.next = 4;
          return regeneratorRuntime.awrap(usuarioSrv.updateUsuario(usuario));

        case 4:
          user = _context5.sent;
          res.status(200).json({
            message: 'Usuario Alterado Com Sucesso!'
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);

          if (_context5.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context5.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'USUARIOS',
              message: _context5.t0.message
            });
          }

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router["delete"]('/api/usuario/:id_empresa/:id_usuario', function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.deleteUsuario(req.params.id_empresa, req.params.id_usuario));

        case 3:
          res.status(200).json({
            message: 'Usuario Excluído Com Sucesso!'
          });
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);

          if (_context6.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context6.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'USUARIOS',
              message: _context6.t0.message
            });
          }

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); //consultas post

router.post('/api/usuarios', function _callee7(req, res) {
  var params, lsUsuarios;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          /*
              {
                  "id_empresa: 1", 
                  "id" : 3,
                  "razao" : "",
                  "cnpj_cpf" : "",
                  "grupo" : 0,
                  "sharp" : true
              }
          */
          params = req.body;
          console.log('params usuários:', params);
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuarios(params));

        case 5:
          lsUsuarios = _context7.sent;

          if (lsUsuarios.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsUsuarios);
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
              tabela: 'USUÁRIOS',
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
router.post('/api/usuariosbyprojeto', function _callee8(req, res) {
  var params, lsUsuarios;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          /*
              {
                  public id_empresa: number = 0;
                  public id_resp: number = 0;
                  public id_exec: number = 0;
                  public projeto_fechado:boolean = false;
                  public orderby: string = '';
                  public sharp: Boolean = true;
              }
          */
          params = req.body;
          console.log('params usuários:', params);
          _context8.prev = 2;
          _context8.next = 5;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuariosByProjeto(params));

        case 5:
          lsUsuarios = _context8.sent;

          if (params.contador == "S") {
            res.status(200).json(lsEmpresas);
          } else {
            if (lsUsuarios.length == 0) {
              res.status(409).json({
                message: 'Nehuma Informação Para Esta Consulta.'
              });
            } else {
              res.status(200).json(lsUsuarios);
            }
          }

          _context8.next = 12;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](2);

          if (_context8.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context8.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'USUÁRIOS',
              message: _context8.t0.message
            });
          }

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.post('/api/usariohorasexec', function _callee9(req, res) {
  var params, lsHoras;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          /*
              public id_empresa: number = 0;
              public id_diretor:number = 0;
              public id_resp:number = 0;
              public id_usuario: number = 0;
              public ano: string = '';
              public mes: string = '';
              public pagina: number = 0;
              public tamPagina: number = 50;
              public contador: string = 'N';
              public orderby: string = '';
              public sharp: Boolean = false;
          */
          params = req.body;
          console.log('params usuários x horas lancadas:', params);
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(usuarioSrv.usarioHorasExec(params));

        case 5:
          lsHoras = _context9.sent;

          if (lsHoras.length == 0) {
            res.status(409).json({
              message: 'Nehuma Informação Para Esta Consulta.'
            });
          } else {
            res.status(200).json(lsHoras);
          }

          _context9.next = 12;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](2);

          if (_context9.t0.name == 'MyExceptionDB') {
            res.status(409).json(_context9.t0);
          } else {
            res.status(500).json({
              erro: 'BAK-END',
              tabela: 'HORAS LANÇADAS',
              message: _context9.t0.message
            });
          }

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = router;