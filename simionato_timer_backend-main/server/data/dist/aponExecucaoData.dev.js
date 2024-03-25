"use strict";

var db = require('../infra/database');

var shared = require('../util/shared');

function getCampos(aponExecucao) {
  return [aponExecucao.id_empresa, aponExecucao.id, aponExecucao.id_projeto, aponExecucao.id_conta, aponExecucao.id_conta_versao, aponExecucao.id_subconta, aponExecucao.id_subcliente, aponExecucao.id_resp, aponExecucao.id_exec, aponExecucao.id_motivo, aponExecucao.produtivo, aponExecucao.inicial.replace('GMT-0300', '').replace('T', ' ').replace('Z', ''), aponExecucao["final"].replace('GMT-0300', '').replace('T', ' ').replace('Z', ''), aponExecucao.obs, aponExecucao.horasapon, aponExecucao.encerramento, aponExecucao.user_insert, aponExecucao.user_update];
}

exports.getAponExecucao = function (id_empresa, id) {
  strSql = " select \n                    apo.id_empresa\n                    ,apo.id\n                    ,apo.id_projeto\n                    ,apo.id_conta\n                    ,apo.id_conta_versao\n                    ,apo.id_subconta\n                    ,apo.id_subcliente\n                    ,apo.id_resp\n                    ,apo.id_exec\n                    ,apo.id_motivo\n                    ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial\n                    ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final\n                    ,apo.obs\n                    ,apo.horasapon\n                    ,apo.encerramento\n                    ,apo.user_insert\n                    ,apo.user_update \n                    ,estru.descricao as estru_descricao\n                    ,resp.razao      as resp_razao\n                    ,exec.razao      as exec_razao\n                    ,proj.descricao  as proj_descricao\n                    ,motivo.motivo   as motivo_descricao\n                    ,motivo.produtivo as motivo_produtivo\n                    ,to_char(ativ.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as ativ_inicial\n                    ,to_char(ativ.final,'YYYY-MM-DD HH24:MI GMT-0300') as ativ_final\n                    ,cli.razao                                as cli_razao\n            from apons_execucao apo \n                    inner join estruturas estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta \n                    inner join usuarios      resp   on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp\n                    inner join usuarios      exec   on exec.id_empresa = apo.id_empresa and exec.id = apo.id_exec\n                    inner join projetos      proj   on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto\n                    inner join motivos_apo   motivo on motivo.id_empresa = apo.id_empresa and motivo.codigo = apo.id_motivo\n                    inner join atividades    ativ   on ativ.id_empresa   = apo.id_empresa and ativ.subconta = apo.id_subconta and ativ.id_projeto = apo.id_projeto\n                    inner join clientes      cli    on cli.id_empresa    = apo.id_empresa and cli.id = apo.id_subcliente\n            where apo.id_empresa = ".concat(id_empresa, "  and apo.id = ").concat(id, "\n    ");
  console.log("getone", strSql);
  return db.oneOrNone(strSql);
};

