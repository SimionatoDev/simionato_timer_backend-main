"use strict";

var db = require('../infra/database');

var shared = require('../util/shared');

function getCampos(feriado) {
  return [feriado.id_empresa, feriado.id_usuario, feriado.id_tipo, shared.formatDateYYYYMMDD(feriado.data), feriado.id_nivel, feriado.descricao, feriado.user_insert, feriado.user_update];
}

;

exports.getFeriado = function (id_empresa, id_usuario, id_tipo, data) {
  sqlStr = "Select \n                fer.id_empresa     \n                ,fer.id_usuario     \n                ,fer.id_tipo     \n                ,to_char(fer.data,'DD/MM/YYYY') as fer.data     \n                ,fer.id_nivel     \n                ,fer.descricao     \n                ,fer.user_insert     \n                ,fer.user_update \n                ,COALESCE (usu.razao,'')     as usu_nome\n                from feriados fer\n                left join usuarios usu on usu.id_empresa = fer.id_empresa and usu.id = fer.id_usuario  \n                where fer.id_empresa = ".concat(id_empresa, " and fer.id_usuario = ").concat(id_usuario, " and fer.id_tipo = ").concat(id_tipo, " and fer.data = ").concat(data, " ");
  return db.oneOrNone(sqlStr);
};

exports.getFeriados = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";
    console.log('params', params);
    console.log('params.orderby', params.orderby);
    if (params.orderby == 'Data') orderby = "order by fer.id_empresa,fer.data,fer.id_usuario,fer.descricao";
    if (params.orderby == "Descrição") orderby = "order by fer.id_empresa,fer.id_usuario,fer.descricao";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "fer.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id_tipo != 0) {
      if (where != "") where += " and ";
      where += "fer.id_tipo = ".concat(params.id_tipo);
    }

    if (params.id_usuario != 0) {
      if (where != "") where += " and ";
      where += " fer.id_usuario  = ".concat(params.id_usuario, " ");
    }

    if (params.data != "") {
      if (where != "") where += " and ";
      where += " to_char(fer.data,'YYYY-MM-DD') = '".concat(params.data, "' ");
    }

    if (params.descricao != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += " fer.descricao = '".concat(params.descricao.trim(), "' ");
      } else {
        where += "(fer.descricao like '%".concat(params.descricao.trim(), "%') ");
      }
    }

    if (params.id_nivel != 0) {
      if (where != "") where += " and ";
      where += " fer.id_nivel = ".concat(params.nivel, " ");
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;
    if (orderby == "") orderby = " order by fer.id_empresa,fer.data ";

    if (params.contador == 'S') {
      sqlStr = " SELECT  COALESCE(COUNT(*),0) as total \n                       FROM    feriados fer    \n              ".concat(where, " \n         ");
      console.log('sqlStr', sqlStr);
      return db.one(sqlStr);
    } else {
      sqlStr = "  Select \n                         fer.id_empresa     \n                        ,fer.id_usuario     \n                        ,fer.id_tipo     \n                        ,to_char(fer.data,'DD/MM/YYYY') as data     \n                        ,fer.id_nivel     \n                        ,fer.descricao     \n                        ,fer.user_insert     \n                        ,fer.user_update \n                        ,COALESCE (usu.razao,'')     as usu_nome\n                        from feriados fer\n                        left join usuarios usu on usu.id_empresa = fer.id_empresa and usu.id = fer.id_usuario  \n                         ".concat(where, "  ").concat(orderby, "   ").concat(paginacao, " \n            ");
      console.log('Feriados:', sqlStr);
      return db.manyOrNone(sqlStr);
    }

    ;
  } else {
    return db.manyOrNone('select * from feriados order by id_empresa,data');
  }

  ;
};

exports.insertFeriado = function (feriado) {
  console.log(feriado);
  var strInsert = "insert into feriados(id_empresa ,id_usuario , id_tipo , data , id_nivel ,  descricao , user_insert, user_update ) " + " values ($1, $2, $3, $4, $5, $6, $7, $8 ) returning * ";
  console.log("strInsert Feriado", strInsert);
  return db.oneOrNone(strInsert, getCampos(feriado));
};

exports.updateFeriado = function (feriado) {
  sqlUpdate = 'update feriados set ' + ' id_nivel        =       $5       ,   ' + ' descricao       =       $6       ,   ' + ' user_update     =       $8       ,   ' + ' where id_empresa = $1 and id_usuario = $2 and id_tipo = $3 data = $s4 returning * ';
  console.log(sqlUpdate, getCampos(feriado));
};

exports.deleteFeriado = function (id_empresa, id_usuario, id_tipo, data) {
  return db.oneOrNone('delete from feriados where id_empresa = $1 and id_usuario = $2 and id_tipo = $3 and data = $4 ', [id_empresa, id_usuario, id_tipo, data]);
};