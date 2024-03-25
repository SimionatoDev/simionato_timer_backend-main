"use strict";

var db = require('../infra/database');

var shared = require('../util/shared');

function getCampos(empresa) {
  return [empresa.id, empresa.cnpj_cpf, empresa.razao, empresa.fantasi, empresa.inscri, shared.formatDateYYYYMMDD(empresa.cadastr), empresa.ruaf, empresa.nrof, empresa.complementof, empresa.bairrof, empresa.cidadef, empresa.uff, empresa.cepf, empresa.tel1, empresa.tel2, empresa.emailf, empresa.obs, empresa.user_insert, empresa.user_update];
}

exports.getEmpresa = function (id) {
  return db.oneOrNone("select " + " id , " + " cnpj_cpf , " + " razao , " + " fantasi , " + " inscri , " + " to_char(cadastr, 'DD/MM/YYYY') as cadastr, " + " ruaf , " + " nrof , " + " complementof , " + " bairrof , " + " cidadef , " + " uff , " + " cepf , " + " tel1 , " + " tel2 , " + " emailf , " + " obs , " + " user_insert , " + " user_update " + " from empresas where id  = $1  ", [id]);
};

exports.getEmpresas = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";

    if (params.orderby == 'Código') {
      orderby = "order by emp.id";
    }

    if (params.orderby == "Razão") orderby = "order by emp.razao";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "emp.id = ".concat(params.id);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += "emp.id = ".concat(params.id);
    }

    if (params.razao != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "emp.razao = '".concat(params.razao.trim(), "'");
      } else {
        where += "emp.razao like '%".concat(params.razao.trim(), "%'");
      }
    }

    if (params.fantasi != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "emp.fantasi = '".concat(params.fantasi.trim(), "'");
      } else {
        where += "emp.fantasi like '%".concat(params.fantasi.trim(), "%'");
      }
    }

    if (params.cnpj_cpf != "") {
      if (where != "") where += " and ";
      where += "emp.cnpj_cpf = ".concat(params.cnpj_cpf);
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;

    if (params.contador == 'S') {
      sqlStr = "SELECT  COALESCE(COUNT(*),0) as total \n                from empresas emp \n                ".concat(where, "  ");
      console.log('sqlStr', sqlStr);
      return db.oneOrNone(sqlStr);
    } else {
      sqlStr = "select emp.* \n            from empresas emp\n             ".concat(where, "  ").concat(orderby, "  ").concat(paginacao, " ");
      console.log('sqlStr', sqlStr);
      return db.manyOrNone(sqlStr);
    }
  } else {
    return db.manyOrNone('select emp.* from empresas emp order by emp.id');
  }
};

exports.insertEmpresa = function (empresa) {
  sqlString = 'insert into empresas' + '(cnpj_cpf, razao, fantasi, inscri, cadastr, ruaf, nrof, complementof, bairrof, cidadef, uff, cepf, tel1, tel2, emailf, obs, user_insert, user_update)' + ' values ($2  , $3  , $4  , $5  , $6  , $7  , $8  , $9  , $10 , $11 , $12 , $13 , $14 , $15 , $16 , $17 , $18 , $19 ) returning *';
  return db.oneOrNone(sqlString, getCampos(empresa));
};

exports.updateEmpresa = function (empresa) {
  sqlUpdate = 'update empresas set ' + ' cnpj_cpf          =  $2 , ' + ' razao             =  $3 , ' + ' fantasi           =  $4 , ' + ' inscri            =  $5 , ' + ' cadastr           =  $6 , ' + ' ruaf              =  $7 , ' + ' nrof              =  $8 , ' + ' complementof      =  $9 , ' + ' bairrof           =  $10, ' + ' cidadef           =  $11, ' + ' uff               =  $12, ' + ' cepf              =  $13, ' + ' tel1              =  $14, ' + ' tel2              =  $15, ' + ' emailf            =  $16, ' + ' obs               =  $17, ' + ' user_insert       =  $18, ' + ' user_update       =  $19  ' + ' where id = $1 returning * ';
  return db.oneOrNone(sqlUpdate, getCampos(empresa));
};

exports.deleteEmpresa = function (id) {
  return db.manyOrNone('delete from empresas where id = $1 ', [id]);
}; //funcões de datas


exports.getDatas = function () {
  var sqlString = "\n    select   date_col        ,\n             timestamp_col   AT TIME ZONE 'UTC' as HORAS1\n    from dates ";
  return db.manyOrNone(sqlString);
};

exports.insertData = function () {
  var now = new Date();
  var insertText = 'INSERT INTO dates(date_col, timestamp_col, timestamptz_col) VALUES ($1, $2, $3)';
  return db.oneOrNone(insertText, [now, now, now]);
};