"use strict";

var aponExecucaoSrv = require('../services/aponExecucaoServices');

var aponPlanejamentoSrv = require('../services/aponPlanejamentoServices');

var clienteSrv = require('../services/clienteServices');

var projetoSrv = require('../services/projetoServices');

var empresaSrv = require('../services/empresaServices');

var usuarioSrv = require('../services/usuarioServices');

var feriadoSrv = require('../services/feriadoServices');

var motivoApoSrv = require('../services/motivoApoServices');

var gruEcoSrv = require('../services/grupoEcoServices');

var gruUserSrv = require('../services/grupoUserServices');

var AtividadeSrv = require('../services/atividadeService');

var titulo_projetoSrv = require('../services/titulo_projetoService');

var erroDB = require('../util/userfunctiondb');

var shared = require('../util/shared');

exports.Projetos_Inclusao = function _callee(projeto) {
  var obj;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(projetoSrv.getProjeto(projeto.id_empresa, projeto.id));

        case 3:
          obj = _context.sent;

          if (!(obj != null)) {
            _context.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'PROJETO',
            message: "Projeto (".concat(projeto.id_empresa, " + ").concat(projeto.id, ") - ").concat(projeto.descricao, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 11:
          return _context.abrupt("return");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Projetos_Alteracao = function _callee2(projeto) {
  var obj_1;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(projetoSrv.getProjeto(projeto.id_empresa, projeto.id));

        case 3:
          obj_1 = _context2.sent;

          if (!(obj_1 == null)) {
            _context2.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'PROJETO',
            message: "Projeto (".concat(projeto.id_empresa, " + ").concat(projeto.id, ") - ").concat(projeto.descricao, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 11:
          return _context2.abrupt("return");

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Projetos_Exclusao = function _callee3(id_empresa, id_projeto) {
  var proj, atividades;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(projetoSrv.getProjeto(id_empresa, id_projeto));

        case 3:
          proj = _context3.sent;

          if (!(proj == null)) {
            _context3.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'PROJETO',
            message: "Projeto: (".concat(id_empresa, " + ").concat(id_projetoS, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividadesByProj(id_empresa, id_projeto));

        case 8:
          atividades = _context3.sent;

          if (!(atividades.total > 0)) {
            _context3.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'PROJETO',
            message: "Existem Atividades Alocadas Neste Projeto!"
          }]);

        case 11:
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;

        case 16:
          return _context3.abrupt("return");

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.GrusUser_Inclusao = function _callee4(gruUser) {
  var obj;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(gruUserSrv.getGrupoUser(gruUser.id_empresa, gruUser.id));

        case 3:
          obj = _context4.sent;

          if (!(obj != null)) {
            _context4.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUUSER',
            message: "Grupo Usu\xE1rio (".concat(gruUser.id_empresa, " + ").concat(gruUser.id, ") - ").concat(gruUser.grupo, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;

        case 11:
          return _context4.abrupt("return");

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.GrusUser_Alteracao = function _callee5(gruUser) {
  var obj_1;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(gruUserSrv.getGrupoUser(gruUser.id_empresa, gruUser.id));

        case 3:
          obj_1 = _context5.sent;

          if (!(obj_1 == null)) {
            _context5.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUUSER',
            message: "Grupo Usu\xE1rio (".concat(gruUser.id_empresa, " + ").concat(gruUser.id, ") - ").concat(gruUser.grupo, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;

        case 11:
          return _context5.abrupt("return");

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.GrusUser_Exclusao = function _callee6(id_empresa, id_gruUser) {
  var gru, nro;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(gruUserSrv.getGrupoUser(id_empresa, id_gruUser));

        case 3:
          gru = _context6.sent;

          if (!(gru == null)) {
            _context6.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUUSER',
            message: "Grupo Usuario (".concat(id_empresa, " + ").concat(id_gruUserS, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(usuarioSrv.existeUsuariosByGrupo(id_empresa, id_gruUser));

        case 8:
          nro = _context6.sent;

          if (!(nro.total > 0)) {
            _context6.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'USUARIO',
            message: " Grupo (".concat(id_empresa, " + ").concat(id_gruUser, ")  Est\xE1 Associado A V\xE1rios Usu\xE1rios!")
          }]);

        case 11:
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;

        case 16:
          return _context6.abrupt("return");

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.GrusEco_Inclusao = function _callee7(gruEco) {
  var obj;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(gruEcoSrv.getGrupoEco(gruEco.id_empresa, gruEco.id));

        case 3:
          obj = _context7.sent;

          if (!(obj != null)) {
            _context7.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUECO',
            message: "Grupo Econ\xF4mico (".concat(gruEco.id_empresa, " + ").concat(gruEco.id, ") - ").concat(gruEco.razao, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;

        case 11:
          return _context7.abrupt("return");

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.GrusEco_Alteracao = function _callee8(gruEco) {
  var obj_1;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(gruEcoSrv.getGrupoEco(gruEco.id_empresa, gruEco.id));

        case 3:
          obj_1 = _context8.sent;

          if (!(obj_1 == null)) {
            _context8.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUECO',
            message: "Grupo Economico (".concat(gruEco.id_empresa, " + ").concat(gruEco.id, ") - ").concat(gruEco.razao, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          throw _context8.t0;

        case 11:
          return _context8.abrupt("return");

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.GrusEco_Exclusao = function _callee9(id_empresa, id_gruEco) {
  var gru, nro;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(gruEcoSrv.getGrupoEco(id_empresa, id_gruEco));

        case 3:
          gru = _context9.sent;

          if (!(gru == null)) {
            _context9.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUECO',
            message: "Grupo Econ\xF4mico (".concat(id_empresa, " + ").concat(id_gruEco, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context9.next = 8;
          return regeneratorRuntime.awrap(clienteSrv.getClientesByGrupo(id_empresa, id_gruEco));

        case 8:
          nro = _context9.sent;
          if (typeof nro.count == 'string') nro = parseInt(nro.count);

          if (!(nro > 0)) {
            _context9.next = 12;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'GRUECO',
            message: "Grupo Econ\xF4mico (".concat(id_empresa, " + ").concat(id_gruEco, ")  Est\xE1 Associado A V\xE1rios Clientes!")
          }]);

        case 12:
          _context9.next = 17;
          break;

        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](0);
          throw _context9.t0;

        case 17:
          return _context9.abrupt("return");

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.MotivosApo_Inclusao = function _callee10(motivoApo) {
  var obj;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(motivoApoSrv.getMotivoApo(motivoApo.id_empresa, motivoApo.id));

        case 3:
          obj = _context10.sent;

          if (!(obj != null)) {
            _context10.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'MOTIVOAPOS',
            message: "Motivo Apontamento (".concat(usuario.id_empresa, " + ").concat(motivoApo.id, ") - ").concat(motivoApo.motivo, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context10.next = 11;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          throw _context10.t0;

        case 11:
          return _context10.abrupt("return");

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.MotivosApo_Alteracao = function _callee11(motivoApo) {
  var obj_1;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(motivoApoSrv.getMotivoApo(motivoApo.id_empresa, motivoApo.codigo));

        case 3:
          obj_1 = _context11.sent;

          if (!(obj_1 == null)) {
            _context11.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'MOTIVOAPOS',
            message: "Motivo Apontamento (".concat(motivoApo.id_empresa, " + ").concat(motivoApo.id, ") - ").concat(motivoApo.motivo, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context11.next = 11;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          throw _context11.t0;

        case 11:
          return _context11.abrupt("return");

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.MotivosApo_Exclusao = function _callee12(id_empresa, codigo) {
  var cli;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(motivoApoSrv.getMotivoApo(id_empresa, codigo));

        case 3:
          cli = _context12.sent;

          if (!(cli == null)) {
            _context12.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'MOTIVOAPOS',
            message: "Motivo Apontamento (".concat(id_empresa, " + ").concat(codigo, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context12.next = 11;
          break;

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          throw _context12.t0;

        case 11:
          return _context12.abrupt("return");

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Feriados_Inclusao = function _callee13(feriado) {
  var obj;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(feriadoSrv.getFeriado(feriado.id_empresa, feriado.datafer));

        case 3:
          obj = _context13.sent;

          if (!(obj != null)) {
            _context13.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'FERIADOS',
            message: "Feriado (".concat(feriado.id_empresa, " + ").concat(feriado.datafer, ") - ").concat(feriado.descricao, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context13.next = 11;
          break;

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          throw _context13.t0;

        case 11:
          return _context13.abrupt("return");

        case 12:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Feriados_Alteracao = function _callee14(feriado) {
  var obj_1;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(feriadoSrv.getFeriado(feriado.id_empresa, feriado.datafer));

        case 3:
          obj_1 = _context14.sent;

          if (!(obj_1 == null)) {
            _context14.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'FERIADOS',
            message: "Feriado (".concat(feriado.id_empresa, " + ").concat(feriado.datafer, ") - ").concat(feriado.descricao, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context14.next = 11;
          break;

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          throw _context14.t0;

        case 11:
          return _context14.abrupt("return");

        case 12:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Feriados_Exclusao = function _callee15(id_empresa, id_datafer) {
  var cli;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(feriadoSrv.getFeriado(id_empresa, id_datafer));

        case 3:
          cli = _context15.sent;

          if (!(cli == null)) {
            _context15.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'FERIADOS',
            message: "Feriado (".concat(id_empresa, " + ").concat(id_datafer, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context15.next = 11;
          break;

        case 8:
          _context15.prev = 8;
          _context15.t0 = _context15["catch"](0);
          throw _context15.t0;

        case 11:
          return _context15.abrupt("return");

        case 12:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Usuarios_Inclusao = function _callee16(usuario) {
  var obj;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuario(usuario.id_empresa, usuario.id));

        case 3:
          obj = _context16.sent;

          if (!(obj != null)) {
            _context16.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'MOTIVOAPOS',
            message: "Usuario (".concat(usuario.id_empresa, " + ").concat(usuario.id, ") - ").concat(usuario.razao, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context16.next = 11;
          break;

        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          throw _context16.t0;

        case 11:
          return _context16.abrupt("return");

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Usuarios_Alteracao = function _callee17(usuario) {
  var obj_1;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuario(usuario.id_empresa, usuario.id));

        case 3:
          obj_1 = _context17.sent;

          if (!(obj_1 == null)) {
            _context17.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'MOTIVOAPOS',
            message: "Usuario (".concat(usuario.id_empresa, " + ").concat(usuario.id, ") - ").concat(usuario.razao, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context17.next = 11;
          break;

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          throw _context17.t0;

        case 11:
          return _context17.abrupt("return");

        case 12:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Usuarios_Exclusao = function _callee18(id_empresa, id_usuario) {
  var cli;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuario(id_empresa, id_usuario));

        case 3:
          cli = _context18.sent;

          if (!(cli == null)) {
            _context18.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'MOTIVOAPOS',
            message: "Usuario (".concat(id_empresa, " + ").concat(id_cliente, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context18.next = 11;
          break;

        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          throw _context18.t0;

        case 11:
          return _context18.abrupt("return");

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Clientes_Inclusao = function _callee19(cliente) {
  var tar;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(clienteSrv.getCliente(cliente.id_empresa, cliente.id));

        case 3:
          tar = _context19.sent;

          if (!(tar != null)) {
            _context19.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'CLIENTES',
            message: "Cliente (".concat(cliente.id_empresa, " + ").concat(cliente.id, ") - ").concat(cliente.razao, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context19.next = 11;
          break;

        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](0);
          throw _context19.t0;

        case 11:
          return _context19.abrupt("return");

        case 12:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Clientes_Alteracao = function _callee20(cliente) {
  var obj_1;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(clienteSrv.getCliente(cliente.id_empresa, cliente.id));

        case 3:
          obj_1 = _context20.sent;

          if (!(obj_1 == null)) {
            _context20.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'CLIENTES',
            message: "Cliente (".concat(cliente.id_empresa, " + ").concat(cliente.id, ") - ").concat(cliente.razao, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context20.next = 11;
          break;

        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](0);
          throw _context20.t0;

        case 11:
          return _context20.abrupt("return");

        case 12:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Clientes_Exclusao = function _callee21(id_empresa, id_cliente) {
  var cli, pro;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(clienteSrv.getCliente(id_empresa, id_cliente));

        case 3:
          cli = _context21.sent;

          if (!(cli == null)) {
            _context21.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'CLIENTES',
            message: "Cliente (".concat(id_empresa, " + ").concat(id_cliente, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context21.next = 8;
          return regeneratorRuntime.awrap(projetoSrv.getProjetosByIdEmpresaIdCliente(id_empresa, id_cliente));

        case 8:
          pro = _context21.sent;

          if (!(pro.length > 0)) {
            _context21.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'CLIENTES',
            message: "Cliente (".concat(id_empresa, " + ").concat(id_cliente, ") - Existe Em Outros Projetos ")
          }]);

        case 11:
          _context21.next = 16;
          break;

        case 13:
          _context21.prev = 13;
          _context21.t0 = _context21["catch"](0);
          throw _context21.t0;

        case 16:
          return _context21.abrupt("return");

        case 17:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.Empresas_Inclusao = function _callee22(empresa) {
  var tar;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(empresaSrv.getEmpresa(empresa.id));

        case 3:
          tar = _context22.sent;

          if (!(tar != null)) {
            _context22.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'EMPRESAS',
            message: "Empresa (".concat(empresa.id, ") - ").concat(empresa.razao, " J\xE1 Existe Na Base De Dados.!")
          }]);

        case 6:
          _context22.next = 11;
          break;

        case 8:
          _context22.prev = 8;
          _context22.t0 = _context22["catch"](0);
          throw _context22.t0;

        case 11:
          return _context22.abrupt("return");

        case 12:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Empresas_Alteracao = function _callee23(empresa) {
  var obj_1;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          _context23.next = 3;
          return regeneratorRuntime.awrap(empresaSrv.getEmpresa(empresa.id));

        case 3:
          obj_1 = _context23.sent;

          if (!(obj_1 == null)) {
            _context23.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'EMPRESAS',
            message: "Empresa ( ".concat(empresa.id, ") - ").concat(empresa.razao, " N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context23.next = 11;
          break;

        case 8:
          _context23.prev = 8;
          _context23.t0 = _context23["catch"](0);
          throw _context23.t0;

        case 11:
          return _context23.abrupt("return");

        case 12:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Empresas_Exclusao = function _callee24(id_empresa) {
  var obj, cli, pro;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return regeneratorRuntime.awrap(empresaSrv.getEmpresa(id_empresa));

        case 3:
          obj = _context24.sent;

          if (!(obj == null)) {
            _context24.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'EMPRESAS',
            message: "Empresa (".concat(id_empresa, ")  N\xE3o Existe Na Base De Dados.!")
          }]);

        case 6:
          _context24.next = 8;
          return regeneratorRuntime.awrap(clienteSrv.existeClientes(id_empresa));

        case 8:
          cli = _context24.sent;

          if (!(cli.total > 0)) {
            _context24.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'CLIENTES',
            message: "Existem Clientes Para Esta Empresa.! "
          }]);

        case 11:
          _context24.next = 13;
          return regeneratorRuntime.awrap(projetoSrv.getProjetosByIdEmpresa(id_empresa));

        case 13:
          pro = _context24.sent;

          if (!(pro.length > 0)) {
            _context24.next = 16;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'CONTRATOS',
            message: "Existem Contratos Para Esta Empresa.!"
          }]);

        case 16:
          _context24.next = 21;
          break;

        case 18:
          _context24.prev = 18;
          _context24.t0 = _context24["catch"](0);
          throw _context24.t0;

        case 21:
          return _context24.abrupt("return");

        case 22:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.Apons_Execucao_Inclusao = function _callee25(aponExecucao) {
  var apon, nlanc, nlanc2;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucao(aponExecucao.id_empresa, aponExecucao.id));

        case 3:
          apon = _context25.sent;

          if (!(apon != null)) {
            _context25.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE EXECUCAO',
            message: "Apontamento de Execucao  (".concat(aponExecucao.id_empresa, " + ").concat(aponExecucao.codigo, ") - ").concat(aponExecucao.descricao, " J\xE1 Existe Na Base de Dados!")
          }]);

        case 6:
          _context25.next = 8;
          return regeneratorRuntime.awrap(aponExecucaoSrv.ExisteLancamentoNestaHora(aponExecucao, 'I'));

        case 8:
          nlanc = _context25.sent;

          if (!(nlanc.total > 0)) {
            _context25.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE EXECUCAO',
            message: "Apontamento de Execucao Sobreposi\xE7\xE3o de hor\xE1rios para este lan\xE7amento!"
          }]);

        case 11:
          _context25.next = 13;
          return regeneratorRuntime.awrap(aponExecucaoSrv.ExisteLancamentoNestaHoraExato(aponExecucao, 'I'));

        case 13:
          nlanc2 = _context25.sent;

          if (!(nlanc2.total > 0)) {
            _context25.next = 16;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE EXECUCAO',
            message: "Apontamento de Execucao Sobreposi\xE7\xE3o de hor\xE1rios para este lan\xE7amento!"
          }]);

        case 16:
          _context25.next = 21;
          break;

        case 18:
          _context25.prev = 18;
          _context25.t0 = _context25["catch"](0);
          throw _context25.t0;

        case 21:
          return _context25.abrupt("return");

        case 22:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.Apons_Execucao_Alteracao = function _callee26(aponExecucao) {
  var apon, nlanc, nlanc2;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucao(aponExecucao.id_empresa, aponExecucao.id));

        case 3:
          apon = _context26.sent;

          if (!(apon == null)) {
            _context26.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: "APONTAMENTOS DE EXECUCAO', message: 'Apontamento de Execucao  (".concat(aponExecucao.id_empresa, " + ").concat(aponExecucao.id, ") - ").concat(aponExecucao.descricao, " N\xE3o Existe Na Base de Dados!")
          }]);

        case 6:
          _context26.next = 8;
          return regeneratorRuntime.awrap(aponExecucaoSrv.ExisteLancamentoNestaHora(aponExecucao, 'E'));

        case 8:
          nlanc = _context26.sent;

          if (!(nlanc.total > 0)) {
            _context26.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE EXECUCAO',
            message: "Apontamento de Execucao Sobreposi\xE7\xE3o de hor\xE1rios para este lan\xE7amento!"
          }]);

        case 11:
          _context26.next = 13;
          return regeneratorRuntime.awrap(aponExecucaoSrv.ExisteLancamentoNestaHoraExato(aponExecucao, 'E'));

        case 13:
          nlanc2 = _context26.sent;

          if (!(nlanc2.total > 0)) {
            _context26.next = 16;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE EXECUCAO',
            message: "Apontamento de Execucao Sobreposi\xE7\xE3o de hor\xE1rios para este lan\xE7amento!"
          }]);

        case 16:
          _context26.next = 21;
          break;

        case 18:
          _context26.prev = 18;
          _context26.t0 = _context26["catch"](0);
          throw _context26.t0;

        case 21:
          return _context26.abrupt("return");

        case 22:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.Apons_Execucao_Exclusao = function _callee27(id_empresa, id) {
  var tar;
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucao(id_empresa, id));

        case 3:
          tar = _context27.sent;

          if (!(tar == null)) {
            _context27.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE EXECUCAO',
            message: "Apontamento de Execucao  (".concat(id_empresa, " + ").concat(id, ") N\xE3o Existe Na Base De Dados!")
          }]);

        case 6:
          _context27.next = 11;
          break;

        case 8:
          _context27.prev = 8;
          _context27.t0 = _context27["catch"](0);
          throw _context27.t0;

        case 11:
          return _context27.abrupt("return");

        case 12:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Apons_Planejamento_Inclusao = function _callee28(aponsPlanejamento) {
  var tar;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.getAponPlanejamento(aponsPlanejamento.id_empresa, aponsPlanejamento.id));

        case 3:
          tar = _context28.sent;

          if (!(tar != null)) {
            _context28.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE planejamento',
            message: "Apontamento de Planejamento  (".concat(aponsPlanejamento.id_empresa, " + ").concat(aponsPlanejamento.id, ") - ").concat(aponsPlanejamento.descricao, " J\xE1 Existe Na Base de Dados!")
          }]);

        case 6:
          _context28.next = 11;
          break;

        case 8:
          _context28.prev = 8;
          _context28.t0 = _context28["catch"](0);
          throw _context28.t0;

        case 11:
          return _context28.abrupt("return");

        case 12:
        case "end":
          return _context28.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Apons_Planejamento_Alteracao = function _callee29(aponsPlanejamento) {
  var tar;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.getAponPlanejamento(aponsPlanejamento.id_empresa, aponsPlanejamento.id));

        case 3:
          tar = _context29.sent;

          if (!(tar == null)) {
            _context29.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: "APONTAMENTOS DE PLANEJAMENTO', message: 'Apontamento de Execucao  (".concat(aponsPlanejamento.id_empresa, " + ").concat(aponsPlanejamento.id, ") - ").concat(aponsPlanejamento.descricao, " N\xE3o Existe Na Base de Dados!")
          }]);

        case 6:
          _context29.next = 11;
          break;

        case 8:
          _context29.prev = 8;
          _context29.t0 = _context29["catch"](0);
          throw _context29.t0;

        case 11:
          return _context29.abrupt("return");

        case 12:
        case "end":
          return _context29.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Apons_Planejamento_Exclusao = function _callee30(id_empresa, id) {
  var tar;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.getAponPlanejamento(id_empresa, id));

        case 3:
          tar = _context30.sent;

          if (!(tar == null)) {
            _context30.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'APONTAMENTOS DE planejamento',
            message: "Apontamento de Planejamento  (".concat(id_empresa, " + ").concat(id, ") N\xE3o Existe Na Base De Dados!")
          }]);

        case 6:
          _context30.next = 11;
          break;

        case 8:
          _context30.prev = 8;
          _context30.t0 = _context30["catch"](0);
          throw _context30.t0;

        case 11:
          return _context30.abrupt("return");

        case 12:
        case "end":
          return _context30.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Atividades_Inclusao = function _callee31(id_empresa, conta, versao, id_projeto) {
  var obj;
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividade(id_empresa, conta, versao, id_projeto));

        case 3:
          obj = _context31.sent;

          if (!(obj.total != 0)) {
            _context31.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: " Atividade (".concat(conta, " Vers\xE3o:").concat(versao, "J\xE1 Est\xE1 Anexada Neste Projeto!")
          }]);

        case 6:
          _context31.next = 11;
          break;

        case 8:
          _context31.prev = 8;
          _context31.t0 = _context31["catch"](0);
          throw _context31.t0;

        case 11:
          return _context31.abrupt("return");

        case 12:
        case "end":
          return _context31.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Atividade_Exclusao = function _callee32(id_empresa, id_projeto, conta, versao, subconta) {
  var obj, ct_pl, ct_ex;
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          console.log('par=>', id_empresa, id_projeto, conta, versao, subconta);
          _context32.next = 4;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividade(id_empresa, id_projeto, conta, versao, subconta));

        case 4:
          obj = _context32.sent;
          console.log('obj.total', obj.total);

          if (!(obj.total == 0)) {
            _context32.next = 8;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, " Vers\xE3o: ").concat(versao, " N\xE3o Est\xE1 Anexada Neste Projeto!")
          }]);

        case 8:
          _context32.next = 10;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.existeAponPlanejamentoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta));

        case 10:
          ct_pl = _context32.sent;
          console.log('ct_pl', ct_pl.total);

          if (!(ct_pl.total > 0)) {
            _context32.next = 14;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, " Vers\xE3o: ").concat(versao, " Possui Lan\xE7amentos De Planejamento")
          }]);

        case 14:
          _context32.next = 16;
          return regeneratorRuntime.awrap(aponExecucaoSrv.existeAponExecucaoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta));

        case 16:
          ct_ex = _context32.sent;
          console.log('ct_ex', ct_ex.total);

          if (!(ct_ex.total > 0)) {
            _context32.next = 20;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, " Vers\xE3o: ").concat(versao, " Possui Lan\xE7amentos De Executa\xE7\xE3o")
          }]);

        case 20:
          _context32.next = 25;
          break;

        case 22:
          _context32.prev = 22;
          _context32.t0 = _context32["catch"](0);
          throw _context32.t0;

        case 25:
          return _context32.abrupt("return");

        case 26:
        case "end":
          return _context32.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.Atividades_Exclusao = function _callee33(id_empresa, conta, versao, id_projeto) {
  var obj, ct_pl, ct_ex;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          _context33.next = 3;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividades(id_empresa, id_projeto, conta, versao));

        case 3:
          obj = _context33.sent;

          if (!(obj.total == 0)) {
            _context33.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, " Vers\xE3o: ").concat(versao, " N\xE3o Est\xE1 Anexada Neste Projeto!")
          }]);

        case 6:
          _context33.next = 8;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.existeAponPlanejamentoAtividade(id_empresa, id_projeto));

        case 8:
          ct_pl = _context33.sent;

          if (!(ct_pl.total > 0)) {
            _context33.next = 11;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, " Vers\xE3o: ").concat(versao, " Possui Lan\xE7amentos De Planejamento")
          }]);

        case 11:
          _context33.next = 13;
          return regeneratorRuntime.awrap(aponExecucaoSrv.existeAponExecucaoAtividade(id_empresa, id_projeto));

        case 13:
          ct_ex = _context33.sent;

          if (!(ct_ex.total > 0)) {
            _context33.next = 16;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, " Vers\xE3o: ").concat(versao, " Possui Lan\xE7amentos De Executa\xE7\xE3o")
          }]);

        case 16:
          _context33.next = 21;
          break;

        case 18:
          _context33.prev = 18;
          _context33.t0 = _context33["catch"](0);
          throw _context33.t0;

        case 21:
          return _context33.abrupt("return");

        case 22:
        case "end":
          return _context33.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.Atividades_Delete_Estrutura = function _callee34(id_empresa, conta, versao) {
  var obj;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividadesEstrutura(id_empresa, conta, versao));

        case 3:
          obj = _context34.sent;

          if (!(obj.total > 0)) {
            _context34.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Existem Atividades Anexadas Nesta Estrutura!"
          }]);

        case 6:
          _context34.next = 11;
          break;

        case 8:
          _context34.prev = 8;
          _context34.t0 = _context34["catch"](0);
          throw _context34.t0;

        case 11:
          return _context34.abrupt("return");

        case 12:
        case "end":
          return _context34.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Atividades_Delete_SubConta = function _callee35(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
  var obj, men;
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          _context35.next = 3;
          return regeneratorRuntime.awrap(AtividadeSrv.existeLancamentosSubconta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel));

        case 3:
          obj = _context35.sent;

          if (!(obj.length == 2 && (obj[0].total > 0 || obj[1].total > 0))) {
            _context35.next = 10;
            break;
          }

          men = "";
          men += obj[0].total + obj[1].total > 0 ? "Existem " : "";
          men += obj[0].total > 0 ? "".concat(obj[0].total, " Lan\xE7. De Execu\xE7\xE3o} ") : "";
          men += obj[1].total > 0 ? "".concat(obj[1].total, " Lan\xE7. De Planejamento}") : "";
          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: men
          }]);

        case 10:
          _context35.next = 15;
          break;

        case 12:
          _context35.prev = 12;
          _context35.t0 = _context35["catch"](0);
          throw _context35.t0;

        case 15:
          return _context35.abrupt("return");

        case 16:
        case "end":
          return _context35.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.Estruturas_Inclusao = function _callee36(id_empresa, conta, versao, id_projeto) {
  var obj;
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividade(id_empresa, conta, versao, id_projeto));

        case 3:
          obj = _context36.sent;

          if (!(obj.total != 0)) {
            _context36.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: " Atividade (".concat(conta, " ").concat(versao, " J\xE1 Est\xE1 Anexada Neste Projeto!")
          }]);

        case 6:
          _context36.next = 11;
          break;

        case 8:
          _context36.prev = 8;
          _context36.t0 = _context36["catch"](0);
          throw _context36.t0;

        case 11:
          return _context36.abrupt("return");

        case 12:
        case "end":
          return _context36.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Estruturas_Exclusao = function _callee37(id_empresa, conta, id_projeto) {
  var obj;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return regeneratorRuntime.awrap(AtividadeSrv.existeAtividade(id_empresa, conta, id_projeto));

        case 3:
          obj = _context37.sent;

          if (!(obj.total == 0)) {
            _context37.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'ATIVIDADE',
            message: "Estrutura (".concat(conta, "  N\xE3o Est\xE1 Anexada Neste Projeto!")
          }]);

        case 6:
          _context37.next = 11;
          break;

        case 8:
          _context37.prev = 8;
          _context37.t0 = _context37["catch"](0);
          throw _context37.t0;

        case 11:
          return _context37.abrupt("return");

        case 12:
        case "end":
          return _context37.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.Titulo_Projeto_Inclusao = function _callee38(titulo) {
  var erro_data, data_vencto, data_pagto, time_pagto, obj;
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          console.log('Titulo_Projeto_Inclusao =>', titulo);
          erro_data = '';
          data_vencto = new Date(shared.formatDateYYYYMMDD(titulo.data_vencto));

          if (titulo.data_pagto !== '') {
            data_pagto = new Date(shared.formatDateYYYYMMDD(titulo.data_pagto));
            time_pagto = data_pagto.getTime();

            if (time_pagto < data_vencto.getTime()) {
              erro_data = 'Data De Pagamento Deverá Ser Maior Ou Igual A Data De Vencto!';
            }
          }

          _context38.prev = 4;

          if (!(erro_data != '')) {
            _context38.next = 7;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'TITULOS',
            message: "".concat(erro_data)
          }]);

        case 7:
          _context38.next = 9;
          return regeneratorRuntime.awrap(titulo_projetoSrv.getTitulo_Projeto(titulo.id_empresa, titulo.id_projeto, titulo.data_vencto));

        case 9:
          obj = _context38.sent;

          if (!(obj != null)) {
            _context38.next = 12;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'TITULOS',
            message: " Titulo J\xE1 Cadastrado!"
          }]);

        case 12:
          _context38.next = 17;
          break;

        case 14:
          _context38.prev = 14;
          _context38.t0 = _context38["catch"](4);
          throw _context38.t0;

        case 17:
          return _context38.abrupt("return");

        case 18:
        case "end":
          return _context38.stop();
      }
    }
  }, null, null, [[4, 14]]);
};

