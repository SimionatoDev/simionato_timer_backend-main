"use strict";

/* DATA atividades */
var db = require('../infra/database');
/* CRUD GET */


exports.getAtividade = function (id_empresa, id) {
  strSelec = "SELECT  \n            ativ.id_empresa  \n            ,ativ.id  \n            ,ativ.id_projeto  \n            ,ativ.conta  \n            ,ativ.versao  \n            ,ativ.subconta  \n            ,ativ.nivel  \n            ,ativ.tipo  \n            ,ativ.controle  \n            ,ativ.id_resp  \n            ,ativ.id_exec  \n            ,ativ.id_subcliente  \n            ,ativ.inicial  \n            ,ativ.final  \n            ,ativ.horasplan  \n            ,ativ.horasexec  \n            ,ativ.horasdir  \n            ,ativ.obs  \n            ,ativ.status  \n            ,ativ.status_pl  \n            ,ativ.status_ex  \n            ,ativ.user_insert  \n            ,ativ.user_update   \n            ,estr.descricao descricao_estru \n            ,cli.razao as razao_cliente  \n            ,COALESCE(resp.razao,'') as resp_nome\n            from atividades ativ  \n            inner join estruturas estr on estr.id_empresa = ativ.id_empresa and estr.conta = ativ.conta and estr.versao = ativ.versao and estr.subconta = ativ.subconta \n            inner join clientes   cli  on cli.id_empresa  = ativ.id_empresa and cli.id = ativ.id_subcliente  \n            left  join usuarios   resp on resp.id_empresa = ativ.id_empresa and resp.id = ativ.id_resp\n            where  ativ.id_empresa = ".concat(id_empresa, "  and  ativ.id = ").concat(id, "   ");
  console.log('getatividade', strSelec);
  return db.oneOrNone(strSelec);
};
/* CRUD GET ALL*/


