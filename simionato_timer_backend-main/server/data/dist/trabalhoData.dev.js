"use strict";

/* DATA trabalho */
var db = require('../infra/database');
/* GET CAMPOS */


exports.getCampos = function (Trabalho) {
  return [Trabalho.id_empresa, Trabalho.id_projeto, Trabalho.id_atividade, Trabalho.id, Trabalho.id_responsavel, Trabalho.horas_prog, Trabalho.horas_cons, Trabalho.saldo_hrs, Trabalho.descricao, Trabalho.situacao, Trabalho.user_insert, Trabalho.user_update];
};
/* CRUD GET */


exports.getTrabalho = function (id_empresa, id_projeto, id_atividade, id) {
  sqlStr = " select    \n                trabalhos.id_empresa     as  id_empresa    \n             ,  trabalhos.id_projeto     as  id_projeto    \n             ,  trabalhos.id_atividade   as  id_atividade    \n             ,  trabalhos.id             as  id    \n             ,  trabalhos.id_responsavel as  id_responsavel    \n             ,  trabalhos.horas_prog     as  horas_prog    \n             ,  trabalhos.horas_cons     as  horas_cons    \n             ,  trabalhos.saldo_hrs      as  saldo_hrs    \n             ,  trabalhos.descricao      as  descricao    \n             ,  trabalhos.situacao       as  situacao    \n             ,  trabalhos.user_insert    as  user_insert    \n             ,  trabalhos.user_update    as  user_update    \n             ,  ativ.obs                 as  ativ_desc    \n             ,  resp.razao               as  resp_nome    \n             from trabalhos    \n             inner join atividades ativ on ativ.id_empresa = trabalhos.id_empresa and ativ.id = trabalhos.id_atividade    \n             inner join usuarios resp   on resp.id_empresa = trabalhos.id_empresa and resp.id = trabalhos.id_responsavel    \n             where  trabalhos.id_empresa = ".concat(id_empresa, "  and trabalhos.id_projeto = ").concat(id_projeto, " and  trabalhos.id_atividade = ").concat(id_atividade, "  and  trabalhos.id = ").concat(id, "  ");
  console.log("getTrabalho", sqlStr);
  return db.oneOrNone(sqlStr);
};
/* CRUD GET ALL*/


exports.getTrabalhos = function (params) {
  if (params) {
    inner_projeto = "";
    where = "";
    orderby = "";
    paginacao = "";
    console.log('trabalhos => params', params);
    console.log('params.orderby', params.orderby);
    if (params.orderby == 'id') orderby = "order by trabalhos.id ";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "trabalhos.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id_projeto != 0) {
      if (where != "") where += " and ";
      where += "trabalhos.id_projeto = ".concat(params.id_projeto);
    }

    if (params.id_atividade != 0) {
      if (where != "") where += " and ";
      where += "trabalhos.id_atividade = ".concat(params.id_atividade);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += "trabalhos.id = ".concat(params.id);
    }

    if (params.id_responsavel != 0) {
      if (where != "") where += " and ";
      where += "trabalhos.id_responsavel = ".concat(params.id_responsavel);
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;

    if (params.contador == 'S') {
      sqlStr = "SELECT  COALESCE(COUNT(*),0) as total \n\t\t\t    FROM  trabalhos \n                inner join atividades ativ on ativ.id_empresa = trabalhos.id_empresa and ativ.id = trabalhos.id_atividade  \n                inner join projetos   proj on proj.id_empresa = trabalhos.id_empresa and proj.id = trabalhos.id_projeto    \n                inner join clientes   cli  on cli.id_empresa  = trabalhos.id_empresa and cli.id  = ativ.id_subcliente\n                inner join usuarios   resp on resp.id_empresa = trabalhos.id_empresa and resp.id = trabalhos.id_responsavel \n\t\t\t    ".concat(where, " \n\t\t\t");
      console.log('sqlStr', sqlStr);
      return db.oneOrNone(sqlStr);
    } else {
      sqlStr = "SELECT \n                   trabalhos.id_empresa   as  id_empresa  \n                ,  trabalhos.id_atividade as  id_atividade  \n                ,  trabalhos.id_projeto   as  id_projeto  \n                ,  trabalhos.id as  id  \n                ,  trabalhos.id_responsavel as  id_responsavel  \n                ,  trabalhos.horas_prog as  horas_prog  \n                ,  trabalhos.horas_cons as  horas_cons  \n                ,  trabalhos.saldo_hrs as  saldo_hrs  \n                ,  trabalhos.descricao as  descricao  \n                ,  trabalhos.situacao as  situacao  \n                ,  trabalhos.user_insert as  user_insert  \n                ,  trabalhos.user_update as  user_update  \n                ,  ativ.obs as ativ_obs   \n                ,  resp.razao     as resp_nome   \n                ,  proj.id        as proj_id     \n                ,  proj.descricao as proj_desc   \n                from trabalhos \n                inner join atividades ativ on ativ.id_empresa = trabalhos.id_empresa and ativ.id = trabalhos.id_atividade  \n                inner join projetos   proj on proj.id_empresa = trabalhos.id_empresa and proj.id = trabalhos.id_projeto    \n                inner join clientes   cli  on cli.id_empresa  = trabalhos.id_empresa and cli.id  = ativ.id_subcliente\n                inner join usuarios   resp   on resp.id_empresa = trabalhos.id_empresa and resp.id = trabalhos.id_responsavel \n                ".concat(where, " ").concat(orderby, "\n                ");
      console.log('sqlStr', sqlStr);
      return db.manyOrNone(sqlStr);
    }
  } else {
    return db.manyOrNone("select " + "   trabalhos.id_empresa as  id_empresa " + ",  trabalhos.id_atividade as  id_atividade " + ",  trabalhos.id as  id " + ",  trabalhos.id_responsavel as  id_responsavel " + ",  trabalhos.horas_prog as  horas_prog " + ",  trabalhos.horas_cons as  horas_cons " + ",  trabalhos.saldo_hrs as  saldo_hrs " + ",  trabalhos.descricao as  descricao " + ",  trabalhos.situacao as  situacao " + ",  trabalhos.user_insert as  user_insert " + ",  trabalhos.user_update as  user_update " + "from trabalhos" + "order by trabalhos.id_empresa,trabalhos.id ");
  }
};
/* CRUD - INSERT */


