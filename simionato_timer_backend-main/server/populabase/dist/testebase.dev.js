"use strict";

var empresaSrv = require('../services/empresaServices');

var grupoEcoSrv = require('../services/grupoEcoServices');

var grupoUserSrv = require('../services/grupoUserServices');

var usuarioSrv = require('../services/usuarioServices');

var projetoSrv = require('../services/projetoServices');

var clienteSrv = require('../services/clienteServices');

var motivoApoSrv = require('../services/motivoApoServices');

var aponExecucaoSrv = require('../services/aponExecucaoServices');

var aponPlanejamentoSrv = require('../services/aponPlanejamentoServices');

var clientesJson = require('../util/clientes');

var estruturaSrv = require('../services/estruturasService');

var atividadeSrv = require('../services/atividadeService');

var shared = require('../util/shared');

Empresa = function Empresa() {
  var emp;
  return regeneratorRuntime.async(function Empresa$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = 0;
          empresa = {
            id: 0,
            cnpj_cpf: "",
            razao: "SIMIONATO AUDITORES INDEPENDENTES",
            fantasi: "SIMIONATO",
            inscri: "",
            cadastr: "2022-03-01",
            ruaf: "RUA RAFAEL ANDRADE DUARTE",
            nrof: "232",
            complementof: "",
            bairrof: "BAIRRO NOVA CAMPINAS",
            cidadef: "CAMPINAS",
            uff: "SP",
            cepf: "13092180",
            tel1: "1937533030",
            tel2: "",
            emailf: "marcos.falconi@simionatoauditores.com.br",
            obs: "EMPRESA PRINCIPAL"
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(empresaSrv.getEmpresas());

        case 5:
          emp = _context.sent;

          if (!(emp.length == 0)) {
            _context.next = 20;
            break;
          }

          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(empresaSrv.insertEmpresa(empresa));

        case 10:
          retorno = _context.sent;
          id = retorno.id;
          console.log("Empresas INCLUIDA ID  = ", id);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](7);

          if (_context.t0.name == 'MyExceptionDB') {
            mensagens = _context.t0.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context.t0.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context.t0.tabela, _context.t0.message);
          }

        case 18:
          _context.next = 32;
          break;

        case 20:
          empresa.id = emp[0].id;
          empresa.obs = 'Empresa Alterada';
          _context.prev = 22;
          _context.next = 25;
          return regeneratorRuntime.awrap(empresaSrv.updateEmpresa(empresa));

        case 25:
          id = empresa.id;
          console.log("Alteração EMPRESA: OK ID ", id);
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t1 = _context["catch"](22);

          if (_context.t1.name == 'MyExceptionDB') {
            mensagens = _context.t1.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context.t1.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão<<Empresas>>...", _context.t1.message);
          }

        case 32:
          _context.next = 37;
          break;

        case 34:
          _context.prev = 34;
          _context.t2 = _context["catch"](2);
          console.log("Falha EMPRESAS..", _context.t2.message);

        case 37:
          return _context.abrupt("return", id);

        case 38:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 34], [7, 15], [22, 29]]);
};

GrupoEconomico = function GrupoEconomico(id_empresa) {
  var grupoEco, grupos, _retorno;

  return regeneratorRuntime.async(function GrupoEconomico$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id_grupo = 0;
          grupoEco = {
            id_empresa: id_empresa,
            id: 0,
            razao: "GRUPO ECONOMICO"
          };
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(grupoEcoSrv.getGrupoEcos());

        case 5:
          grupos = _context2.sent;

          if (!(grupos.length == 0)) {
            _context2.next = 19;
            break;
          }

          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(grupoEcoSrv.insertGrupoEco(grupoEco));

        case 10:
          _retorno = _context2.sent;
          console.log("Grupo Economico OK");
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](7);

          if (_context2.t0.name == 'MyExceptionDB') {
            mensagens = _context2.t0.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context2.t0.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context2.t0.tabela, _context2.t0.message);
          }

        case 17:
          _context2.next = 20;
          break;

        case 19:
          console.log("Tabela de Grupos Economicos Já Existe!");

        case 20:
          _context2.next = 25;
          break;

        case 22:
          _context2.prev = 22;
          _context2.t1 = _context2["catch"](2);
          console.log("Falha Na Inclusão...", _context2.t1.message);

        case 25:
          return _context2.abrupt("return", id_grupo);

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 22], [7, 14]]);
};