exports.getAtividades = function (params) {
  if (params) {
    where = "";
    orderby = "";
    console.log('params', params);

    if (params.orderby == 'projeto') {
      orderby = "order by ativ.id_empresa,ativ.conta,ativ.subconta";
    }

    if (params.orderby == 'descricao') {
      orderby = "order by ativ.id_empresa,ativ.id_projeto,estru.descricao";
    }

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "ativ.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += "ativ.id = ".concat(params.id);
    }

    if (params.id_projeto != 0) {
      if (where != "") where += " and ";
      where += "ativ.id_projeto = ".concat(params.id_projeto);
    }

    if (params.conta != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "ativ.conta = '".concat(params.conta.trim(), "'");
      } else {
        where += "ativ.conta like '%".concat(params.conta.trim(), "%'");
      }
    }

    if (params.versao != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "ativ.versao = '".concat(params.versao.trim(), "'");
      } else {
        where += "ativ.versao like '%".concat(params.versao.trim(), "%'");
      }
    }

    if (params.subconta != "") {
      if (params.subconta_nivel != "S") {
        if (where != "") where += " and ";

        if (params.sharp) {
          where += "ativ.subconta = '".concat(params.subconta.trim(), "'");
        } else {
          where += "ativ.subconta like '%".concat(params.subconta.trim(), "%'");
        }
      } else {
        if (where != "") where += " and ";
        where += "LEFT(ativ.subconta,".concat(params.nivel_filtro * 2, ") = '").concat(params.subconta.trim(), "'");
      }
    }

    if (params.tipo != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += "ativ.tipo = '".concat(params.tipo.trim(), "'");
      }
    }

    if (params.nivel != 0) {
      if (where != "") where += " and ";
      where += "ativ.nivel = ".concat(params.nivel);
    }

    if (params.id_resp != 0) {
      if (where != "") where += " and ";
      where += "ativ.id_resp = ".concat(params.id_resp);
    }

    if (params.id_exec != 0) {
      if (where != "") where += " and ";
      where += "ativ.id_exec = ".concat(params.id_exec);
    }

    if (params.id_subcliente != 0) {
      if (where != "") where += " and ";
      where += "ativ.id_subcliente = ".concat(params.id_subcliente);
    }

    if (params.so_abertas_ex != "") {
      if (where != "") where += " and ";
      where += "ativ.status_ex <  '2' ";
    }

    if (where != "") where = " where " + where;
    sqlStr = "select\n\t\t\t\t\t ativ.id_empresa\n\t\t\t\t\t,ativ.id\n\t\t\t\t\t,ativ.id_projeto\n\t\t\t\t\t,ativ.conta\n                    ,ativ.versao\n\t\t\t\t\t,ativ.subconta\n\t\t\t\t\t,ativ.nivel\n\t\t\t\t\t,ativ.tipo\n                    ,ativ.controle\n\t\t\t\t\t,ativ.id_resp\n\t\t\t\t\t,ativ.id_exec\n\t\t\t\t\t,ativ.id_subcliente\n\t\t\t\t\t,to_char(ativ.inicial,'YYYY-MM-DD') as inicial\n\t\t\t\t\t,to_char(ativ.final  ,'YYYY-MM-DD') as final\n\t\t\t\t\t,ativ.horasplan\n\t\t\t\t\t,ativ.horasexec\n                    ,ativ.horasdir\n\t\t\t\t\t,ativ.obs\n                    ,ativ.status\n                    ,ativ.status_pl\n                    ,ativ.status_ex\n\t\t\t\t\t,ativ.user_insert\n\t\t\t\t\t,ativ.user_update  \n\t\t\t\t\t,proj.descricao as proj_descri\n\t\t\t\t\t,estru.descricao as estru_descri\n\t\t\t\t\t,COALESCE(exec.razao,'') as exec_razao\n\t\t\t\t\t,COALESCE(resp.razao,'') as resp_razao\n                    ,cli.razao               as subcliente_razao\n                    ,cli.gru_econo           as gru_econo,\n                    get_cor(ativ.inicial,ativ.final,ativ.status_pl) as nivelplan, \n                    get_cor(ativ.inicial,ativ.final,ativ.status_ex) as nivelexec\n\t\t\t\t\tfrom   atividades ativ\n\t\t\t\t\tinner join projetos proj on proj.id_empresa = ativ.id_empresa  and proj.id = ativ.id_projeto\n\t\t\t\t\tinner join estruturas estru on estru.id_empresa = ativ.id_empresa and estru.conta = ativ.conta and estru.subconta = ativ.subconta\n                    inner join clientes   cli   on cli.id_empresa = ativ.id_empresa and cli.id = ativ.id_subcliente \n\t\t\t\t\tleft join usuarios exec on exec.id = ativ.id_exec\n\t\t\t\t\tleft join usuarios resp on resp.id = ativ.id_resp\n\t\t\t\t\t ".concat(where, "  ").concat(orderby, "  \n\t\t\t ");
    console.log("Query das atividades ".concat(sqlStr));
    return db.manyOrNone(sqlStr);
  } else {
    return db.manyOrNone('select * from atividades order by id_empresa,id');
  }
};