exports.Titulo_Projeto_Alteracao = function _callee39(titulo) {
  var erro_data, data_vencto, data_pagto, time_pagto, obj;
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          console.log('Titulo_Projeto_Alteracao =>', titulo);
          erro_data = '';
          data_vencto = new Date(shared.formatDateYYYYMMDD(titulo.data_vencto));

          if (titulo.data_pagto !== '') {
            data_pagto = new Date(shared.formatDateYYYYMMDD(titulo.data_pagto));
            time_pagto = data_pagto.getTime();

            if (time_pagto < data_vencto.getTime()) {
              erro_data = 'Data De Pagamento Deverá Ser Maior Ou Igual A Data De Vencto!';
            }
          }

          console.log('Regra de negocio alteração =>', titulo);
          _context39.prev = 5;

          if (!(erro_data != '')) {
            _context39.next = 8;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'TITULOS',
            message: "".concat(erro_data)
          }]);

        case 8:
          _context39.next = 10;
          return regeneratorRuntime.awrap(titulo_projetoSrv.getTitulo_Projeto(titulo.id_empresa, titulo.id_projeto, titulo.data_vencto));

        case 10:
          obj = _context39.sent;

          if (!(obj == null)) {
            _context39.next = 13;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'TITULOS',
            message: " Titulo  N\xE3o Cadastrado!"
          }]);

        case 13:
          _context39.next = 18;
          break;

        case 15:
          _context39.prev = 15;
          _context39.t0 = _context39["catch"](5);
          throw _context39.t0;

        case 18:
          return _context39.abrupt("return");

        case 19:
        case "end":
          return _context39.stop();
      }
    }
  }, null, null, [[5, 15]]);
};