GrupoUsuarios = function GrupoUsuarios(id_empresa) {
  var grupos, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, grupo, gru;

  return regeneratorRuntime.async(function GrupoUsuarios$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id_grupo = 0;
          grupoUsers = [{
            id_empresa: id_empresa,
            id: 0,
            grupo: "DIRETOR"
          }, {
            id_empresa: id_empresa,
            id: 0,
            grupo: "SUPERVISOR"
          }, {
            id_empresa: id_empresa,
            id: 0,
            grupo: "AUDITOR"
          }, {
            id_empresa: id_empresa,
            id: 0,
            grupo: "TRAINEE"
          }, {
            id_empresa: id_empresa,
            id: 0,
            grupo: "ADM"
          }];
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(grupoUserSrv.getGrupoUsers());

        case 5:
          grupos = _context3.sent;

          if (!(grupos.length == 0)) {
            _context3.next = 50;
            break;
          }

          _context3.prev = 7;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 11;
          _iterator = grupoUsers[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 27;
            break;
          }

          grupo = _step.value;
          _context3.prev = 15;
          _context3.next = 18;
          return regeneratorRuntime.awrap(grupoUserSrv.insertGrupoUser(grupo));

        case 18:
          gru = _context3.sent;
          _context3.next = 24;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](15);

          if (_context3.t0.name == 'MyExceptionDB') {
            mensagens = _context3.t0.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context3.t0.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context3.t0.tabela, _context3.t0.message);
          }

        case 24:
          _iteratorNormalCompletion = true;
          _context3.next = 13;
          break;

        case 27:
          _context3.next = 33;
          break;

        case 29:
          _context3.prev = 29;
          _context3.t1 = _context3["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context3.t1;

        case 33:
          _context3.prev = 33;
          _context3.prev = 34;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 36:
          _context3.prev = 36;

          if (!_didIteratorError) {
            _context3.next = 39;
            break;
          }

          throw _iteratorError;

        case 39:
          return _context3.finish(36);

        case 40:
          return _context3.finish(33);

        case 41:
          ;
          console.log("Grupos de usuários incluído com sucesso!");
          _context3.next = 48;
          break;

        case 45:
          _context3.prev = 45;
          _context3.t2 = _context3["catch"](7);
          console.log("Falha Na Inclusão Dos Grupos", _context3.t2.message);

        case 48:
          _context3.next = 51;
          break;

        case 50:
          console.log('Tabela de Grupos De Usuários Já Está Populada..');

        case 51:
          _context3.next = 56;
          break;

        case 53:
          _context3.prev = 53;
          _context3.t3 = _context3["catch"](2);
          console.log("Falha Na Inclusão Dos Grupos", _context3.t3.message);

        case 56:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 53], [7, 45], [11, 29, 33, 41], [15, 21], [34,, 36, 40]]);
};

Usuarios = function Usuarios(id_empresa) {
  var usuarios, users, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, usuario, gru;

  return regeneratorRuntime.async(function Usuarios$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id_usuario = 0;
          usuarios = [{
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "ANDRÉ",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 2
          }, {
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "BIANCA",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 3
          }, {
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "SAMILA",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 5
          }, {
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "MARCOS",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 0
          }];
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(usuarioSrv.getUsuarios());

        case 5:
          users = _context4.sent;

          if (!(users.length == 0)) {
            _context4.next = 44;
            break;
          }

          _context4.prev = 7;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 11;
          _iterator2 = usuarios[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 21;
            break;
          }

          usuario = _step2.value;
          _context4.next = 17;
          return regeneratorRuntime.awrap(usuarioSrv.insertUsuario(usuario));

        case 17:
          gru = _context4.sent;

        case 18:
          _iteratorNormalCompletion2 = true;
          _context4.next = 13;
          break;

        case 21:
          _context4.next = 27;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](11);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 27:
          _context4.prev = 27;
          _context4.prev = 28;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 30:
          _context4.prev = 30;

          if (!_didIteratorError2) {
            _context4.next = 33;
            break;
          }

          throw _iteratorError2;

        case 33:
          return _context4.finish(30);

        case 34:
          return _context4.finish(27);

        case 35:
          ;
          console.log("Tabela de Usuários incluído com sucesso!");
          _context4.next = 42;
          break;

        case 39:
          _context4.prev = 39;
          _context4.t1 = _context4["catch"](7);

          if (_context4.t1.name == 'MyExceptionDB') {
            mensagens = _context4.t1.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context4.t1.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context4.t1.tabela, _context4.t1.message);
          }

        case 42:
          _context4.next = 45;
          break;

        case 44:
          console.log('Tabela de Usuários Já Está Populada..');

        case 45:
          _context4.next = 50;
          break;

        case 47:
          _context4.prev = 47;
          _context4.t2 = _context4["catch"](2);
          console.log("Falha Na Inclusão <<USUÁRIOS>>...", _context4.t2.message);

        case 50:
          return _context4.abrupt("return", id_usuario);

        case 51:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 47], [7, 39], [11, 23, 27, 35], [28,, 30, 34]]);
};

