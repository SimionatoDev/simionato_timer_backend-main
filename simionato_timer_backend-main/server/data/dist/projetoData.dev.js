"use strict";

var db = require('../infra/database');

var shared = require('../util/shared');

function getCampos(projeto) {
  return [projeto.id_empresa, projeto.id, projeto.id_cliente, projeto.id_diretor, shared.formatDateYYYYMMDD(projeto.dataprop), shared.formatDateYYYYMMDD(projeto.dataproj), shared.formatDateYYYYMMDD(projeto.dataenc), projeto.descricao, projeto.horasve, projeto.horasplan, projeto.horasexec, projeto.horasdir, projeto.status, projeto.id_tipo, projeto.objeto, projeto.obs, shared.formatDateYYYYMMDD(projeto.reajuste), projeto.valor, projeto.id_cond_pgto, projeto.id_contrato, projeto.id_parceira, shared.formatDateYYYYMMDD(projeto.assinatura), projeto.user_insert, projeto.user_update];
}

function getStrSelect() {
  return "\n     proj.id_empresa \n\t,proj.id \n\t,proj.id_cliente \n\t,proj.id_diretor \n\t,to_char(proj.dataprop, 'DD/MM/YYYY') as dataprop \n\t,to_char(proj.dataproj, 'DD/MM/YYYY') as dataproj \n\t,to_char(proj.dataenc,  'DD/MM/YYYY') as dataenc \n\t,proj.descricao \n\t,proj.horasve \n\t,proj.horasplan \n\t,proj.horasexec \n\t,proj.horasdir \n\t,proj.status \n\t,proj.status_pl \n\t,proj.status_ex \n\t,proj.user_insert \n\t,proj.user_update \n\t,proj.objeto \n\t,proj.obs \n\t,to_char(proj.reajuste,  'DD/MM/YYYY')    as reajuste \n\t,proj.valor \n\t,proj.id_cond_pgto \n\t,proj.id_contrato \n\t,to_char(proj.assinatura,  'DD/MM/YYYY')  as assinatura \n\t,proj.id_tipo \n\t,proj.id_parceira    \n    ";
}

exports.getProjeto = function (id_empresa, id) {
  strSql = "SELECT ".concat(getStrSelect(), "   ");
  strSql += " ,usu.razao as diretor_razao,cli.razao as cliente_razao,cli.gru_econo as cliente_gru_econo  " + " FROM          projetos proj " + " INNER JOIN    usuarios usu on usu.id_empresa = proj.id_empresa and usu.id = proj.id_diretor  " + " INNER JOIN    clientes cli on cli.id_empresa = proj.id_empresa and cli.id = proj.id_cliente  " + "  where  proj.id_empresa = $1  and proj.id = $2 ";
  return db.oneOrNone(strSql, [id_empresa, id]);
};