exports.insertTrabalho = function (trabalho) {
  strSql = "insert into trabalhos (\n\t\t     id_empresa\n\t\t ,   id_projeto  \n\t\t ,   id_atividade\n\t\t ,   id_responsavel \n\t\t ,   horas_prog \n\t\t ,   horas_cons \n\t\t ,   saldo_hrs \n\t\t ,   descricao \n\t\t ,   situacao \n\t\t ,   user_insert \n\t\t ,   user_update \n\t\t ) \n\t\t values(\n\t\t     ".concat(trabalho.id_empresa, " \n         ,   ").concat(trabalho.id_projeto, "     \n\t\t ,   ").concat(trabalho.id_atividade, " \n\t\t ,   ").concat(trabalho.id_responsavel, " \n\t\t ,   ").concat(trabalho.horas_prog, " \n\t\t ,   ").concat(trabalho.horas_cons, " \n\t\t ,   ").concat(trabalho.saldo_hrs, " \n\t\t ,   '").concat(trabalho.descricao, "' \n\t\t ,   '").concat(trabalho.situacao, "' \n\t\t ,   ").concat(trabalho.user_insert, " \n\t\t ,   ").concat(trabalho.user_update, " \n\t\t ) \n returning * ");
  return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */


exports.updateTrabalho = function (trabalho) {
  strSql = "update  trabalhos set  \n\t\t     id_responsavel = ".concat(trabalho.id_responsavel, " \n \t\t ,   descricao = '").concat(trabalho.descricao, "' \n \t\t ,   situacao = '").concat(trabalho.situacao, "' \n \t\t ,   user_insert = ").concat(trabalho.user_insert, " \n \t\t ,   user_update = ").concat(trabalho.user_update, " \n \t\t where id_empresa = ").concat(trabalho.id_empresa, " and  id_projeto = ").concat(trabalho.id_projeto, " and id_atividade = ").concat(trabalho.id_atividade, " and  id = ").concat(trabalho.id, "  returning * ");
  return db.oneOrNone(strSql);
};
/* CRUD - DELETE */


exports.deleteTrabalho = function (id_empresa, id_projeto, id_atividade, id) {
  strSql = "delete from trabalhos \n    where id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and id_atividade = ").concat(id_atividade, " and  id = ").concat(id, "  ");
  return db.oneOrNone(strSql);
};