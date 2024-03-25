"use strict";

var _require = require('express/lib/request'),
    param = _require.param;

var cli = require('nodemon/lib/cli');

var db = require('../infra/database');

var shared = require('../util/shared');

function getCampos(cliente) {
  return [cliente.id_empresa, cliente.id, cliente.cnpj_cpf, cliente.razao, cliente.fantasi, cliente.inscri, shared.formatDateYYYYMMDD(cliente.cadastr), cliente.ruaf, cliente.nrof, cliente.complementof, cliente.bairrof, cliente.cidadef, cliente.uff, cliente.cepf, cliente.tel1, cliente.tel2, cliente.emailf, cliente.obs, cliente.gru_econo, cliente.user_insert, cliente.user_update];
}

exports.getCliente = function (id_empresa, id) {
  return db.oneOrNone('select  ' + ' cli.id_empresa, ' + ' cli.id, ' + ' cli.cnpj_cpf, ' + ' cli.razao, ' + ' cli.fantasi, ' + ' cli.inscri, ' + " to_char(cli.cadastr, 'DD/MM/YYYY') as cadastr, " + ' cli.ruaf, ' + ' cli.nrof, ' + ' cli.complementof, ' + ' cli.bairrof, ' + ' cli.cidadef, ' + ' cli.uff, ' + ' cli.cepf, ' + ' cli.tel1, ' + ' cli.tel2, ' + ' cli.emailf, ' + ' cli.obs, ' + ' cli.gru_econo, ' + ' cli.user_insert, ' + ' cli.user_update ' + ', grupo.razao as gru_descricao ' + ' from clientes cli left join grupos_eco grupo on grupo.id_empresa = cli.id_empresa and grupo.id = cli.gru_econo where cli.id_empresa = $1 and cli.id = $2 ', [id_empresa, id]);
};

exports.getClientes = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";
    console.log('params', params);
    console.log('params.orderby', params.orderby);

    if (params.orderby == 'Código') {
      console.log('Código', params.orderby);
      orderby = "order by cli.id";
    }

    if (params.orderby == "Razão") orderby = "order by cli.id_empresa,cli.razao";
    if (params.orderby == "Fantasia") orderby = "order by cli.id_empresa,cli.fantasi";
    if (params.orderby == "Grupo") orderby = "order by cli.id_empresa,grupo.razao,cli.razao";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "cli.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += "cli.id = ".concat(params.id);
    }

    if (params.razao.trim() != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "cli.razao = '".concat(params.razao.trim(), "'");
      } else {
        where += "cli.razao like '%".concat(params.razao.trim(), "%'");
      }
    }

    if (params.fantasi.trim() != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "cli.fantasi = '".concat(params.fantasi.trim(), "'");
      } else {
        where += "cli.fantasi like '%".concat(params.fantasi.trim(), "%'");
      }
    }

    if (params.cnpj_cpf.trim() != "") {
      if (where != "") where += " and ";
      where += "cli.cnpj_cpf = ".concat(params.cnpj_cpf);
    }

    if (params.grupo != 0) {
      if (where != "") where += " and ";
      where += "cli.gru_econo = ".concat(params.grupo);
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;

    if (params.contador == 'S') {
      sqlStr = "SELECT  COALESCE(COUNT(*),0) as total \n            FROM       clientes cli\n            INNER JOIN empresas   emp   on emp.id = cli.id_empresa \n            INNER JOIN grupos_eco grupo on grupo.id_empresa = cli.id_empresa and grupo.id = cli.gru_econo\n            ".concat(where, " \n            ");
      console.log('sqlStr', sqlStr);
      return db.one(sqlStr);
    } else {
      sqlStr = "SELECT      cli.id_empresa,cli.id,cli.razao,cli.fantasi,cli.cnpj_cpf,grupo.razao as grupo\n            FROM       clientes cli\n            INNER JOIN empresas   emp   on emp.id = cli.id_empresa \n            INNER JOIN grupos_eco grupo on grupo.id_empresa = cli.id_empresa and grupo.id = cli.gru_econo\n            ".concat(where, "  ").concat(orderby, "  ").concat(paginacao, "\n            ");
      console.log('sqlStr', sqlStr);
      return db.manyOrNone(sqlStr);
    }
  } else {
    return db.manyOrNone('select * from clientes order by id_empresa,id');
  }
};

exports.getClientesByGrupo = function (id_empresa, id_grupo) {
  return db.oneOrNone("select count(*)  from clientes where id_empresa = ".concat(id_empresa, " and gru_econo = ").concat(id_grupo));
};

exports.insertCliente = function (cliente) {
  sqlString = 'insert into clientes' + '(id_empresa,  cnpj_cpf, razao, fantasi, inscri, cadastr, ruaf, nrof, complementof, bairrof, cidadef, uff, cepf, tel1, tel2, emailf, obs, gru_econo, user_insert, user_update) ' + ' values ($1,  $3  , $4  , $5  , $6  , $7  , $8  , $9  , $10 , $11 , $12 , $13 , $14 , $15 , $16 , $17, $18, $19, $20, $21 ) returning *';
  return db.oneOrNone(sqlString, getCampos(cliente));
};

exports.updateCliente = function (cliente) {
  sqlUpdate = 'update clientes set ' + ' cnpj_cpf         =  $3     , ' + ' razao            =  $4     , ' + ' fantasi          =  $5     , ' + ' inscri           =  $6     , ' + ' cadastr          =  $7     , ' + ' ruaf             =  $8     , ' + ' nrof             =  $9     , ' + ' complementof     =  $10    , ' + ' bairrof          =  $11    , ' + ' cidadef          =  $12    , ' + ' uff              =  $13    , ' + ' cepf             =  $14    , ' + ' tel1             =  $15    , ' + ' tel2             =  $16    , ' + ' emailf           =  $17    , ' + ' obs              =  $18    , ' + ' gru_econo        =  $19    , ' + ' user_insert      =  $20    , ' + ' user_update      =  $21      ' + ' where id_empresa = $1 and id = $2 returning * ';
  return db.oneOrNone(sqlUpdate, getCampos(cliente));
};

exports.deleteCliente = function (id_empresa, id) {
  return db.manyOrNone('delete from clientes where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};

exports.existeClientes = function (id_empresa, id) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom  clientes\n\twhere id_empresa = ".concat(id_empresa, " ");
  return db.oneOrNone(strQuery);
};