Projetos = function Projetos(id_empresa, id_cliente, id_diretor) {
  var projetos, lsprojetos, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3;

  return regeneratorRuntime.async(function Projetos$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          projetos = [{
            id_empresa: id_empresa,
            id: 0,
            id_cliente: id_cliente,
            id_diretor: id_diretor,
            dataprop: Date.now() - 20,
            dataproj: Date.now() - 15,
            dataenc: null,
            descricao: "PROJETO INVENTÁRIO",
            horasve: 200,
            horasplan: 0,
            horasexec: 0,
            status: '5'
          }, {
            id_empresa: id_empresa,
            id: 0,
            id_cliente: id_diretor,
            id_diretor: id_cliente,
            dataprop: Date.now(),
            dataproj: Date.now(),
            dataenc: null,
            descricao: "PROJETO FINANCEIRO",
            horasve: 200,
            horasplan: 0,
            horasexec: 0,
            status: '5'
          }];
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(projetoSrv.getProjetos());

        case 4:
          lsprojetos = _context5.sent;
          _context5.prev = 5;

          if (!(lsprojetos.length == 0)) {
            _context5.next = 42;
            break;
          }

          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context5.prev = 10;
          _iterator3 = projetos[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context5.next = 25;
            break;
          }

          projeto = _step3.value;
          _context5.prev = 14;
          _context5.next = 17;
          return regeneratorRuntime.awrap(projetoSrv.insertProjeto(projeto));

        case 17:
          _context5.next = 22;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](14);

          if (_context5.t0.name == 'MyExceptionDB') {
            mensagens = _context5.t0.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context5.t0.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context5.t0.tabela, _context5.t0.message);
          }

        case 22:
          _iteratorNormalCompletion3 = true;
          _context5.next = 12;
          break;

        case 25:
          _context5.next = 31;
          break;

        case 27:
          _context5.prev = 27;
          _context5.t1 = _context5["catch"](10);
          _didIteratorError3 = true;
          _iteratorError3 = _context5.t1;

        case 31:
          _context5.prev = 31;
          _context5.prev = 32;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 34:
          _context5.prev = 34;

          if (!_didIteratorError3) {
            _context5.next = 37;
            break;
          }

          throw _iteratorError3;

        case 37:
          return _context5.finish(34);

        case 38:
          return _context5.finish(31);

        case 39:
          console.log("Tabela de Projetos incluído com sucesso!");
          _context5.next = 43;
          break;

        case 42:
          console.log('Tabela de Projetos Já Está Populada..');

        case 43:
          _context5.next = 48;
          break;

        case 45:
          _context5.prev = 45;
          _context5.t2 = _context5["catch"](5);
          console.log("Falha Na Inclusão <<PROJETOS>>...", _context5.t2.message);

        case 48:
          _context5.next = 53;
          break;

        case 50:
          _context5.prev = 50;
          _context5.t3 = _context5["catch"](1);
          console.log("Falha Na Inclusão <<PROJETOS>>...", _context5.t3.message);

        case 53:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 50], [5, 45], [10, 27, 31, 39], [14, 19], [32,, 34, 38]]);
};

Clientes = function Clientes(id_empresa, gru_econo) {
  var clientes, clients, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4;

  return regeneratorRuntime.async(function Clientes$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          clientes = [{
            id_empresa: id_empresa,
            id: 0,
            cnpj_cpf: "0123456789123",
            razao: "CLIENTE A",
            fantasi: "",
            inscri: "",
            cadastr: Date.now(),
            ruaf: "",
            nrof: "",
            complementof: "",
            bairrof: "",
            cidadef: "",
            uff: "SP",
            cepf: "",
            tel1: "",
            tel2: "",
            emailf: "",
            obs: "",
            gru_econo: gru_econo
          }];
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(clienteSrv.getClientes());

        case 4:
          clients = _context6.sent;

          if (!(clients.length == 0)) {
            _context6.next = 41;
            break;
          }

          _context6.prev = 6;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context6.prev = 10;
          _iterator4 = clientes[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context6.next = 19;
            break;
          }

          cliente = _step4.value;
          _context6.next = 16;
          return regeneratorRuntime.awrap(clienteSrv.insertCliente(cliente));

        case 16:
          _iteratorNormalCompletion4 = true;
          _context6.next = 12;
          break;

        case 19:
          _context6.next = 25;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](10);
          _didIteratorError4 = true;
          _iteratorError4 = _context6.t0;

        case 25:
          _context6.prev = 25;
          _context6.prev = 26;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 28:
          _context6.prev = 28;

          if (!_didIteratorError4) {
            _context6.next = 31;
            break;
          }

          throw _iteratorError4;

        case 31:
          return _context6.finish(28);

        case 32:
          return _context6.finish(25);

        case 33:
          console.log('Tabela de Clientes Já Está Populada..');
          _context6.next = 39;
          break;

        case 36:
          _context6.prev = 36;
          _context6.t1 = _context6["catch"](6);

          if (_context6.t1.name == 'MyExceptionDB') {
            mensagens = _context6.t1.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context6.t1.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão<<CLIENTES>>...", _context6.t1.message);
          }

        case 39:
          _context6.next = 42;
          break;

        case 41:
          console.log('Tabela de Clientes Já Está Populada..');

        case 42:
          _context6.next = 47;
          break;

        case 44:
          _context6.prev = 44;
          _context6.t2 = _context6["catch"](1);
          console.log("Falha Na Inclusão <<CLIENTES>>...", _context6.t2.message);

        case 47:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 44], [6, 36], [10, 21, 25, 33], [26,, 28, 32]]);
};

