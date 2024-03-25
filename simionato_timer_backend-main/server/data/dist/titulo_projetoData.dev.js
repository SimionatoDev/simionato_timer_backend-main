"use strict";

/* DATA titulos_projeto */
var db = require('../infra/database');

var shared = require('../util/shared');
/* CRUD GET */


exports.getTitulo_Projeto = function (id_empresa, id_projeto, data_vencto) {
  console.log('data', data_vencto);
  var strSql = "       select  \n                           titulos_projeto.id_empresa as  id_empresa \n                        ,  titulos_projeto.id_projeto as  id_projeto \n                        ,  to_char(titulos_projeto.data_vencto, 'DD/MM/YYYY') as data_vencto  \n                        ,  to_char(titulos_projeto.data_pagto, 'DD/MM/YYYY') as data_pagto  \n                        ,  titulos_projeto.valor as  valor \n                        ,  titulos_projeto.obs as  obs \n                        ,  titulos_projeto.user_insert as  user_insert \n                        ,  titulos_projeto.user_update as  user_update \n                           from titulos_projeto \n                            where id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and  data_vencto = '").concat(shared.formatDateYYYYMMDD(data_vencto), "' ");
  console.log(strSql);
  return db.oneOrNone(strSql);
};
/* CRUD GET ALL*/


exports.getTitulos_Projeto = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";
    console.log('params', params);
    console.log('params.orderby', params.orderby);
    if (params.orderby == "Projeto") orderby = "order by titulos_projeto.id_empresa,titulos_projeto.id_projeto,titulos_projeto.data_vencto";
    if (params.orderby == "Vencimento") orderby = "order by titulos_projeto.id_empresa,titulos_projeto.data_vencto,titulos_projeto.id_projeto";
    if (params.orderby == "Cliente") orderby = "order by titulos_projeto.id_empresa,pro.id_cliente,titulos_projeto.data_vencto";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "titulos_projeto.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id_projeto != 0) {
      if (where != "") where += " and ";
      where += "titulos_projeto.id_projeto = ".concat(params.id_projeto);
    }

    if (params.id_cliente != 0) {
      if (where != "") where += " and ";
      where += "proj.id_cliente = ".concat(params.id_cliente);
    }

    if (params.data_vencto != "") {
      if (where != "") where += " and ";
      where += " to_char(titulos_projeto.data_vencto,'YYYY-MM-DD') = '".concat(params.data, "' ");
    }

    if (params.data_pagto != "") {
      if (where != "") where += " and ";
      where += " to_char(titulos_projeto.data_pagto,'YYYY-MM-DD') = '".concat(params.data, "' ");
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;

    if (params.contador == 'S') {
      sqlStr = "SELECT  COALESCE(COUNT(*),0) as total \n                          from titulos_projeto \n                          inner join projetos proj  on proj.id_empresa = titulos_projeto.id_empresa and proj.id = titulos_projeto.id_projeto \n                          inner join clientes  cli  on cli.id_empresa = titulos_projeto.id_empresa and cli.id  = proj.id_cliente \n                          ".concat(where, " \n                ");
      console.log('getTitulos_Projeto', sqlStr);
      return db.one(sqlStr);
    } else {
      var strQry = "\n\t\t\t       select \n                   titulos_projeto.id_empresa as  id_empresa \n                ,  titulos_projeto.id_projeto as  id_projeto \n                ,  to_char(titulos_projeto.data_vencto, 'DD/MM/YYYY') as data_vencto  \n                ,  to_char(titulos_projeto.data_pagto, 'DD/MM/YYYY') as data_pagto  \n                ,  titulos_projeto.valor as  valor \n                ,  titulos_projeto.obs as  obs \n                ,  titulos_projeto.user_insert as  user_insert \n                ,  titulos_projeto.user_update as  user_update \n                ,  cli.id                      as  id_cliente \n                ,  cli.razao                   as  cli_razao     \n                ,  cli.fantasi                 as  cli_fantasi   \n                   from titulos_projeto \n                   inner join projetos proj on proj.id_empresa = titulos_projeto.id_empresa and proj.id = titulos_projeto.id_projeto \n                   inner join clientes  cli  on cli.id_empresa = titulos_projeto.id_empresa and cli.id  = proj.id_cliente\n                   ".concat(where, "  ").concat(orderby, "  ").concat(paginacao, " ");
      console.log('EStou aqui ! getTitulos_Projeto', strQry);
      return db.manyOrNone(strQry);
    }
  } else {
    return db.manyOrNone("select " + "   titulos_projeto.id_empresa as  id_empresa " + ",  titulos_projeto.id_projeto as  id_projeto " + ", to_char(titulos_projeto.data_vencto, 'DD/MM/YYYY') as data_vencto  " + ", to_char(titulos_projeto.data_pagto, 'DD/MM/YYYY') as data_pagto  " + ",  titulos_projeto.valor as  valor " + ",  titulos_projeto.obs as  obs " + ",  titulos_projeto.user_insert as  user_insert " + ",  titulos_projeto.user_update as  user_update " + "from titulos_projeto " + "order by id_empresa,id_projeto ");
  }
};
/* CRUD - INSERT */


