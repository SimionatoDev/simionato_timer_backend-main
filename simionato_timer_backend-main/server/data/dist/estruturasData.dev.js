"use strict";

/* DATA estruturas */
var db = require('../infra/database');
/* CRUD GET */


exports.getEstrutura = function (id_empresa, conta, versao, subconta) {
  return db.oneOrNone('select * from estruturas where  id_empresa = $1  and  conta = $2  and versao  = $3 and  subconta = $4   ', [id_empresa, conta, versao, subconta]);
};
/* CRUD GET */


exports.getConta = function (id_empresa, conta, versao) {
  return db.oneOrNone('select * from estruturas where  id_empresa = $1  and  conta = $2 and versao = $3 and nivel = 1 ', [id_empresa, conta, versao]);
};
/* CRUD GET ALL WIHT PARAMS*/


exports.getEstruturas = function (params) {
  if (params) {
    where = "";
    orderby = "";
    orderby = "";
    paginacao = "";
    console.log('params Pesquisa Estrutura: ', params);
    console.log('params.orderby', params.orderby);

    if (params.subcontas) {
      orderby = "order by estru.conta,estru.versao,estru.subconta";
      var nivel01 = parseInt(params.nivel) + 1;
      var nivel02 = parseInt(params.nivel) * 2;

      if (params.id_empresa != 0) {
        if (where != "") where += " and ";
        where += "estru.id_empresa = ".concat(params.id_empresa);
      }

      if (params.versao.trim() != '') {
        if (where != "") where += " and ";
        where += "estru.versao = '".concat(params.versao, "'");
      }

      if (params.status != 0) {
        if (where != "") where += " and ";
        where += "estru.status = ".concat(params.status);
      }

      if (where != "") where += " and ";
      where += "estru.nivel = ".concat(nivel01, " and left(estru.subconta,").concat(nivel02, ") = '").concat(params.subconta.trim(), "'");
    } else {
      if (params.orderby == 'Conta') orderby = "order by estru.id_empresa,estru.conta,estru.versao,estru.subconta";
      if (params.orderby == "SubConta") orderby = "order by estru.id_empresa,estru.conta,estru.versao,estru.subconta";
      if (params.orderby == "Descrição") orderby = "order by estru.descricao";

      if (params.id_empresa != 0) {
        if (where != "") where += " and ";
        where += "estru.id_empresa = ".concat(params.id_empresa);
      }

      if (params.conta != "") {
        if (where != "") where += " and ";
        where += "estru.conta = '".concat(params.conta.trim(), "'");
      }

      if (params.versao != "") {
        if (where != "") where += " and ";
        where += "estru.versao = '".concat(params.versao.trim(), "'");
      }

      if (params.subconta != "") {
        if (where != "") where += " and ";

        if (params.sharp) {
          where += "estru.subconta = '".concat(params.subconta.trim(), "'");
        } else {
          where += "estru.subconta like '%".concat(params.subconta.trim(), "%'");
        }
      }

      if (params.status != 0) {
        if (where != "") where += " and ";
        where += "estru.status = ".concat(params.status);
      }

      if (params.descricao != "") {
        if (where != "") where += " and ";

        if (params.sharp) {
          where += "estru.descricao = '".concat(params.descricao.trim(), "'");
        } else {
          where += "estru.descricao like '%".concat(params.descricao.trim(), "%'");
        }
      }

      if (params.nivel != 0) {
        if (where != "") where += " and ";
        where += "estru.nivel = ".concat(params.nivel);
      }

      if (params.projeto_in == "S") {
        if (where != "") where += " and ";
        where += " (exists(select ativ.id from atividades ativ where  ativ.id_empresa = estru.id_empresa and  ativ.conta = estru.conta and ativ.nivel = 1 and ativ.id_projeto = ".concat(params.id_projeto, "))");
      }

      if (params.projeto_off == "S") {
        if (where != "") where += " and ";
        where += " not(exists(select ativ.id from atividades ativ where  ativ.id_empresa = estru.id_empresa and  ativ.conta = estru.conta and ativ.nivel = 1 and ativ.id_projeto = ".concat(params.id_projeto, "))");
      }
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;
    sqlStr = "SELECT      estru.*\n                  FROM        estruturas estru\n                 ".concat(where, "  ").concat(orderby, "  ").concat(paginacao, "\n         ");
    console.log('get estrutura sqlStr', sqlStr);
    return db.manyOrNone(sqlStr);
  } else {
    return db.manyOrNone('select * from estruturas order by id_empresa,conta,versao,subconta');
  }
};
/* CRUD - INSERT */


exports.insertEstrutura = function (estrutura) {
  console.log(estrutura);
  return db.oneOrNone('insert into  estruturas ( id_empresa ,conta, versao , subconta,descricao,nivel,nivel_maxi,tipo,controle,user_insert,user_update, status, id_usuario) values( $1  ,  $2  ,  $3  ,  $4  ,   $5  ,   $6  ,  $7  ,  $8  , $9 , $10, $11, $12, $13 ) returning * ', [estrutura.id_empresa, estrutura.conta, estrutura.versao, estrutura.subconta, estrutura.descricao, estrutura.nivel, estrutura.nivel_maxi, estrutura.tipo, estrutura.controle, estrutura.user_insert, estrutura.user_update, estrutura.status, estrutura.id_usuario]);
};
/* CRUD - UPDATE */


exports.updateEstrutura = function (estrutura) {
  console.log("Alteração", estrutura);
  return db.oneOrNone('update estruturas set  descricao = $5  ,  nivel = $6  ,  nivel_maxi = $7  ,  tipo = $8  ,  controle = $9 , user_insert = $10  ,  user_update = $11, status = $12 , id_usuario = $13 where  id_empresa = $1  and  conta = $2  and  versao = $3 and subconta = $4  returning * ', [estrutura.id_empresa, estrutura.conta, estrutura.versao, estrutura.subconta, estrutura.descricao, estrutura.nivel, estrutura.nivel_maxi, estrutura.tipo, estrutura.controle, estrutura.user_insert, estrutura.user_update, estrutura.status, estrutura.id_usuario]);
};
/* CRUD - DELETE */


exports.deleteEstrutura = function (id_empresa, conta, versao, subconta) {
  return db.oneOrNone('delete from estruturas where  id_empresa = $1  and  conta = $2  and versao = $3 and  subconta = $4   ', [id_empresa, conta, versao, subconta]);
};

exports.deleteAllEstrutura = function (id_empresa, conta, versao) {
  return db.oneOrNone('delete from estruturas where  id_empresa = $1  and  conta = $2  and versao = $3 ', [id_empresa, conta, versao]);
};

exports.saveAllEstrutura = function (estruturas) {
  strVirgula = '';
  strCabec = 'insert into estruturas( ' + ' id_empresa ' + ',conta ' + ',versao ' + ',subconta ' + ',descricao ' + ',nivel ' + ',nivel_maxi ' + ',tipo ' + ',controle ' + ',user_insert ' + ',user_update ' + ',status      ' + ',id_usuario ) ';
  strvalues = ' values ';
  estruturas.forEach(function (estrutura) {
    strvalues += " ".concat(strVirgula, " ");
    strvalues += "( \n           ".concat(estrutura.id_empresa, ",\n          '").concat(estrutura.conta, "',\n          '").concat(estrutura.versao, "',\n          '").concat(estrutura.subconta, "',\n          '").concat(estrutura.descricao, "',\n           ").concat(estrutura.nivel, " ,\n           ").concat(estrutura.nivel_maxi, " ,\n          '").concat(estrutura.tipo, "',\n          '").concat(estrutura.controle, "',\n           ").concat(estrutura.user_insert, ",\n           ").concat(estrutura.user_update, ",\n           ").concat(estrutura.status, ",  \n           ").concat(estrutura.id_usuario, " \n        )");
    strVirgula = ',';
  });
  console.log('Atualizado Estrutura', strCabec, strvalues);
  return db.oneOrNone(strCabec + strvalues);
};
/* CRUD - LAST CONTA */


exports.lastConta = function (id_empresa) {
  return db.oneOrNone('select max(conta) from estruturas where id_empresa = $1', [id_empresa]);
};
/* CRUD - LAST SUBCONTA */


exports.lastSubConta = function (id_empresa, conta, versao, subconta, nivel) {
  var par = (nivel - 1) * 2;
  var str = "select max(subconta) from estruturas where id_empresa = ".concat(id_empresa, " and versao = '").concat(versao, "' and nivel = ").concat(nivel, " and left(subconta,").concat(par, ") = '").concat(subconta.trim(), "' ");
  console.log(str);
  return db.oneOrNone(str);
};
/* CRUD - LAST SUBCONTA */


exports.mudaStatus = function (id_empresa, conta, versao, status) {
  var str = "update estruturas set status = ".concat(status, " where id_empresa = ").concat(id_empresa, " and conta  = '").concat(conta, "' and versao = '").concat(versao, "' ");
  console.log(str);
  return db.oneOrNone(str);
};
/* GERA UMA ESTRUTURA HEADER */


exports.Estrutura_header = function (id_empresa, conta, versao, controle, descricao) {
  var estrutura = {
    id_empresa: id_empresa,
    conta: conta,
    versao: '0101',
    subconta: conta,
    descricao: 'Cópia: ' + descricao.trim(),
    nivel: 1,
    nivel_maxi: 7,
    tipo: 'C',
    controle: controle,
    user_insert: 1,
    user_update: 0,
    status: 1,
    id_usuario: 0
  };
  return estrutura;
};
/* PEGA A ESTRUTURA DA CONTA */


exports.getEstrutura_Histo = function (par) {
  var str = "SELECT * FROM function_histo(".concat(par.id_empresa, ",'").concat(par.conta, "','").concat(par.subconta.trim(), "','").concat(par.versao, "',").concat(par.nivel, ");");
  console.log(str);
  return db.oneOrNone(str);
};