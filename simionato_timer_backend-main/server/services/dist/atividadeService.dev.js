"use strict";

/* SERVICE atividades */
var atividadeData = require('../data/atividadeData');

var validacao = require('../util/validacao');

var parametros = require('../util/parametrostabelas');

var erroDB = require('../util/userfunctiondb');

var regras = require('../util/regrasdenegocio');

var TABELA = 'ATIVIDADES';
/* CRUD GET SERVICE */

exports.getAtividade = function _callee(id_empresa, id) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", atividadeData.getAtividade(id_empresa, id));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* CRUD GET ALL SERVICE */


exports.getAtividadesVazia = function _callee2(params) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", atividadeData.getAtividadesVazia(params));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAtividades = function _callee3(params) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", atividadeData.getAtividades(params));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //* CRUD - INSERT - SERVICE */


exports.insertAtividade = function _callee4(atividade) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          return _context4.abrupt("return", atividadeData.insertAtividade(atividade));

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


exports.updateAtividade = function _callee5(atividade) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          return _context5.abrupt("return", atividadeData.updateAtividade(atividade));

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

exports.updateAtividadeHorasDir = function _callee6(atividadeHorasDir) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          return _context6.abrupt("return", atividadeData.updateAtividadeHorasDir(atividadeHorasDir));

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
}; //* CRUD - DELETE - SERVICE */


exports.deleteAtividade = function _callee7(id_empresa, id_projeto, conta, versao, subconta) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(regras.Atividade_Exclusao(id_empresa, id_projeto, conta, versao, subconta));

        case 3:
          return _context7.abrupt("return", atividadeData.deleteAtividade(id_empresa, id_projeto, conta, versao, subconta));

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          throw new erroDB.UserException(_context7.t0.erro, _context7.t0);

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //


exports.deleteAtividadeEstrutura = function _callee8(id_empresa, conta) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(regras.Atividades_Inclusao(id_empresa, conta, id_projeto));

        case 3:
          return _context8.abrupt("return", atividadeData.deleteAtividadeEstrutura(id_empresa, conta));

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
}; //* ANEXA ESTRUTURA - SERVICE */


exports.anexaAtividade = function _callee9(id_empresa, conta, versao, id_projeto, id_resp, id_exec) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          return _context9.abrupt("return", atividadeData.anexaAtividade(id_empresa, conta, versao, id_projeto, id_resp, id_exec));

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

exports.anexaAtividadev2 = function _callee10(atividades) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          return _context10.abrupt("return", atividadeData.anexaAtividadev2(atividades));

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
}; //* DESANEXA ESTRUTURA - SERVICE */


exports.desanexaAtividade = function _callee11(id_empresa, conta, versao, id_projeto) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(regras.Atividades_Exclusao(id_empresa, conta, versao, id_projeto));

        case 3:
          return _context11.abrupt("return", atividadeData.desanexaAtividade(id_empresa, conta, versao, id_projeto));

        case 6:
          _context11.prev = 6;
          _context11.t0 = _context11["catch"](0);
          throw new erroDB.UserException(_context11.t0.erro, _context11.t0);

        case 9:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //* EXISTE ESTRUTURA - SERVICE */


exports.existeAtividade = function _callee12(id_empresa, id_projeto, conta, versao, subconta) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          return _context12.abrupt("return", atividadeData.existeAtividade(id_empresa, id_projeto, conta, versao, subconta));

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

exports.existeAtividades = function _callee13(id_empresa, id_projeto, conta, versao) {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          return _context13.abrupt("return", atividadeData.existeAtividades(id_empresa, id_projeto, conta, versao));

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

exports.existeAtividadesByProj = function _callee14(id_empresa, id_projeto) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          return _context14.abrupt("return", atividadeData.existeAtividadesByProj(id_empresa, id_projeto));

        case 4:
          _context14.prev = 4;
          _context14.t0 = _context14["catch"](0);
          throw new erroDB.UserException(_context14.t0.erro, _context14.t0);

        case 7:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.existeAtividadesEstrutura = function _callee15(id_empresa, conta, versao) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          return _context15.abrupt("return", atividadeData.existeAtividadesEstrutura(id_empresa, conta, versao));

        case 4:
          _context15.prev = 4;
          _context15.t0 = _context15["catch"](0);
          throw new erroDB.UserException(_context15.t0.erro, _context15.t0);

        case 7:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.setStatus = function _callee16(id_empresa, id_projeto, id_subconta) {
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          return _context16.abrupt("return", atividadeData.setatus(id_empresa, id_projeto, id_subconta));

        case 4:
          _context16.prev = 4;
          _context16.t0 = _context16["catch"](0);
          throw new erroDB.UserException(_context16.t0.erro, _context16.t0);

        case 7:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.existeAtividadesByProj = function _callee17(id_empresa, id_projeto) {
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          return _context17.abrupt("return", atividadeData.existeAtividadesByProj(id_empresa, id_projeto));

        case 4:
          _context17.prev = 4;
          _context17.t0 = _context17["catch"](0);
          throw new erroDB.UserException(_context17.t0.erro, _context17.t0);

        case 7:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.existeLancamentosSubconta = function (id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
  return atividadeData.existeLancamentosSubconta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel);
};
/*
exports.existeAtividadesByProj = async function desanexarsubconta(id_empresa, id_projeto, conta, id_conta_versao, id_subconta, nivel) {
    try {
        await regras.Atividades_Exclusao(id_empresa, conta, versao, id_projeto);
        return atividadeData.existeAtividadesByProj(id_empresa, id_projeto);
    } catch (err) {
        throw new erroDB.UserException(err.erro, err);
    }

}
*/


exports.desanexasubconta = function _callee18(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(regras.Atividades_Delete_SubConta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel));

        case 3:
          return _context18.abrupt("return", atividadeData.desanexasubconta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel));

        case 6:
          _context18.prev = 6;
          _context18.t0 = _context18["catch"](0);
          throw new erroDB.UserException(_context18.t0.erro, _context18.t0);

        case 9:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 6]]);
};