MotivoApos = function MotivoApos(id_empresa) {
  var motivoApos, lsMotivos, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5;

  return regeneratorRuntime.async(function MotivoApos$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          motivoApos = [{
            id_empresa: 1,
            codigo: '001000',
            motivo: "RH",
            produtivo: 'N'
          }, {
            id_empresa: 1,
            codigo: '002000',
            motivo: "TI",
            produtivo: 'N'
          }, {
            id_empresa: 1,
            codigo: '003000',
            motivo: "EXECUÇÃO",
            produtivo: 'N'
          }, {
            id_empresa: 1,
            codigo: '003001',
            motivo: "EXECUÇÃO PROJETO",
            produtivo: 'S'
          }];
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(motivoApoSrv.getMotivoApos());

        case 4:
          lsMotivos = _context7.sent;

          if (!(lsMotivos.length == 0)) {
            _context7.next = 41;
            break;
          }

          _context7.prev = 6;
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context7.prev = 10;
          _iterator5 = motivoApos[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
            _context7.next = 19;
            break;
          }

          motivo = _step5.value;
          _context7.next = 16;
          return regeneratorRuntime.awrap(motivoApoSrv.insertMotivoApo(motivo));

        case 16:
          _iteratorNormalCompletion5 = true;
          _context7.next = 12;
          break;

        case 19:
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](10);
          _didIteratorError5 = true;
          _iteratorError5 = _context7.t0;

        case 25:
          _context7.prev = 25;
          _context7.prev = 26;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 28:
          _context7.prev = 28;

          if (!_didIteratorError5) {
            _context7.next = 31;
            break;
          }

          throw _iteratorError5;

        case 31:
          return _context7.finish(28);

        case 32:
          return _context7.finish(25);

        case 33:
          console.log("Tabela de Motivos De Apontamento incluída com sucesso!");
          _context7.next = 39;
          break;

        case 36:
          _context7.prev = 36;
          _context7.t1 = _context7["catch"](6);

          if (_context7.t1.name == 'MyExceptionDB') {
            mensagens = _context7.t1.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context7.t1.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão<<MOTIVO APO>>...", _context7.t1.message);
          }

        case 39:
          _context7.next = 42;
          break;

        case 41:
          console.log('Tabela de Motivo Apontamentos Já Está Populada..');

        case 42:
          _context7.next = 47;
          break;

        case 44:
          _context7.prev = 44;
          _context7.t2 = _context7["catch"](1);
          console.log("Falha Na Inclusão <<Motivo Apontamentos>>", _context7.t2.message);

        case 47:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 44], [6, 36], [10, 21, 25, 33], [26,, 28, 32]]);
};

