"use strict";

/* DATA parametros */
var db = require('../infra/database');
/* GET CAMPOS */


exports.getCampos = function (Parametro) {
  return [Parametro.id_empresa, Parametro.modulo, Parametro.id_usuario, Parametro.parametro, Parametro.user_insert, Parametro.user_update];
};
/* CRUD GET */


exports.getParametro = function (id_empresa, modulo, assinatura, id_usuario) {
  var sqlStr = "select  \n                           parametros.id_empresa  as  id_empresa \n                        ,  parametros.modulo      as  modulo \n                        ,  parametros.assinatura  as  assinatura \n                        ,  parametros.id_usuario  as  id_usuario \n                        ,  parametros.parametro   as  parametro \n                        ,  parametros.user_insert as  user_insert\n                        ,  parametros.user_update as  user_update \n                           from parametros \n                           where  parametros.id_empresa = ".concat(id_empresa, "  and  parametros.modulo = '").concat(modulo, "' and  parametros.assinatura = '").concat(assinatura, "' and  parametros.id_usuario = ").concat(id_usuario, "  ");
  console.log('getParametro sqlStr', sqlStr);
  return db.manyOrNone(sqlStr, [id_empresa, modulo, assinatura, id_usuario]);
};
/* CRUD GET ALL*/


exports.getParametros = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";
    if (params.orderby == 'Módulo') orderby = "order by parametros.id_empresa,parametros.modulo,parametros.assinatura";
    if (params.orderby == 'Usuário') orderby = "order by parametros.id_empresa,parametros.id_usuario,parametros.modulo,parametros.assinatura";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "parametros.id_empresa = ".concat(params.id_empresa);
    }

    if (params.modulo != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "parametros.modulo = '".concat(params.modulo.trim(), "'");
      } else {
        where += "parametros.modulo like '%".concat(params.modulo.trim(), "%'");
      }
    }

    if (params.assinatura != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "parametros.assinatura = '".concat(params.assinatura.trim(), "'");
      } else {
        where += "parametros.assinatura like '%".concat(params.assinatura.trim(), "%'");
      }
    }

    if (params.id_usuario != 0) {
      if (where != "") where += " and ";
      where += "parametros.id_usuario = ".concat(params.id_usuario);
    }

    if (where != "") where = " where " + where;

    if (params.contador == 'S') {
      sqlStr = "SELECT  COALESCE(COUNT(*),0) as total \n                    FROM    parametros parametros\n                    ".concat(where, " \n                    ");
      console.log('sqlStr', sqlStr);
      return db.one(sqlStr);
    } else {
      sqlStr = "select  \n\t\t\t\t\tparametros.id_empresa as  id_empresa    \n\t\t\t\t\t,  parametros.modulo as  modulo  \n                    ,  parametros.assinatura as  assinatura  \n\t\t\t\t\t,  parametros.id_usuario as  id_usuario   \n\t\t\t\t\t,  parametros.parametro as  parametro  \n\t\t\t\t\t,  parametros.user_insert as  user_insert   \n\t\t\t\t\t,  parametros.user_update as  user_update     \n\t\t\t\t\tfrom parametros \n\t\t\t\t\t".concat(where, "  ").concat(orderby, "  ").concat(paginacao, "\n\t\t\t\t\t");
      console.log('sqlStr', sqlStr);
      return db.manyOrNone(sqlStr);
    }
  } else {
    return db.manyOrNone("select " + "   parametros.id_empresa as  id_empresa " + ",  parametros.modulo as  modulo " + ",  parametros.id_usuario as  id_usuario " + ",  parametros.parametro as  parametro " + ",  parametros.user_insert as  user_insert " + ",  parametros.user_update as  user_update " + "from parametros " + "order by id_empresa,modulo,assinatura,id_usuario ");
  }
};
/* CRUD - INSERT */


exports.insertParametro = function (parametro) {
  strSql = "insert into parametros (\n\t\t     id_empresa \n\t\t ,   modulo \n         ,   assinatura\n\t\t ,   id_usuario \n\t\t ,   parametro \n\t\t ,   user_insert \n\t\t ,   user_update \n\t\t ) \n\t\t values(\n\t\t     ".concat(parametro.id_empresa, " \n\t\t ,   '").concat(parametro.modulo, "'\n         ,   '").concat(parametro.assinatura, "' \n\t\t ,   ").concat(parametro.id_usuario, " \n\t\t ,   '").concat(parametro.parametro, "' \n\t\t ,   ").concat(parametro.user_insert, " \n\t\t ,   ").concat(parametro.user_update, " \n\t\t ) \n returning * ");
  return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */


exports.updateParametro = function (parametro) {
  strSql = "update  parametros set  \n\t\t     parametro = '".concat(parametro.parametro, "' \n \t\t ,   user_insert = ").concat(parametro.user_insert, " \n \t\t ,   user_update = ").concat(parametro.user_update, " \n \t\t where id_empresa = ").concat(parametro.id_empresa, " and  modulo = '").concat(parametro.modulo, "' and assinatura = '").concat(parametro.assinatura, "' and  id_usuario = ").concat(parametro.id_usuario, "  returning * ");
  console.log(strSql);
  return db.oneOrNone(strSql);
};
/* CRUD - DELETE */


exports.deleteParametro = function (id_empresa, modulo, assinatura, id_usuario) {
  strSql = "delete from parametros \n\t\t where id_empresa = ".concat(id_empresa, " and  modulo = '").concat(modulo, "' and assinatura = '").concat(assinatura, "' and  id_usuario = ").concat(id_usuario, "  ");
  return db.oneOrNone(strSql);
};