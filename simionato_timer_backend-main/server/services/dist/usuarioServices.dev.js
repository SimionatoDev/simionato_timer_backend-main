"use strict";

var usuarioData = require('../data/usuarioData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var erroDB = require('../util/userfunctiondb');

var regras = require('../util/regrasdenegocio');

var TABELA = 'USUARIOS';

exports.getUsuario = function _callee(id_empresa, id) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", usuarioData.getUsuario(id_empresa, id));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getUsuarioByEmail = function _callee2(id_empresa, email) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", usuarioData.getUsuarioByEmail(id_empresa, email));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getUsuarioByEmail = function _callee3(id_empresa, email) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", usuarioData.getUsuarioByEmail(id_empresa, email));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getUsuarios = function _callee4(params) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", usuarioData.getUsuarios(params));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getUsuariosByProjeto = function _callee5(params) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", usuarioData.getUsuariosByProjeto(params));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.insertUsuario = function _callee6(usuario) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(regras.Usuarios_Inclusao(usuario));

        case 3:
          validacao.Validacao(TABELA, usuario, parametros.Usuarios());
          return _context6.abrupt("return", usuarioData.insertUsuario(usuario));

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw new erroDB.UserException(_context6.t0.erro, _context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateUsuario = function _callee7(usuario) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(regras.Usuarios_Alteracao(usuario));

        case 3:
          validacao.Validacao(TABELA, usuario, parametros.Usuarios());
          return _context7.abrupt("return", usuarioData.updateUsuario(usuario));

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          throw new erroDB.UserException(_context7.t0.erro, _context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteUsuario = function _callee8(id_empresa, id) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(regras.Usuarios_Exclusao(id_empresa, id));

        case 3:
          return _context8.abrupt("return", usuarioData.deleteUsuario(id_empresa, id));

        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          throw new erroDB.UserException(_context8.t0.erro, _context8.t0);

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.existeUsuariosByGrupo = function (id_empresa, id_grupo) {
  return usuarioData.existeUsuariosByGrupo(id_empresa, id_grupo);
};

exports.usarioHorasExec = function (params) {
  return usuarioData.usarioHorasExec(params);
};