exports.getAtividadesVazia = function (params) {
  if (params) {
    console.log('getAtividadesVazia - params', params);
    where = "WHERE ESTRU.ID_EMPRESA = ".concat(params.id_empresa, " AND ESTRU.CONTA = '").concat(params.conta, "' AND ESTRU.VERSAO = '").concat(params.versao, "'");
    orderby = "ORDER BY  ESTRU.ID_EMPRESA , ESTRU.CONTA , ESTRU.VERSAO ,ESTRU.SUBCONTA";
    sqlStr = "SELECT\n                     estru.id_empresa       as id_empresa\n                    ,0                      as id\n                    ,proj.id                as id_projeto\n                    ,estru.conta            as conta\n                    ,estru.versao           as versao\n                    ,estru.subconta         as subconta\n                    ,estru.nivel            as nivel\n                    ,estru.tipo             as tipo\n                    ,estru.controle         as controle\n                    ,0                      as id_resp\n                    ,0                      as id_exec\n                    ,proj.id_cliente        as id_subcliente\n                    ,to_char(proj.dataproj,'YYYY-MM-DD') as inicial\n                    ,to_char(proj.dataenc ,'YYYY-MM-DD') as final\n                    ,0 as horasplan\n                    ,0 as horasexec\n                    ,0 as horasdir\n                    ,'' as obs\n                    ,'0' as status\n                    ,'0'  as status_pl\n                    ,'0'  as status_ex\n                    ,17  as user_insert\n                    ,0   as user_update  \n                    ,proj.descricao as proj_descri\n                    ,estru.descricao as estru_descri\n                    ,COALESCE(exec.razao,'') as exec_razao\n                    ,COALESCE(resp.razao,'') as resp_razao\n                    ,cli.razao               as subcliente_razao\n                    ,cli.gru_econo           as gru_econo\n                    ,'' as nivelplan \n                    ,'' as nivelexec\n                    , case\n                        when ativ.conta is null then 'S'\n                        else                         'N'\n                      end  as vazia\n                    FROM estruturas estru\n                    INNER JOIN projetos proj    on proj.id_empresa = estru.id_empresa  and proj.id = ".concat(params.id_projeto, "\n                    inner join clientes   cli   on cli.id_empresa = estru.id_empresa and cli.id = proj.id_cliente \n                    LEFT  JOIN ATIVIDADES ATIV ON ATIV.ID_EMPRESA = 1 AND ATIV.CONTA = estru.conta AND ATIV.VERSAO = estru.versao AND ATIV.SUBCONTA = estru.subconta and ATIV.ID_PROJETO =  ").concat(params.id_projeto, "\n                    left join usuarios    exec  on exec.id = ").concat(params.id_exec, "\n                    left join usuarios resp     on resp.id = ").concat(params.id_resp, "\n\t\t\t\t\t ").concat(where, "  ").concat(orderby, "  \n\t\t\t ");
    console.log("Query das atividades vazias ".concat(sqlStr));
    return db.manyOrNone(sqlStr);
  } else {
    return db.manyOrNone('select * from atividades order by id_empresa,id');
  }
};
/* CRUD - INSERT */


exports.insertAtividade = function (atividade) {
  return db.oneOrNone('insert into atividades ( id_empresa   ,  id_projeto   ,  conta   ,  versao, subconta   ,  nivel   ,  tipo  , controle ,  id_resp   ,  id_exec   ,  id_subcliente   ,  inicial   ,  final   ,  horasplan   ,  horasexec   ,  obs   ,  user_insert   ,  user_update  ) values( $1  ,  $3  ,  $4  ,  $5  ,  $6  ,  $7  ,  $8  ,  $9  ,  $10  ,  $11  ,  $12  ,  $13  ,  $14  ,  $15  ,  $16  ,  $17, $18)  returning * ', [atividade.id_empresa, atividade.id, atividade.id_projeto, atividade.conta, atividade.versao, atividade.subconta, atividade.nivel, atividade.tipo, atividade.id_resp, atividade.id_exec, atividade.id_subcliente, atividade.inicial, atividade["final"], atividade.horasplan, atividade.horasexec, atividade.horasdir, atividade.obs, atividade.user_insert, atividade.user_update]);
};
/* CRUD - UPDATE */


exports.updateAtividade = function (atividade) {
  return db.oneOrNone('update atividades set  id_projeto = $3  ,  conta = $4  ,  subconta = $5  ,  nivel = $6  ,  tipo = $7  ,  controle = $8, id_resp = $9  ,  id_exec = $10  ,  id_subcliente = $11  ,  inicial = $12  ,  final = $13  ,  obs = $16  ,  user_insert = $17  ,  user_update = $18  where  id_empresa = $1  and  id = $2   returning * ', [atividade.id_empresa, atividade.id, atividade.id_projeto, atividade.conta, atividade.subconta, atividade.nivel, atividade.tipo, atividade.controle, atividade.id_resp, atividade.id_exec, atividade.id_subcliente, atividade.inicial, atividade["final"], atividade.horasplan, atividade.horasexec, atividade.obs, atividade.user_insert, atividade.user_update]);
};