exports.getAponExecucoes = function (params) {
  if (params) {
    where = "";
    orderby = "";

    if (params.orderby == 'Código') {
      orderby = "order by apo.id_empresa, apo.id";
    }

    if (params.orderby == "Projeto") orderby = "order by apo.id_empresa, apo.id_projeto,apo.id";
    if (params.orderby == "Conta") orderby = "order by apo.id_empresa, apo.id_conta,apo.id";
    if (params.orderby == "SubConta") orderby = "order by apo.id_empresa, apo.id_subconta,apo.id";
    if (params.orderby == "Responsável") orderby = "order by apo.id_empresa, apo.id_resp,apo.inicial";
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

    if (params.id_conta != "") {
      if (where != "") where += " and ";
      where += " apo.id_conta = '".concat(params.id_conta, "' ");
    }

    if (params.id_subconta != "") {
      if (where != "") where += " and ";
      where += " apo.id_subconta = '".concat(params.id_subconta, "' ");
    }

    if (params.id_resp != 0) {
      if (where != "") where += " and ";
      where += " apo.id_resp = ".concat(params.id_resp, " ");
    }

    if (params.id_exec != 0) {
      if (where != "") where += " and ";
      where += " apo.id_exec = ".concat(params.id_exec, " ");
    }

    if (params.id_dir != 0) {
      if (where != "") where += " and ";
      where += " proj.id_diretor = ".concat(params.id_dir, " ");
    }

    if (params.data != "") {
      if (where != "") where += " and ";
      where += " to_char(apo.inicial,'YYYY-MM-DD') = '".concat(params.data, "' ");
    }

    if (where != "") where = " where " + where;
    if (orderby == "") orderby = " order by apo.id_empresa, apo.id ";
    console.log('where ==>', where, "Order by ==>", orderby);

    var _strSql = "select  \n                     apo.id_empresa\n                    ,apo.id\n                    ,apo.id_projeto\n                    ,apo.id_conta\n                    ,apo.id_conta_versao\n                    ,apo.id_subconta\n                    ,apo.id_subcliente\n                    ,apo.id_resp\n                    ,apo.id_exec\n                    ,apo.id_motivo\n                    ,apo.produtivo\n                    ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial\n                    ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final\n                    ,apo.obs\n                    ,apo.horasapon\n                    ,apo.encerramento\n                    ,apo.user_insert\n                    ,apo.user_update \n                    ,estru.descricao  as estru_descricao\n                    ,resp.razao       as resp_razao\n                    ,exec.razao       as exec_razao\n                    ,proj.descricao   as proj_descricao\n                    ,motivo.motivo    as motivo_descricao\n                    ,to_char(ativ.inicial,'YYYY-MM-DD HH24:MI') as ativ_inicial\n                    ,to_char(ativ.final,'YYYY-MM-DD HH24:MI')   as ativ_final\n                    ,cli.razao                                  as cli_razao\n                    ,proj.id_diretor                            as id_diretor\n                    ,dir.razao                                  as dir_razao\n            from apons_execucao apo \n                    inner join estruturas    estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta \n                    inner join usuarios      resp on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp\n                    inner join usuarios      exec on exec.id_empresa = apo.id_empresa and exec.id = apo.id_exec\n                    inner join projetos      proj on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto\n                    inner join usuarios      dir  on dir.id_empresa = proj.id_empresa and dir.id = proj.id_diretor\n                    inner join motivos_apo   motivo on motivo.id_empresa = apo.id_empresa and motivo.codigo = apo.id_motivo\n                    inner join atividades    ativ   on ativ.id_empresa   = apo.id_empresa and ativ.subconta = apo.id_subconta and  apo.id_conta_versao = ativ.versao  and ativ.id_projeto = apo.id_projeto\n                    inner join clientes      cli    on cli.id_empresa    = apo.id_empresa and cli.id = apo.id_subcliente\n             ".concat(where, "  ").concat(orderby, "  \n                 ");

    console.log('getAponExecucoes sqlStr ==>', _strSql);
    return db.manyOrNone(_strSql);
  } else {
    var _strSql2 = "\n        select  * from apons_execucao apo order by apo.id_empresa, apo.id ";
    console.log(_strSql2);
    return db.manyOrNone(_strSql2);
  }
};

exports.insertAponExecucao = function (aponExecucao) {
  sqlString = 'insert into apons_execucao' + '(id_empresa,  id_projeto, id_conta, id_conta_versao, id_subconta, id_subcliente, id_resp, id_exec, id_motivo, produtivo, inicial, final, obs, horasapon, encerramento, user_insert, user_update) ' + ' values ($1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15, $16, $17, $18 ) returning *';
  console.log("Insert=>", sqlString);
  return db.oneOrNone(sqlString, getCampos(aponExecucao));
};

exports.updateAponExecucao = function (aponExecucao) {
  sqlUpdate = 'update apons_execucao set ' + ' id_subcliente   =    $7    ,' + ' id_resp         =    $8    ,' + ' id_exec         =    $9   ,' + ' id_motivo       =    $10    ,' + ' produtivo       =    $11   ,' + ' inicial         =    $12    ,' + ' final           =    $13    ,' + ' obs             =    $14   ,' + ' horasapon       =    $15   ,' + ' encerramento    =    $16   , ' + ' user_insert     =    $17   , ' + ' user_update     =    $18     ' + ' where id_empresa = $1  and id = $2   returning * ';
  return db.oneOrNone(sqlUpdate, getCampos(aponExecucao));
};