exports.getProjetos = function (params) {
  if (params) {
    where = "";
    orderby = "";
    paginacao = "";
    console.log('params', params);
    console.log('params.orderby', params.orderby);
    if (params.orderby == 'Código') orderby = "order by proj.id_empresa, proj.id";
    if (params.orderby == "Descrição") orderby = "order by proj.id_empresa,proj.descricao";
    if (params.orderby == "Fantasia") orderby = "order by proj.id_empresa,cli.fantasi";

    if (params.id_empresa != 0) {
      if (where != "") where += " and ";
      where += "proj.id_empresa = ".concat(params.id_empresa);
    }

    if (params.id != 0) {
      if (where != "") where += " and ";
      where += " proj.id = ".concat(params.id, " ");
    }

    if (params.id_diretor != 0) {
      if (where != "") where += " and ";
      where += " proj.id_diretor = ".concat(params.id_diretor, " ");
    }

    if (params.descricao != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += " proj.descricao = '".concat(params.descricao.trim(), "' ");
      } else {
        where += "(proj.descricao like '%".concat(params.descricao.trim(), "%') ");
      }
    }

    if (params.cli_razao != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += " cli.fantasi = '".concat(params.cli_razao.trim(), "' ");
      } else {
        where += "(cli.fantasi like '%".concat(params.cli_razao.trim(), "%') ");
      }
    }

    if (params.cli_grupo != "") {
      if (where != "") where += " and ";

      if (params.sharp) {
        where += " cli.gru_econo = '".concat(params.cli_grupo.trim(), "' ");
      } else {
        where += "(cli.gru_econo like '%".concat(params.cli_grupo.trim(), "%') ");
      }
    }

    if (params.status != "") {
      if (where != "") where += " and ";
      where += " proj.status = '".concat(params.status.trim(), "' ");
    }

    if (params.status_pl != "") {
      if (where != "") where += " and ";
      where += " proj.status_pl = '".concat(params.status_pl.trim(), "' ");
    }

    if (params.status_ex != "") {
      if (where != "") where += " and ";
      where += " proj.status_ex = '".concat(params.status_ex.trim(), "' ");
    }

    if (params.so_ativos == "S") {
      if (where != "") where += " and ";
      where += " proj.status <= '2' ";
    }

    if (params.tem_atividade == 'S') {
      if (where != "") where += " and ";
      where += " (select coalesce(count(*),0) from atividades ativ where ativ.id_empresa = proj.id_empresa and ativ.id_projeto = proj.id and ativ.tipo = 'C') > 0 ";
    }

    if (params.tem_atividade == 'N') {
      if (where != "") where += " and ";
      where += " (select coalesce(count(*),0) from atividades ativ where ativ.id_empresa = proj.id_empresa and ativ.id_projeto = proj.id and ativ.tipo = 'C') == 0 ";
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (params.pagina != 0) {
      paginacao = "limit ".concat(params.tamPagina, " offset ((").concat(params.pagina, " - 1) * ").concat(params.tamPagina, ")");
    }

    if (where != "") where = " where " + where;
    if (orderby == "") orderby = " order by proj.id_empresa,proj.id ";

    if (params.contador == 'S') {
      sqlStr = " SELECT  COALESCE(COUNT(*),0) as total \n                       FROM    projetos proj     \n                       INNER JOIN    usuarios usu on usu.id_empresa = proj.id_empresa and usu.id = proj.id_diretor \n                       INNER JOIN    clientes cli on cli.id_empresa = proj.id_empresa and cli.id = proj.id_cliente\n              ".concat(where, " \n         ");
      console.log('sqlStr', sqlStr);
      return db.one(sqlStr);
    } else {
      sqlStr = " SELECT        ".concat(getStrSelect(), " , usu.razao as diretor_razao,cli.fantasi as cliente_razao,cli.gru_econo as cliente_gru_econo\n                                    ,get_cor(proj.dataproj,proj.dataenc,proj.status_pl) as nivelplan\n                                    ,get_cor(proj.dataproj,proj.dataenc,proj.status_ex) as nivelexec\n                                    ,case  \n                                        when (select coalesce(count(*),0) from atividades ativ where ativ.id_empresa = proj.id_empresa and ativ.id_projeto = proj.id and ativ.tipo = 'C') > 0 then 'SIM'\n                                        else       'N\xC3O'\n                                     end as tem_atividade\n                    FROM          projetos proj     \n                    INNER JOIN    usuarios usu on usu.id_empresa = proj.id_empresa and usu.id = proj.id_diretor \n                    INNER JOIN    clientes cli on cli.id_empresa = proj.id_empresa and cli.id = proj.id_cliente\n            ").concat(where, "  ").concat(orderby, "   ").concat(paginacao, "\n            \n            ");
      console.log('Projetos Apontamentos:', sqlStr);
      return db.manyOrNone(sqlStr);
    }

    ;
  } else {
    return db.manyOrNone('select * from projetos order by id_empresa,id');
  }
};