exports.updateAtividadeHorasDir = function (atividadeHorasDir) {
  return db.oneOrNone('update atividades set  horasdir = $3 ,  user_update = $4  where  id_empresa = $1  and  id = $2   returning *', [atividadeHorasDir.id_empresa, atividadeHorasDir.id_atividade, atividadeHorasDir.horasdir, atividadeHorasDir.user_update]);
};
/* CRUD - DELETE */


exports.deleteAtividade = function (id_empresa, id_projeto, conta, versao, subconta) {
  return db.oneOrNone('delete from atividades where  id_empresa = $1  and  id_projeto = $2 and conta = $3 and versao = $4 and subconta = $5  ', [id_empresa, id_projeto, conta, versao, subconta]);
};
/* ANEXA ATIVIDADES NO PROJETO */


exports.anexaAtividade = function (atividades) {
  var strInsert = "insert into atividades\n\t(id_empresa\n\t,id_projeto\n\t,conta\n    ,versao\n\t,subconta\n\t,nivel\n\t,tipo\n    ,controle\n\t,id_resp\n\t,id_exec\n\t,id_subcliente\n\t,inicial\n\t,final\n\t,horasplan\n\t,horasexec\n    ,horasdir\n\t,obs\n\t,user_insert\n\t,user_update)\n\t(select\n\t  estruturas.id_empresa\n\t ,proj.id\n\t ,estruturas.conta\n     ,estruturas.versao\n\t ,estruturas.subconta\n\t ,estruturas.nivel\n\t ,estruturas.tipo\n     ,estruturas.controle\n     ,( SELECT * FROM define_id_operador(".concat(id_empresa, ",'").concat(conta, "',estruturas.subconta,'").concat(versao, "',").concat(id_resp, ",'R')) AS id_resp\n\t ,( SELECT * FROM define_id_operador(").concat(id_empresa, ",'").concat(conta, "',estruturas.subconta,'").concat(versao, "',").concat(id_exec, ",'E')) AS id_exec\n\t ,proj.id_cliente as id_subcliente\n\t ,proj.dataproj as inicial\n\t ,proj.dataenc  as final\n\t ,0  as horasplan\n\t ,0  as horasexec\n     ,0  as horasdir\n\t ,'' as obs\n\t ,1  as user_insert \n\t ,0  as user_update \n\t from estruturas \n\t inner join projetos proj on proj.id_empresa =  estruturas.id_empresa and proj.id = ").concat(id_projeto, " \n\t where estruturas.id_empresa = ").concat(id_empresa, " and estruturas.conta = '").concat(conta, "' and estruturas.versao = '").concat(versao, "'\n\t order by estruturas.id_empresa,estruturas.conta,estruturas.subconta)");
  console.log('Anexa com esta string', strInsert);
  return db.none(strInsert);
};

exports.anexaAtividadev2 = function (atividades) {
  var strInsert = "insert into atividades\n\t(id_empresa\n\t,id_projeto\n\t,conta\n    ,versao\n\t,subconta\n\t,nivel\n\t,tipo\n    ,controle\n\t,id_resp\n\t,id_exec\n\t,id_subcliente\n\t,inicial\n\t,final\n\t,horasplan\n\t,horasexec\n    ,horasdir\n\t,obs\n\t,user_insert\n\t,user_update ) values ".concat(getAtivString(atividades), "\n\t");
  console.log('Anexa com esta string v2 ', strInsert);
  return db.none(strInsert);
};
/* APAGA TODAS AS ATIVIDADES DE UMA ESTRUTURA. USADA COM A ESTRUTURA FOR DELETADA */


exports.deleteAtividadeEstrutura = function (id_empresa, conta, versao) {
  return db.oneOrNone('delete from atividades where  id_empresa = $1  and  conta = $2 and versao = $3 ', [id_empresa, conta, versao]);
};
/* DESAANEXA ATIVIDADES NO PROJETO */


exports.desanexaAtividade = function (id_empresa, conta, versao, id_projeto) {
  return db.oneOrNone('delete from atividades where  id_empresa = $1  and  conta = $2  and versao = $3 and  id_projeto = $4  ', [id_empresa, conta, versao, id_projeto]);
};

