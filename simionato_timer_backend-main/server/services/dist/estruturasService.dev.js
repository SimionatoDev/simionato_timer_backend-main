"use strict";

/* SERVICE estruturas */
var estruturasData = require('../data/estruturasData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var erroDB = require('../util/userfunctiondb');

var regras = require('../util/regrasdenegocio');

var TABELA = 'ESTRUTURAS';
/* CRUD GET SERVICE */

exports.getEstrutura = function _callee(id_empresa, conta, versao, subconta) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", estruturasData.getEstrutura(id_empresa, conta, versao, subconta));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* CRUD GET CONTA SERVICE */


exports.getConta = function _callee2(id_empresa, conta, versao) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", estruturasData.getConta(id_empresa, conta, versao));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/* CRUD GET ALL SERVICE */


exports.getEstruturas = function _callee3(params) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", estruturasData.getEstruturas(params));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //* CRUD - INSERT - SERVICE */


exports.insertEstrutura = function _callee4(estrutura) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          return _context4.abrupt("return", estruturasData.insertEstrutura(estrutura));

        case 4:
          _context4.prev = 4;
          _context4.t0 = _context4["catch"](0);
          throw new erroDB.UserException(_context4.t0.erro, _context4.t0);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 4]]);
}; //* CRUD - UPDATE - SERVICE */


exports.updateEstrutura = function _callee5(estrutura) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          return _context5.abrupt("return", estruturasData.updateEstrutura(estrutura));

        case 4:
          _context5.prev = 4;
          _context5.t0 = _context5["catch"](0);
          throw new erroDB.UserException(_context5.t0.erro, _context5.t0);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.saveAllEstrutura = function _callee6(estruturas) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          return _context6.abrupt("return", estruturasData.saveAllEstrutura(estruturas));

        case 4:
          _context6.prev = 4;
          _context6.t0 = _context6["catch"](0);
          throw new erroDB.UserException(_context6.t0.erro, _context6.t0);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 4]]);
};
/* CRUD DELETE SERVICE */


exports.deleteEstrutura = function _callee7(id_empresa, conta, versao, subconta) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(estruturasData.deleteEstrutura(id_empresa, conta, versao, subconta));

        case 3:
          _context7.next = 8;
          break;

        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          throw new erroDB.UserException(_context7.t0.erro, _context7.t0);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

exports.deleteAllEstrutura = function _callee8(id_empresa, conta, versao) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          console.log('deleteAllEstrutura');
          _context8.next = 4;
          return regeneratorRuntime.awrap(regras.Atividades_Delete_Estrutura(id_empresa, conta, versao));

        case 4:
          _context8.next = 6;
          return regeneratorRuntime.awrap(estruturasData.deleteAllEstrutura(id_empresa, conta, versao));

        case 6:
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          throw new erroDB.UserException(_context8.t0.erro, _context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
/* CRUD LAST ESTRUTURA SERVICE */


exports.lastConta = function _callee9(id_empresa) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          return _context9.abrupt("return", estruturasData.lastConta(id_empresa));

        case 4:
          _context9.prev = 4;
          _context9.t0 = _context9["catch"](0);
          throw new erroDB.UserException(_context9.t0.erro, _context9.t0);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 4]]);
};
/* CRUD LAST SUBCONTA SERVICE */


exports.lastSubConta = function _callee10(id_empresa, conta, versao, subconta, nivel) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          return _context10.abrupt("return", estruturasData.lastSubConta(id_empresa, conta, versao, subconta, nivel));

        case 4:
          _context10.prev = 4;
          _context10.t0 = _context10["catch"](0);
          throw new erroDB.UserException(_context10.t0.erro, _context10.t0);

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 4]]);
};
/* MUDA O STATUS */


exports.mudaStatus = function _callee11(id_empresa, conta, versao, status) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          return _context11.abrupt("return", estruturasData.mudaStatus(id_empresa, conta, versao, status));

        case 4:
          _context11.prev = 4;
          _context11.t0 = _context11["catch"](0);
          throw new erroDB.UserException(_context11.t0.erro, _context11.t0);

        case 7:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 4]]);
};
/* COPIA ESTRUTURA */


exports.Estrutura_header = function _callee12(id_empresa, conta, versao, controle, descricao) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          return _context12.abrupt("return", estruturasData.Estrutura_header(id_empresa, conta, versao, controle, descricao));

        case 4:
          _context12.prev = 4;
          _context12.t0 = _context12["catch"](0);
          throw new erroDB.UserException(_context12.t0.erro, _context12.t0);

        case 7:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 4]]);
};
/* COPIA ESTRUTURA */


exports.getEstrutura_histo = function _callee13(par) {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          return _context13.abrupt("return", estruturasData.getEstrutura_Histo(par));

        case 4:
          _context13.prev = 4;
          _context13.t0 = _context13["catch"](0);
          throw new erroDB.UserException(_context13.t0.erro, _context13.t0);

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 4]]);
};