exports.getAgeHoras = function (params) {
  where = "";
  orderby = "";
  paginacao = "";
  console.log('getAgeHoras params:', params);
  orderby = "order by tabela.dia";

  if (params.id_empresa != 0) {
    if (where != "") where += " and ";
    where += "apo.id_empresa = ".concat(params.id_empresa);
  }

  if (params.id_resp != 0) {
    if (where != "") where += " and ";
    where += "apo.id_resp = ".concat(params.id_resp);
  }

  if (params.id_exec != 0) {
    if (where != "") where += " and ";
    where += "apo.id_exec = ".concat(params.id_exec);
  }

  if (params.id_dir != 0) {
    if (where != "") where += " and ";
    where += "proj.id_diretor = ".concat(params.id_dir);
  }

  if (params.mes != "") {
    if (where != "") where += " and ";
    where += "TO_CHAR(apo.inicial,'mm') = '".concat(params.mes, "'");
  }

  if (params.ano != "") {
    if (where != "") where += " and ";
    where += "TO_CHAR(apo.inicial,'yyyy') = '".concat(params.ano, "'");
  }

  if (where != "") where = " where " + where;
  sqlStr = "\n             SELECT TABELA.DIA, SUM(TABELA.horas_plan) AS horas_plan, SUM(horas_exec) as horas_exec\n            FROM (\n            SELECT TO_CHAR(apo.inicial,'dd') as dia ,apo.horasapon as horas_plan, 0 as horas_exec\n            FROM   apons_planejamento apo\n            inner join projetos proj on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto\n            ".concat(where, " union all\n            SELECT TO_CHAR(apo.inicial,'dd') as dia, 0 as horas_plan, apo.horasapon as horas_exec\n            FROM   apons_execucao apo\n            inner join projetos proj on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto\n            ").concat(where, "  ) AS TABELA\n            GROUP BY TABELA.DIA\n            ORDER BY TABELA.DIA\n         ");
  console.log('sqlStr', sqlStr);
  return db.manyOrNone(sqlStr);
};

exports.getProjetosByIdEmpresa = function (id_empresa) {
  return db.manyOrNone('select * from projetos where id_empresa = $1  order by id_empresa,id_cliente', [id_empresa]);
};

exports.getProjetosByIdEmpresaIdCliente = function (id_empresa, id_cliente) {
  return db.manyOrNone('select * from projetos where id_empresa = $1 and id_cliente = $2 order by id_empresa,id_cliente', [id_empresa, id_cliente]);
};

exports.insertProjeto = function (projeto) {
  console.log('projeto =>', projeto);
  sqlString = 'insert into projetos' + '(id_empresa,  id_cliente, id_diretor, dataprop, dataproj, dataenc, descricao, horasve, horasplan, horasexec, horasdir, status,id_tipo,objeto,obs,reajuste,valor,id_cond_pgto,id_contrato,id_parceira,assinatura,user_insert,user_update) ' + ' values ($1,  $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,$24  ) returning *';
  return db.oneOrNone(sqlString, getCampos(projeto));
};

exports.updateProjeto = function (projeto) {
  console.log('projeto =>', projeto);
  sqlUpdate = 'update projetos set ' + ' id_cliente       =       $3       ,   ' + ' id_diretor       =       $4       ,   ' + ' dataprop         =       $5       ,   ' + ' dataproj         =       $6       ,   ' + ' dataenc          =       $7       ,   ' + ' descricao        =       $8       ,   ' + ' horasve          =       $9       ,   ' + ' id_tipo		=       $14      ,   ' + ' objeto        =       $15      ,   ' + ' obs           =       $16      ,   ' + ' reajuste      =       $17      ,   ' + ' Valor         =       $18      ,   ' + ' id_cond_pgto  =       $19      ,   ' + ' id_parceira       =       $21      ,   ' + ' assinatura    =       $22      ,   ' + ' user_insert      =       $23      ,   ' + ' user_update      =       $24          ' + ' where id_empresa = $1 and id = $2 returning * ';
  console.log(sqlUpdate);
  return db.oneOrNone(sqlUpdate, getCampos(projeto));
};

exports.deleteProjeto = function (id_empresa, id) {
  return db.manyOrNone('delete from projetos where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};