exports.existeAtividade = function (id_empresa, id_projeto, conta, versao, subconta) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom atividades\n\twhere id_empresa = ".concat(id_empresa, " and id_projeto = ").concat(id_projeto, " and conta = '").concat(conta, "' and versao = '").concat(versao, "' and subconta = '").concat(subconta, "'");
  console.log('existeAtividade', strQuery);
  return db.oneOrNone(strQuery);
};

exports.existeAtividades = function (id_empresa, id_projeto, conta, versao) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom atividades\n\twhere id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and conta = '").concat(conta, "' and versao = '").concat(versao, "'");
  return db.oneOrNone(strQuery);
};

exports.existeAtividadesByProj = function (id_empresa, id_projeto) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom atividades\n\twhere id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " ");
  return db.oneOrNone(strQuery);
};

exports.existeAtividadesEstrutura = function (id_empresa, conta, versao) {
  var strQuery = "\n\tselect COALESCE(count(*),0) as total\n\tfrom atividades\n\twhere id_empresa = ".concat(id_empresa, " and  conta = '").concat(conta, "'  and versao = '").concat(versao, "'");
  return db.oneOrNone(strQuery);
};

exports.setatus = function (id_empresa, id_projeto, id_subconta) {
  var sqlStr = "select from setStatus(".concat(id_empresa, ",").concat(id_projeto, ",'").concat(id_subconta.trim(), "')");
  console.log("sqlStr", sqlStr);
  return db.any(sqlStr);
};

exports.existeLancamentosSubconta = function (id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
  var sqlStr = "SELECT count(*) as total from apons_execucao\n        where id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and  id_conta = '").concat(id_conta, "'  and  id_conta_versao = '").concat(id_conta_versao, "' and id_conta_versao = '").concat(id_subconta, "'  and  LEFT(id_subconta,").concat(nivel * 2, ") = '").concat(id_subconta.trim(), "' union all\n        SELECT count(*) as total from apons_planejamento\n        where id_empresa = ").concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and  id_conta = '").concat(id_conta, "'  and  id_conta_versao = '").concat(id_conta_versao, "' and id_conta_versao = '").concat(id_subconta, "'  and  LEFT(id_subconta,").concat(nivel * 2, ") = '").concat(id_subconta.trim(), "'");
  console.log("sqlStr", sqlStr);
  return db.any(sqlStr);
};

exports.desanexasubconta = function (id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
  var strDelete = "delete from  atividades \n                        where id_empresa = ".concat(id_empresa, " and  id_projeto = ").concat(id_projeto, " and  conta = '").concat(id_conta, "'  and  \n                              versao = '").concat(id_conta_versao, "'  and  LEFT(subconta,").concat(nivel * 2, ") = '").concat(id_subconta.trim(), "' ");
  console.log("Delete subconta: ".concat(strDelete));
  return db.oneOrNone(strDelete);
};

function getAtivString(atividades) {
  retorno = '';
  virgula = '';

  if (atividades.length > 0) {
    atividades.forEach(function (ativ) {
      if (ativ.checked && ativ.vazia) {
        retorno += " ".concat(virgula, " (\n                                  ").concat(ativ.atividade.id_empresa, "\n                                , ").concat(ativ.atividade.id_projeto, "\n                                ,'").concat(ativ.atividade.conta, "'\n                                ,'").concat(ativ.atividade.versao, "'\n                                ,'").concat(ativ.atividade.subconta, "'\n                                , ").concat(ativ.atividade.nivel, "\n                                ,'").concat(ativ.atividade.tipo, "'\n                                ,'").concat(ativ.atividade.controle, "'\n                                , ").concat(ativ.atividade.id_resp, "\n                                , ").concat(ativ.atividade.id_exec, "\n                                , ").concat(ativ.atividade.id_subcliente, "\n                                ,'").concat(ativ.atividade.inicial, "'\n                                ,'").concat(ativ.atividade["final"], "'\n                                ,0  \n                                ,0  \n                                ,0  \n                                ,'' \n                                ,1   \n                                ,0 )  ");
        virgula = ',';
      }
    });
  }

  return retorno;
}