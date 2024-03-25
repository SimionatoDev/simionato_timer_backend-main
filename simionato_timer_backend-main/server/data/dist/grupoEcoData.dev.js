"use strict";

var db = require('../infra/database');

exports.getGrupoEco = function (id_empresa, id) {
  return db.oneOrNone('select * from grupos_eco where id_empresa = $1 and id = $2 ', [id_empresa, id]);
};

exports.getGrupoEcos = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";
    console.log('params', params);
    console.log('params.orderby', params.orderby);

    if (params.orderby == 'Código') {
      console.log('Código', params.orderby);
      orderby = "order by grupo.id_empresa, grupo.id";
    }

    if (params.orderby == "Razão") orderby = "order by grupo.id_empresa,grupo.razao";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "grupo.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += " grupo.id = ".concat(params.id, " ");
    }

    if (params.razao != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += " grupo.razao = '".concat(params.razao.trim(), "' ");
      } else {
        where += "(grupo.razao like '%".concat(params.razao.trim(), "%') ");
      }
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;
    if (orderby == "") orderby = " order by grupo.id_empresa, grupo.id ";

    if (params.contador == 'S') {
      sqlStr = "SELECT  COALESCE(COUNT(*),0) as total \n            FROM          grupos_eco grupo\n            ".concat(where, "  \n            ");
      console.log('sqlStr', sqlStr);
      return db.one(sqlStr);
    } else {
      sqlStr = "SELECT        grupo.id_empresa,grupo.id, grupo.razao \n                  FROM          grupos_eco grupo\n                 ".concat(where, "  ").concat(orderby, "  ").concat(paginacao, "\n         ");
      console.log('sqlStr', sqlStr);
      return db.manyOrNone(sqlStr);
    }
  } else {
    return db.manyOrNone('select * from grupos_eco order by id_empresa,id');
  }
};

exports.insertGrupoEco = function (grupoEco) {
  return db.oneOrNone('insert into grupos_eco (id_empresa,razao,user_insert,user_update) values ($1,$3,$4,$5) returning * ', [grupoEco.id_empresa, grupoEco.id, grupoEco.razao, grupoEco.user_insert, grupoEco.user_update]);
};

exports.updateGrupoEco = function (grupoEco) {
  return db.oneOrNone('update grupos_eco set razao = $3, user_insert = $4, user_update = $5 where id_empresa = $1 and id = $2 returning * ', [grupoEco.id_empresa, grupoEco.id, grupoEco.razao, grupoEco.user_insert, grupoEco.user_update]);
};

exports.deleteGrupoEco = function (id_empresa, id) {
  return db.none('delete from grupos_eco where id_empresa = $1 and id = $2 ', [id_empresa, id]);
};