exports.deleteAponExecucao = function (id_empresa, id) {
  return db.manyOrNone('delete from apons_execucao where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};

exports.existeAponExecucaoAtividadeUnica = function (id_empresa, id_projeto, conta, versao, subconta) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom apons_execucao\n\twhere id_empresa = ".concat(id_empresa, " and id_projeto = ").concat(id_projeto, " and id_conta = '").concat(conta, "' and id_subconta = '").concat(subconta, "'");
  return db.oneOrNone(strQuery);
};

exports.existeAponExecucaoAtividade = function (id_empresa, id_projeto) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom apons_execucao\n\twhere id_empresa = ".concat(id_empresa, " and id_projeto = ").concat(id_projeto);
  return db.oneOrNone(strQuery);
};

exports.ExisteLancamentoNestaHora = function (aponExecucao, operacao) {
  var whereid = '';

  if (operacao == 'E') {
    whereid = " and apon.id <> ".concat(aponExecucao.id, " ");
  }

  var strQuery = "\n\tSELECT count(*) TOTAL FROM apons_execucao apon\n    WHERE apon.id_empresa = ".concat(aponExecucao.id_empresa, " ").concat(whereid, " and apon.id_exec = ").concat(aponExecucao.id_exec, " and TO_CHAR(inicial,'yyyy-MM-dd') = '").concat(aponExecucao.inicial.substring(0, 10), "' AND (('").concat(aponExecucao.inicial.replace(' GMT-0300', ''), "' > inicial and  '").concat(aponExecucao.inicial.replace(' GMT-0300', ''), "' < final) or ('").concat(aponExecucao["final"].replace(' GMT-0300', ''), "' > inicial and  '").concat(aponExecucao["final"].replace(' GMT-0300', ''), "' < final)) ");
  console.log('   ', strQuery);
  return db.oneOrNone(strQuery);
};

exports.ExisteLancamentoNestaHoraExato = function (aponExecucao, operacao) {
  var whereid = '';

  if (operacao == 'E') {
    whereid = " and apon.id <> ".concat(aponExecucao.id, " ");
  }

  var strQuery = "\n\tSELECT count(*) TOTAL FROM apons_execucao apon\n    WHERE apon.id_empresa = ".concat(aponExecucao.id_empresa, " ").concat(whereid, " and apon.id_exec = ").concat(aponExecucao.id_exec, " and TO_CHAR(inicial,'yyyy-MM-dd') = '").concat(aponExecucao.inicial.substring(0, 10), "' AND (('").concat(aponExecucao.inicial.replace(' GMT-0300', ''), "' = inicial) and  ('").concat(aponExecucao["final"].replace(' GMT-0300', ''), "' = final)) ");
  console.log('   ', strQuery);
  return db.oneOrNone(strQuery);
};

exports.getAponExecByExecutor = function (id_empresa, id_usuario, data_ref) {
  var strQuery = "\n        select to_char(apo.inicial,'dd/MM/YYYY') as data,apo.id_exec,usu.razao as nome, sum(apo.horasapon) as total\n        from apons_execucao apo\n        inner join usuarios usu on usu.id_empresa = apo.id_empresa  and usu.id = apo.id_exec \n        where apo.id_empresa = ".concat(id_empresa, " and apo.id_exec = ").concat(id_usuario, " and to_char(apo.inicial,'MM/YYYY') = '").concat(data_ref, "'\n        group by to_char(apo.inicial,'dd/MM/YYYY'),apo.id_exec,usu.razao\n        order by to_char(apo.inicial,'dd/MM/YYYY'),apo.id_exec,usu.razao\n    ");
  console.log('GetAponExecByExecutor=>', strQuery);
  return db.manyOrNone(strQuery);
};