AponExecucao = function AponExecucao() {
  var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, lsApontamentos, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7;

  return regeneratorRuntime.async(function AponExecucao$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(trabalhoProjetoSrv.getTrabalhoProjetosByProjeto(1, 1));

        case 2:
          lsTrabalhos = _context8.sent;
          lsLancamentos = [];
          encerramento = 'S';

          if (!(lsTrabalhos.length > 0)) {
            _context8.next = 71;
            break;
          }

          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context8.prev = 9;

          for (_iterator6 = lsTrabalhos[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            trabalho = _step6.value;
            lsLancamentos.push({
              id_empresa: trabalho.id_empresa,
              id: 0,
              id_projeto: trabalho.id_projeto,
              id_tarefa: trabalho.id_tarefa,
              id_trabalho: trabalho.id_trabalho,
              id_resp: trabalho.id_resp,
              id_exec: trabalho.id_exec,
              inicial: Date.now(),
              "final": Date.now(),
              obs: "Apontamento Execução",
              horasapon: 1,
              encerramento: encerramento
            });
            if (encerramento == 'S') encerramento = 'N';
          }

          _context8.next = 17;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](9);
          _didIteratorError6 = true;
          _iteratorError6 = _context8.t0;

        case 17:
          _context8.prev = 17;
          _context8.prev = 18;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 20:
          _context8.prev = 20;

          if (!_didIteratorError6) {
            _context8.next = 23;
            break;
          }

          throw _iteratorError6;

        case 23:
          return _context8.finish(20);

        case 24:
          return _context8.finish(17);

        case 25:
          _context8.prev = 25;
          _context8.next = 28;
          return regeneratorRuntime.awrap(aponExecucaoSrv.getAponExecucoes());

        case 28:
          lsApontamentos = _context8.sent;

          if (!(lsApontamentos.length == 0)) {
            _context8.next = 65;
            break;
          }

          _context8.prev = 30;
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context8.prev = 34;
          _iterator7 = lsLancamentos[Symbol.iterator]();

        case 36:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
            _context8.next = 43;
            break;
          }

          lancamento = _step7.value;
          _context8.next = 40;
          return regeneratorRuntime.awrap(aponExecucaoSrv.insertAponExecucao(lancamento));

        case 40:
          _iteratorNormalCompletion7 = true;
          _context8.next = 36;
          break;

        case 43:
          _context8.next = 49;
          break;

        case 45:
          _context8.prev = 45;
          _context8.t1 = _context8["catch"](34);
          _didIteratorError7 = true;
          _iteratorError7 = _context8.t1;

        case 49:
          _context8.prev = 49;
          _context8.prev = 50;

          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }

        case 52:
          _context8.prev = 52;

          if (!_didIteratorError7) {
            _context8.next = 55;
            break;
          }

          throw _iteratorError7;

        case 55:
          return _context8.finish(52);

        case 56:
          return _context8.finish(49);

        case 57:
          console.log("Tabela de Lançamentos De Execucao incluída com sucesso!");
          _context8.next = 63;
          break;

        case 60:
          _context8.prev = 60;
          _context8.t2 = _context8["catch"](30);

          if (_context8.t2.name == 'MyExceptionDB') {
            mensagens = _context8.t2.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context8.t2.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão<<Lançamentos De Execucao>>...", _context8.t2.message);
          }

        case 63:
          _context8.next = 66;
          break;

        case 65:
          console.log('Tabela de Lançamentos De Execucao Já Está Populada..');

        case 66:
          _context8.next = 71;
          break;

        case 68:
          _context8.prev = 68;
          _context8.t3 = _context8["catch"](25);
          console.log("Falha Na Inclusão<<APONEXECUCAO>>...", _context8.t3.message);

        case 71:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[9, 13, 17, 25], [18,, 20, 24], [25, 68], [30, 60], [34, 45, 49, 57], [50,, 52, 56]]);
};

