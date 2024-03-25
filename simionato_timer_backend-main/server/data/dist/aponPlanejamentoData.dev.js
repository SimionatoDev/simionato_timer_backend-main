"use strict";

var db = require('../infra/database');

var shared = require('../util/shared');

function getCampos(aponPlanejamento) {
  return [aponPlanejamento.id_empresa, aponPlanejamento.id, aponPlanejamento.id_projeto, aponPlanejamento.id_conta, aponPlanejamento.id_subconta, aponPlanejamento.id_resp, aponPlanejamento.id_exec, aponPlanejamento.inicial.replace('GMT-0300', '').replace('T', ' ').replace('Z', ''), aponPlanejamento["final"].replace('GMT-0300', '').replace('T', ' ').replace('Z', ''), aponPlanejamento.horasapon, aponPlanejamento.obs, aponPlanejamento.encerra, aponPlanejamento.user_insert, aponPlanejamento.user_update];
}

exports.getAponPlanejamento = function (id_empresa, id) {
  var strSql = "select  \n    apo.id_empresa\n   ,apo.id\n   ,apo.id_projeto\n   ,apo.id_conta\n   ,apo.id_subconta\n   ,apo.id_resp\n   ,apo.id_exec\n   ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial\n   ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final  \n   ,apo.horasapon\n   ,apo.obs\n   ,apo.encerra\n   ,apo.user_insert\n   ,apo.user_update \n   ,resp.razao as resp_razao\n   ,exec.razao as exec_razao\n   ,estru.descricao as ativ_descricao\n    from apons_planejamento apo\n        inner join estruturas estru        on estru.id_empresa     = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta\n        inner join usuarios resp           on resp.id_empresa      = apo.id_empresa and resp.id         = apo.id_resp\n        inner join usuarios exec           on exec.id_empresa      = apo.id_empresa and exec.id         = apo.id_resp\n    where apo.id_empresa = ".concat(id_empresa, "  and apo.id = ").concat(id, "     \n   ");
  return db.oneOrNone(strSql);
};

exports.getAponPlanejamentos = function (params) {
  if (params) {
    where = "";
    orderby = "";

    if (params.orderby == 'Código') {
      orderby = "order by apo.id_empresa, apo.id";
    }

    if (params.orderby == "Projeto") orderby = "order by apo.id_empresa, apo.id_projeto,apo.id";
    if (params.orderby == "Conta") orderby = "order by apo.id_empresa, apo.id_conta,apo.id";
    if (params.orderby == "SubConta") orderby = "order by apo.id_empresa, apo.id_subconta,apo.id";
    if (params.orderby == "Responsável") orderby = "order by apo.id_empresa, apo.id_resp,apo.id,apo.inicial";
    if (params.orderby == "Executor") orderby = "order by apo.id_empresa, apo.id_exec,apo.inicial";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "apo.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += " apo.id = ".concat(params.id, " ");
    }

    if (params.id_projeto != 0) {
      if (where != "") where += " and ";
      where += " apo.id_projeto = ".concat(params.id_projeto, " ");
    }

    if (params.id_conta != 0) {
      if (where != "") where += " and ";
      where += " apo.id_conta = ".concat(params.id_conta, " ");
    }

    if (params.id_subconta != 0) {
      if (where != "") where += " and ";
      where += " apo.id_subconta = ".concat(params.id_subconta, " ");
    }

    if (params.id_resp != 0) {
      if (where != "") where += " and ";
      where += " apo.id_resp = ".concat(params.id_resp, " ");
    }

    if (params.id_exec != 0) {
      if (where != "") where += " and ";
      where += " apo.id_exec = ".concat(params.id_exec, " ");
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += " apo.id = ".concat(params.id, " ");
    }

    if (params.data != "") {
      if (where != "") where += " and ";
      where += " to_char(apo.inicial,'YYYY-MM-DD') = '".concat(params.data, "' ");
    }

    if (where != "") where = " where " + where;
    if (orderby == "") orderby = " order by apo.id_empresa, apo.id ";
    sqlStr = "select  \n                         apo.id_empresa\n                        ,apo.id\n                        ,apo.id_projeto\n                        ,apo.id_conta\n                        ,apo.id_subconta\n                        ,apo.id_resp\n                        ,apo.id_exec\n                        ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial\n                        ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final  \n                        ,apo.horasapon\n                        ,apo.obs\n                        ,apo.encerra\n                        ,apo.user_insert\n                        ,apo.user_update \n                        ,ativ.status    as status_atividade ,\n                        proj.dataprop   as projeto_data_proposta,\n                        proj.dataproj   as projeto_data_projeto,\n                        proj.dataenc    as projeto_data_enc,\n                        proj.id_diretor as diretor_id,\n                        proj.id_cliente as cliente_id,\n                        proj.descricao  as projeto_descricao,\n                        diretor.razao   as diretor_razao,\n                        resp.razao      as resp_razao,\n                        exec.razao      as exec_razao,\n                        cli.razao       as cli_razao,\n                        estru.descricao as estru_descricao\n                        from apons_planejamento apo\n                        inner join atividades  ativ           on ativ.id_empresa    = apo.id_empresa and ativ.id_projeto = apo.id_projeto and ativ.subconta = apo.id_subconta\n                        inner join projetos    proj           on proj.id_empresa    = apo.id_empresa and proj.id        = apo.id_projeto\n                        inner join usuarios    resp           on resp.id_empresa    = apo.id_empresa and resp.id        = apo.id_resp\n                        inner join usuarios    exec           on exec.id_empresa    = apo.id_empresa and exec.id        = apo.id_exec\n                        inner join usuarios    diretor        on diretor.id_empresa = apo.id_empresa and diretor.id     = proj.id_diretor\n                        inner join clientes    cli            on cli.id_empresa     = apo.id_empresa and cli.id         = proj.id_cliente  \n                        inner join estruturas  estru          on estru.id_empresa   = apo.id_empresa and estru.conta    = apo.id_conta   and estru.subconta = apo.id_subconta\n                         ".concat(where, "  ").concat(orderby, "  \n                 ");
    console.log('sqlStr', sqlStr);
    return db.manyOrNone(sqlStr);
  } else {
    var strSql = "\n        select  \n             apo.id_empresa\n            ,apo.id\n            ,apo.id_projeto\n            ,apo.id_conta\n            ,apo.id_subconta\n            ,apo.id_resp\n            ,apo.id_exec\n            ,apo.inicial AT TIME ZONE 'UTC' as inicial\n            ,apo.final   AT TIME ZONE 'UTC' as final\n            ,apo.horasapon\n            ,apo.obs\n            ,apo.encerra\n            ,apo.user_insert\n            ,apo.user_update \n            from apons_Planejamento apo order by apo.id_empresa, apo.id\n\n                ";
    console.log(strSql);
    return db.manyOrNone(strSql);
  }
};