exports.insertTitulo_Projeto = function (titulo_projeto) {
  strSql = "insert into titulos_projeto (\n\t\t     id_empresa \n\t\t ,   id_projeto \n\t\t ,   data_vencto \n\t\t ,   data_pagto \n\t\t ,   valor \n\t\t ,   obs \n\t\t ,   user_insert \n\t\t ,   user_update \n\t\t ) \n\t\t values(\n\t\t     ".concat(titulo_projeto.id_empresa, " \n\t\t ,   ").concat(titulo_projeto.id_projeto, " \n\t\t ,   '").concat(shared.formatDateYYYYMMDD(titulo_projeto.data_vencto), "' \n\t\t ,   ").concat(shared.IfNUllNoAspas(shared.formatDateYYYYMMDD(titulo_projeto.data_pagto)), " \n\t\t ,   ").concat(titulo_projeto.valor, " \n\t\t ,   '").concat(titulo_projeto.obs, "' \n\t\t ,   ").concat(titulo_projeto.user_insert, " \n\t\t ,   ").concat(titulo_projeto.user_update, " \n\t\t ) \n returning * ");
  console.log('insertTitulo_Projeto', strSql);
  return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */


exports.updateTitulo_Projeto = function (titulo_projeto) {
  strSql = "update  titulos_projeto set \n\t\t     data_pagto = ".concat(shared.IfNUllNoAspas(shared.formatDateYYYYMMDD(titulo_projeto.data_pagto)), " \n \t\t ,   valor = ").concat(titulo_projeto.valor, " \n \t\t ,   obs = '").concat(titulo_projeto.obs, "' \n \t\t ,   user_insert = ").concat(titulo_projeto.user_insert, " \n \t\t ,   user_update = ").concat(titulo_projeto.user_update, " \n \t\t where id_empresa = ").concat(titulo_projeto.id_empresa, " and  id_projeto = ").concat(titulo_projeto.id_projeto, " and  data_vencto = '").concat(shared.formatDateYYYYMMDD(titulo_projeto.data_vencto), "'  returning * ");
  console.log('updateTitulo_Projeto =>', strSql);
  return db.oneOrNone(strSql);
};
/* CRUD - DELETE */


exports.deleteTitulo_Projeto = function (id_empresa, id_projeto, data_vencto) {
  console.log('data-delete', data_vencto);
  strSql = "delete from titulos_projeto \n\t\t where id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and  data_vencto = '").concat(shared.formatDateYYYYMMDD(data_vencto), "'  ");
  console.log('deleteTitulo_Projeto=>', strSql);
  return db.oneOrNone(strSql);
};