AponPlanejamento = function AponPlanejamento() {
  var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, lsApontamentos, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9;

  return regeneratorRuntime.async(function AponPlanejamento$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(trabalhoProjetoSrv.getTrabalhoProjetosByProjeto(1, 1));

        case 2:
          lsTrabalhos = _context9.sent;
          lsLancamentos = [];

          if (!(lsTrabalhos.length > 0)) {
            _context9.next = 70;
            break;
          }

          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context9.prev = 8;

          for (_iterator8 = lsTrabalhos[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            trabalho = _step8.value;
            lsLancamentos.push({
              id_empresa: trabalho.id_empresa,
              id: 0,
              id_projeto: trabalho.id_projeto,
              id_tarefa: trabalho.id_tarefa,
              id_trabalho: trabalho.id_trabalho,
              id_resp: trabalho.id_resp,
              id_exec: trabalho.id_exec,
              inicial: Date.now(),
              "final": Date.now(),
              obs: "Apontamento Planejamento",
              horasapon: 4,
              encerra: "N"
            });
          }

          _context9.next = 16;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](8);
          _didIteratorError8 = true;
          _iteratorError8 = _context9.t0;

        case 16:
          _context9.prev = 16;
          _context9.prev = 17;

          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }

        case 19:
          _context9.prev = 19;

          if (!_didIteratorError8) {
            _context9.next = 22;
            break;
          }

          throw _iteratorError8;

        case 22:
          return _context9.finish(19);

        case 23:
          return _context9.finish(16);

        case 24:
          _context9.prev = 24;
          _context9.next = 27;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.getAponPlanejamentos());

        case 27:
          lsApontamentos = _context9.sent;

          if (!(lsApontamentos.length == 0)) {
            _context9.next = 64;
            break;
          }

          _context9.prev = 29;
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          _context9.prev = 33;
          _iterator9 = lsLancamentos[Symbol.iterator]();

        case 35:
          if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
            _context9.next = 42;
            break;
          }

          lancamento = _step9.value;
          _context9.next = 39;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.insertAponPlanejamento(lancamento));

        case 39:
          _iteratorNormalCompletion9 = true;
          _context9.next = 35;
          break;

        case 42:
          _context9.next = 48;
          break;

        case 44:
          _context9.prev = 44;
          _context9.t1 = _context9["catch"](33);
          _didIteratorError9 = true;
          _iteratorError9 = _context9.t1;

        case 48:
          _context9.prev = 48;
          _context9.prev = 49;

          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }

        case 51:
          _context9.prev = 51;

          if (!_didIteratorError9) {
            _context9.next = 54;
            break;
          }

          throw _iteratorError9;

        case 54:
          return _context9.finish(51);

        case 55:
          return _context9.finish(48);

        case 56:
          console.log("Tabela de Lançamentos De Planejamento incluído com sucesso!");
          _context9.next = 62;
          break;

        case 59:
          _context9.prev = 59;
          _context9.t2 = _context9["catch"](29);

          if (_context9.t2.name == 'MyExceptionDB') {
            mensagens = _context9.t2.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context9.t2.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão<<Lançamentos De Planejamento>>...", _context9.t2.message);
          }

        case 62:
          _context9.next = 65;
          break;

        case 64:
          console.log('Tabela de Lançamentos De Planejamento Já Está Populada..');

        case 65:
          _context9.next = 70;
          break;

        case 67:
          _context9.prev = 67;
          _context9.t3 = _context9["catch"](24);
          console.log("Falha Na Inclusão<<APONPLANEJAMENTO>>...", _context9.t3.message);

        case 70:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[8, 12, 16, 24], [17,, 19, 23], [24, 67], [29, 59], [33, 44, 48, 56], [49,, 51, 55]]);
};

Le_AponPlanejamento = function Le_AponPlanejamento() {
  var lsApontamentos;
  return regeneratorRuntime.async(function Le_AponPlanejamento$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(aponPlanejamentoSrv.getAponPlanejamentos());

        case 3:
          lsApontamentos = _context10.sent;

          if (lsApontamentos.length == 0) {
            try {
              console.log("Tabela de Lançamentos Vazia");
            } catch (err) {
              if (err.name == 'MyExceptionDB') {
                mensagens = err.message.split('|');
                console.log("Falha Na Inclus\xE3o ".concat(err.tabela, " Messagens: ").concat(mensagens));
              } else {
                console.log("Falha Na Inclusão<<Lançamentos De Planejamento>>...", err.message);
              }
            }
          } else {
            console.log(lsApontamentos);
          }

          _context10.next = 10;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.log("Falha Na Leitura<<APONPLANEJAMENTO>>...", _context10.t0.message);

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

novaConta = function novaConta(id_empresa, conta, subconta, nivel) {
  var last, nova, _nova;

  return regeneratorRuntime.async(function novaConta$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          last = "";

          if (!(conta == "")) {
            _context11.next = 9;
            break;
          }

          _context11.next = 4;
          return regeneratorRuntime.awrap(estruturaSrv.lastConta(id_empresa));

        case 4:
          last = _context11.sent;

          if (last.max == null) {
            last = '01';
          } else {
            last = shared.lastConta(last.max);
          }

          console.log('CONTA==>', conta, 'Proxima Conta ==>', last);
          _context11.next = 13;
          break;

        case 9:
          _context11.next = 11;
          return regeneratorRuntime.awrap(estruturaSrv.lastSubConta(id_empresa, conta, subconta, nivel));

        case 11:
          last = _context11.sent;

          if (last.max == null) {
            last = '01';
            nova = subconta + last;
            console.log("Ultima SubConta ", last, "Nova Conta", nova);
          } else {
            console.log('last.max', last.max);
            _nova = shared.lastSubConta(subconta, last.max);
            console.log("Ultima SubConta ", subconta, "Nova Conta", _nova);
          }

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.executa = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          id_empresa = 1;
          id_diretor = 1;
          id_cliente = 1;
          _context12.next = 5;
          return regeneratorRuntime.awrap(Tarefas(id_empresa));

        case 5:
          _context12.next = 7;
          return regeneratorRuntime.awrap(Projetos(id_empresa, id_cliente, id_diretor));

        case 7:
        case "end":
          return _context12.stop();
      }
    }
  });
};