exports.getAponAgendaPlanejamentos = function (id_empresa, id_exec, data) {
  filtro = "";
  where = "where apo.id_empresa = ".concat(id_empresa, " and apo.id_exec = ").concat(id_exec, " ");
  if (filtro != "") filtro += " or  ";
  filtro += "( to_char(apo.inicial,'YYYY-MM-DD') = '".concat(data, "') ");
  where = where + " and (".concat(filtro, ") ");
  sqlStr = "select  apo.id_empresa     \n                ,apo.id     \n                ,apo.id_projeto     \n                ,apo.id_conta     \n                ,apo.id_subconta     \n                ,apo.id_resp     \n                ,apo.id_exec     \n                ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial\n                ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final  \n                ,apo.horasapon     \n                ,apo.obs                                                 \n                ,apo.encerra      \n                ,apo.user_insert     \n                ,apo.user_update    \n                ,resp.razao as resp_razao\n                ,cli.razao  as cli_razao\n                ,proj.descricao  as proj_descricao \n                ,estru.descricao as estru_descricao \n          from   apons_planejamento apo\n          inner join usuarios resp on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp\n          inner join projetos proj on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto  \n          inner join clientes cli  on cli.id_empresa  = apo.id_empresa and cli.id = proj.id_cliente\n          inner join estruturas    estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta \n          ".concat(where, " \n          order by apo.inicial,apo.id_projeto,apo.id_subconta,apo.inicial\n        ");
  console.log('Planejamentos Sql', sqlStr);
  return db.manyOrNone(sqlStr);
};

exports.insertAponPlanejamento = function (aponPlanejamento) {
  sqlString = 'insert into apons_Planejamento' + '(id_empresa,  id_projeto, id_conta, id_subconta, id_resp, id_exec, inicial, final, horasapon, obs, encerra, user_insert, user_update ) ' + ' values ($1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 ) returning *';
  console.log("Lancamento Planejamento ".concat(sqlString));
  return db.oneOrNone(sqlString, getCampos(aponPlanejamento));
};

exports.updateAponPlanejamento = function (aponPlanejamento) {
  sqlUpdate = 'update apons_Planejamento set ' + ' id_resp          =      $6     , ' + ' id_exec          =      $7     , ' + ' inicial          =      $8     , ' + ' final            =      $9     , ' + ' horasapon        =      $10    , ' + ' obs              =      $11    , ' + ' encerra          =      $12    , ' + ' user_insert      =      $13    , ' + ' user_update      =      $14      ' + ' where id_empresa = $1  and id = $2   returning * '; //console.log(aponPlanejamento);

  return db.oneOrNone(sqlUpdate, getCampos(aponPlanejamento));
};

exports.updateAponPlanejamentoObs = function (id_empresa, id, obs) {
  console.log(id_empresa, id, obs);
  sqlUpdate = 'update apons_Planejamento set ' + ' obs              =      $3    ' + ' where id_empresa = $1  and id = $2   returning * ';
  console.log("updateAponPlanejamentoObs", sqlUpdate);
  return db.oneOrNone(sqlUpdate, [id_empresa, id, obs]);
};

exports.deleteAponPlanejamento = function (id_empresa, id) {
  return db.manyOrNone('delete from apons_Planejamento where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};

exports.existeAponPlanejamentoAtividadeUnica = function (id_empresa, id_projeto, conta, versao, subconta) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom apons_Planejamento\n\twhere id_empresa = ".concat(id_empresa, " and id_projeto = ").concat(id_projeto, " and id_conta = '").concat(conta, "'  and id_subconta = '").concat(subconta, "'");
  console.log('existeAponPlanejamentoAtividadeUnica', strQuery);
  return db.oneOrNone(strQuery);
};

exports.existeAponPlanejamentoAtividade = function (id_empresa, id_projeto) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom apons_Planejamento\n\twhere id_empresa = ".concat(id_empresa, " and id_projeto = ").concat(id_projeto);
  return db.oneOrNone(strQuery);
};