exports.Titulo_Projeto_Exclusao = function _callee40(id_empresa, id_projeto, data_vencto) {
  var obj;
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.prev = 0;
          _context40.next = 3;
          return regeneratorRuntime.awrap(titulo_projetoSrv.getTitulo_Projeto(id_empresa, id_projeto, data_vencto));

        case 3:
          obj = _context40.sent;

          if (!(obj == null)) {
            _context40.next = 6;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'TITULOS',
            message: " Titulo ".concat(data_vencto, " N\xE3o Est\xE1 Cadastrado!")
          }]);

        case 6:
          if (!(obj != null)) {
            _context40.next = 9;
            break;
          }

          if (!(obj.data_pagto != null)) {
            _context40.next = 9;
            break;
          }

          throw new erroDB.UserException('Regra de negócio', [{
            tabela: 'TITULOS',
            message: " Titulo ".concat(data_vencto, " Est\xE1 Baixado. N\xE3o Posso Exclu\xED-lo!")
          }]);

        case 9:
          _context40.next = 14;
          break;

        case 11:
          _context40.prev = 11;
          _context40.t0 = _context40["catch"](0);
          throw _context40.t0;

        case 14:
          return _context40.abrupt("return");

        case 15:
        case "end":
          return _context40.stop();
      }
    }
  }, null, null, [[0, 11]]);
};