GrupoEconomicoImplantacao = function GrupoEconomicoImplantacao(lsLista) {
  var gruposEcos, grupos, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _retorno2;

  return regeneratorRuntime.async(function GrupoEconomicoImplantacao$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          gruposEcos = [];
          lsLista.forEach(function (grupo) {
            gruposEcos.push({
              id_empresa: 1,
              id: grupo.COD,
              razao: grupo.GRUPO_ECO,
              user_insert: 1,
              user_update: 0
            });
          });
          _context13.prev = 2;
          _context13.next = 5;
          return regeneratorRuntime.awrap(grupoEcoSrv.getGrupoEcos());

        case 5:
          grupos = _context13.sent;

          if (!(grupos.length == 0)) {
            _context13.next = 43;
            break;
          }

          _context13.prev = 7;
          _iteratorNormalCompletion10 = true;
          _didIteratorError10 = false;
          _iteratorError10 = undefined;
          _context13.prev = 11;
          _iterator10 = gruposEcos[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
            _context13.next = 21;
            break;
          }

          grupoEco = _step10.value;
          _context13.next = 17;
          return regeneratorRuntime.awrap(grupoEcoSrv.insertGrupoEco(grupoEco));

        case 17:
          _retorno2 = _context13.sent;

        case 18:
          _iteratorNormalCompletion10 = true;
          _context13.next = 13;
          break;

        case 21:
          _context13.next = 27;
          break;

        case 23:
          _context13.prev = 23;
          _context13.t0 = _context13["catch"](11);
          _didIteratorError10 = true;
          _iteratorError10 = _context13.t0;

        case 27:
          _context13.prev = 27;
          _context13.prev = 28;

          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }

        case 30:
          _context13.prev = 30;

          if (!_didIteratorError10) {
            _context13.next = 33;
            break;
          }

          throw _iteratorError10;

        case 33:
          return _context13.finish(30);

        case 34:
          return _context13.finish(27);

        case 35:
          console.log("Grupo Economico OK");
          _context13.next = 41;
          break;

        case 38:
          _context13.prev = 38;
          _context13.t1 = _context13["catch"](7);

          if (_context13.t1.name == 'MyExceptionDB') {
            mensagens = _context13.t1.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context13.t1.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context13.t1.tabela, _context13.t1.message);
          }

        case 41:
          _context13.next = 44;
          break;

        case 43:
          console.log("Tabela de Grupos Economicos Já Existe!");

        case 44:
          _context13.next = 49;
          break;

        case 46:
          _context13.prev = 46;
          _context13.t2 = _context13["catch"](2);
          console.log("Falha Na Inclusão...", _context13.t2.message);

        case 49:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[2, 46], [7, 38], [11, 23, 27, 35], [28,, 30, 34]]);
};

Clientes_Implantação = function Clientes_ImplantaO(lsLista) {
  var clientes, clients, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11;

  return regeneratorRuntime.async(function Clientes_ImplantaO$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          clientes = [];
          lsLista.forEach(function (cliente) {
            clientes.push({
              id_empresa: 1,
              id: cliente.COD,
              cnpj_cpf: "",
              razao: cliente.RAZAO,
              fantasi: cliente.FANTASIA,
              inscri: "",
              cadastr: '2022-03-01',
              ruaf: "",
              nrof: "",
              complementof: "",
              bairrof: "",
              cidadef: "",
              uff: "SP",
              cepf: "",
              tel1: "",
              tel2: "",
              emailf: "",
              obs: "",
              gru_econo: cliente.COD_GRUPO,
              user_insert: 1,
              user_update: 0
            });
          });
          _context14.prev = 2;
          _context14.next = 5;
          return regeneratorRuntime.awrap(clienteSrv.getClientes());

        case 5:
          clients = _context14.sent;

          if (!(clients.length == 0)) {
            _context14.next = 42;
            break;
          }

          _context14.prev = 7;
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          _context14.prev = 11;
          _iterator11 = clientes[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
            _context14.next = 20;
            break;
          }

          cliente = _step11.value;
          _context14.next = 17;
          return regeneratorRuntime.awrap(clienteSrv.insertCliente(cliente));

        case 17:
          _iteratorNormalCompletion11 = true;
          _context14.next = 13;
          break;

        case 20:
          _context14.next = 26;
          break;

        case 22:
          _context14.prev = 22;
          _context14.t0 = _context14["catch"](11);
          _didIteratorError11 = true;
          _iteratorError11 = _context14.t0;

        case 26:
          _context14.prev = 26;
          _context14.prev = 27;

          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 29:
          _context14.prev = 29;

          if (!_didIteratorError11) {
            _context14.next = 32;
            break;
          }

          throw _iteratorError11;

        case 32:
          return _context14.finish(29);

        case 33:
          return _context14.finish(26);

        case 34:
          console.log('Tabela de Clientes OK');
          _context14.next = 40;
          break;

        case 37:
          _context14.prev = 37;
          _context14.t1 = _context14["catch"](7);

          if (_context14.t1.name == 'MyExceptionDB') {
            mensagens = _context14.t1.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context14.t1.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão<<CLIENTES>>...", _context14.t1.message);
          }

        case 40:
          _context14.next = 43;
          break;

        case 42:
          console.log('Tabela de Clientes Já Está Populada..');

        case 43:
          _context14.next = 48;
          break;

        case 45:
          _context14.prev = 45;
          _context14.t2 = _context14["catch"](2);
          console.log("Falha Na Inclusão <<CLIENTES>>...", _context14.t2.message);

        case 48:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[2, 45], [7, 37], [11, 22, 26, 34], [27,, 29, 33]]);
};

Teste_data_incluir = function Teste_data_incluir() {
  var _retorno3;

  return regeneratorRuntime.async(function Teste_data_incluir$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(empresaSrv.insertData());

        case 3:
          _retorno3 = _context15.sent;
          console.log("Datas Incluídas");
          _context15.next = 10;
          break;

        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);

          if (_context15.t0.name == 'MyExceptionDB') {
            mensagens = _context15.t0.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context15.t0.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context15.t0.tabela, _context15.t0.message);
          }

        case 10:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

Teste_data_leitura = function Teste_data_leitura() {
  var _retorno4;

  return regeneratorRuntime.async(function Teste_data_leitura$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(empresaSrv.getDatas());

        case 3:
          _retorno4 = _context16.sent;
          console.log(_retorno4);
          _context16.next = 10;
          break;

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);

          if (_context16.t0.name == 'MyExceptionDB') {
            mensagens = _context16.t0.message.split('|');
            console.log("Falha Na Inclus\xE3o ".concat(_context16.t0.tabela, " Messagens: ").concat(mensagens));
          } else {
            console.log("Falha Na Inclusão ", _context16.t0.tabela, _context16.t0.message);
          }

        case 10:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

Teste_setStatus = function Teste_setStatus() {
  var ret;
  return regeneratorRuntime.async(function Teste_setStatus$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(atividadeSrv.setStatus(1, 1, '0601'));

        case 2:
          ret = _context17.sent;
          console.log(ret);

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
};

exports.Implanta_Clientes = function _callee2() {
  var lsLista;
  return regeneratorRuntime.async(function _callee2$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(Empresa());

        case 2:
          id_empresa = _context18.sent;

          if (!(id_empresa > 0)) {
            _context18.next = 13;
            break;
          }

          _context18.next = 6;
          return regeneratorRuntime.awrap(GrupoUsuarios(id_empresa));

        case 6:
          _context18.next = 8;
          return regeneratorRuntime.awrap(Usuarios(id_empresa));

        case 8:
          lsLista = clientesJson.getClientes();
          _context18.next = 11;
          return regeneratorRuntime.awrap(GrupoEconomicoImplantacao(lsLista.GRUPO));

        case 11:
          _context18.next = 13;
          return regeneratorRuntime.awrap(Clientes_Implantação(lsLista.EMPRESAS));

        case 13:
        case "end":
          return _context18.stop();
      }
    }
  });
};

exports.le_apontamentos = function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(Le_AponPlanejamento());

        case 2:
        case "end":
          return _context19.stop();
      }
    }
  });
};

exports.Incluir_datas = function _callee4() {
  return regeneratorRuntime.async(function _callee4$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(Teste_data_incluir());

        case 2:
        case "end":
          return _context20.stop();
      }
    }
  });
};

exports.Ler_datas = function _callee5() {
  return regeneratorRuntime.async(function _callee5$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return regeneratorRuntime.awrap(Teste_data_leitura());

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  });
};

exports.getConta = function _callee6() {
  return regeneratorRuntime.async(function _callee6$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          console.log("Nova Conta");
          _context22.next = 3;
          return regeneratorRuntime.awrap(novaConta(1, "", "", 1));

        case 3:
          console.log("Nova Subconta");
          _context22.next = 6;
          return regeneratorRuntime.awrap(novaConta(1, "01", "01", 2));

        case 6:
        case "end":
          return _context22.stop();
      }
    }
  });
};

exports.Teste_Status = function _callee7() {
  return regeneratorRuntime.async(function _callee7$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return regeneratorRuntime.awrap(Teste_setStatus());

        case 2:
        case "end":
          return _context23.stop();
      }
    }
  });
};