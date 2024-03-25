/* DATA titulos_projeto */
const db = require('../infra/database');
const shared = require('../util/shared');

/* CRUD GET */
exports.getTitulo_Projeto = function(id_empresa, id_projeto, data_vencto) {
    console.log('data', data_vencto);
    const strSql = `       select  
                           titulos_projeto.id_empresa as  id_empresa 
                        ,  titulos_projeto.id_projeto as  id_projeto 
                        ,  to_char(titulos_projeto.data_vencto, 'DD/MM/YYYY') as data_vencto  
                        ,  to_char(titulos_projeto.data_pagto, 'DD/MM/YYYY') as data_pagto  
                        ,  titulos_projeto.valor as  valor 
                        ,  titulos_projeto.obs as  obs 
                        ,  titulos_projeto.user_insert as  user_insert 
                        ,  titulos_projeto.user_update as  user_update 
                           from titulos_projeto 
                            where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and  data_vencto = '${shared.formatDateYYYYMMDD(data_vencto)}' `;

    console.log(strSql);
    return db.oneOrNone(strSql);
}

/* CRUD GET ALL*/
exports.getTitulos_Projeto = function(params) {

        if (params) {

            where = "";

            orderby = "";

            paginacao = "";

            console.log('params', params);

            console.log('params.orderby', params.orderby)

            if (params.orderby == "Projeto") orderby = "order by titulos_projeto.id_empresa,titulos_projeto.id_projeto,titulos_projeto.data_vencto";
            if (params.orderby == "Vencimento") orderby = "order by titulos_projeto.id_empresa,titulos_projeto.data_vencto,titulos_projeto.id_projeto";
            if (params.orderby == "Cliente") orderby = "order by titulos_projeto.id_empresa,pro.id_cliente,titulos_projeto.data_vencto";

            if (params.id_empresa != 0) {
                if (where != "") where += " and ";
                where += `titulos_projeto.id_empresa = ${params.id_empresa}`;
            }

            if (params.id_projeto != 0) {
                if (where != "") where += " and ";
                where += `titulos_projeto.id_projeto = ${params.id_projeto}`;
            }

            if (params.id_cliente != 0) {
                if (where != "") where += " and ";
                where += `proj.id_cliente = ${params.id_cliente}`;
            }

            if (params.data_vencto != "") {
                if (where != "") where += " and ";
                where += ` to_char(titulos_projeto.data_vencto,'YYYY-MM-DD') = '${params.data}' `;
            }

            if (params.data_pagto != "") {
                if (where != "") where += " and ";
                where += ` to_char(titulos_projeto.data_pagto,'YYYY-MM-DD') = '${params.data}' `;
            }

            if (params.pagina != 0) {
                paginacao = `limit ${params.tamPagina} offset ((${params.pagina} - 1) * ${params.tamPagina})`;
            }

            if (where != "") where = " where " + where;

            if (params.contador == 'S') {
                sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
                          from titulos_projeto 
                          inner join projetos proj  on proj.id_empresa = titulos_projeto.id_empresa and proj.id = titulos_projeto.id_projeto 
                          inner join clientes  cli  on cli.id_empresa = titulos_projeto.id_empresa and cli.id  = proj.id_cliente 
                          ${where} 
                `;

                console.log('getTitulos_Projeto', sqlStr);

                return db.one(sqlStr);

            } else {

                const strQry = `
			       select 
                   titulos_projeto.id_empresa as  id_empresa 
                ,  titulos_projeto.id_projeto as  id_projeto 
                ,  to_char(titulos_projeto.data_vencto, 'DD/MM/YYYY') as data_vencto  
                ,  to_char(titulos_projeto.data_pagto, 'DD/MM/YYYY') as data_pagto  
                ,  titulos_projeto.valor as  valor 
                ,  titulos_projeto.obs as  obs 
                ,  titulos_projeto.user_insert as  user_insert 
                ,  titulos_projeto.user_update as  user_update 
                ,  cli.id                      as  id_cliente 
                ,  cli.razao                   as  cli_razao     
                ,  cli.fantasi                 as  cli_fantasi   
                   from titulos_projeto 
                   inner join projetos proj on proj.id_empresa = titulos_projeto.id_empresa and proj.id = titulos_projeto.id_projeto 
                   inner join clientes  cli  on cli.id_empresa = titulos_projeto.id_empresa and cli.id  = proj.id_cliente
                   ${where}  ${orderby}  ${paginacao} `;

                console.log('EStou aqui ! getTitulos_Projeto', strQry);

                return db.manyOrNone(strQry);
            }
        } else {
            return db.manyOrNone("select " +
                "   titulos_projeto.id_empresa as  id_empresa " +
                ",  titulos_projeto.id_projeto as  id_projeto " +
                ", to_char(titulos_projeto.data_vencto, 'DD/MM/YYYY') as data_vencto  " +
                ", to_char(titulos_projeto.data_pagto, 'DD/MM/YYYY') as data_pagto  " +
                ",  titulos_projeto.valor as  valor " +
                ",  titulos_projeto.obs as  obs " +
                ",  titulos_projeto.user_insert as  user_insert " +
                ",  titulos_projeto.user_update as  user_update " +
                "from titulos_projeto " +
                "order by id_empresa,id_projeto ");
        }
    }
    /* CRUD - INSERT */
exports.insertTitulo_Projeto = function(titulo_projeto) {
    strSql = `insert into titulos_projeto (
		     id_empresa 
		 ,   id_projeto 
		 ,   data_vencto 
		 ,   data_pagto 
		 ,   valor 
		 ,   obs 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${titulo_projeto.id_empresa} 
		 ,   ${titulo_projeto.id_projeto} 
		 ,   '${shared.formatDateYYYYMMDD(titulo_projeto.data_vencto)}' 
		 ,   ${shared.IfNUllNoAspas(shared.formatDateYYYYMMDD(titulo_projeto.data_pagto))} 
		 ,   ${titulo_projeto.valor} 
		 ,   '${titulo_projeto.obs}' 
		 ,   ${titulo_projeto.user_insert} 
		 ,   ${titulo_projeto.user_update} 
		 ) 
 returning * `;
    console.log('insertTitulo_Projeto', strSql);
    return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
exports.updateTitulo_Projeto = function(titulo_projeto) {
    strSql = `update  titulos_projeto set 
		     data_pagto = ${shared.IfNUllNoAspas(shared.formatDateYYYYMMDD(titulo_projeto.data_pagto))} 
 		 ,   valor = ${titulo_projeto.valor} 
 		 ,   obs = '${titulo_projeto.obs}' 
 		 ,   user_insert = ${titulo_projeto.user_insert} 
 		 ,   user_update = ${titulo_projeto.user_update} 
 		 where id_empresa = ${titulo_projeto.id_empresa} and  id_projeto = ${titulo_projeto.id_projeto} and  data_vencto = '${shared.formatDateYYYYMMDD(titulo_projeto.data_vencto)}'  returning * `;
    console.log('updateTitulo_Projeto =>', strSql);
    return db.oneOrNone(strSql);
}

/* CRUD - DELETE */
exports.deleteTitulo_Projeto = function(id_empresa, id_projeto, data_vencto) {
    console.log('data-delete', data_vencto);
    strSql = `delete from titulos_projeto 
		 where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and  data_vencto = '${shared.formatDateYYYYMMDD(data_vencto)}'  `;
    console.log('deleteTitulo_Projeto=>', strSql);
    return db.oneOrNone(strSql);
}

/* Resumo Projeto x Titulos */
exports.getResumoProjetosTitulos = function(params) {

    where = "";

    orderby = "";

    paginacao = "";

    console.log('params', params);

    console.log('params.orderby', params.orderby)

    if (params.orderby == "Projeto") orderby = "order by tit.id_empresa,tit.id_projeto,tit.data_vencto";
    if (params.orderby == "Vencimento") orderby = "order by tit.id_empresa,tit.data_vencto,tit.id_projeto";
    if (params.orderby == "Cliente") orderby = "order by tit.id_empresa,pro.id_cliente,tit.data_vencto";

    if (params.id_empresa != 0) {
        if (where != "") where += " and ";
        where += `titulos_projeto.id_empresa = ${params.id_empresa}`;
    }

    if (params.id_projeto != 0) {
        if (where != "") where += " and ";
        where += `titulos_projeto.id_projeto = ${params.id_projeto}`;
    }

    if (params.id_cliente != 0) {
        if (where != "") where += " and ";
        where += `tit.id_cliente = ${params.id_cliente}`;
    }

    if (params.id_diretor != 0) {
        if (where != "") where += " and ";
        where += `proj.id_diretor = ${params.id_diretor}`;
    }

    if (params.id_grupo != 0) {
        if (where != "") where += " and ";
        where += `cli.gru_econo = ${params.id_grupo}`;
    }

    if (params.pagina != 0) {
        paginacao = `limit ${params.tamPagina} offset ((${params.pagina} - 1) * ${params.tamPagina})`;
    }

    if (where != "") where = " where " + where;

    if (params.contador == 'S') {
        sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
                      from titulos_projeto ti     FROM TITULOS_PROJETO TIT
                      INNER JOIN PROJETOS PROJ       ON TIT.ID_EMPRESA = PROJ.ID_EMPRESA AND TIT.ID_PROJETO = PROJ.ID 
                      INNER JOIN CLIENTES CLI        ON CLI.ID_EMPRESA = PROJ.ID_EMPRESA AND CLI.ID = PROJ.ID_CLIENTE
                      INNER JOIN GRUPOS_ECO GRUPO    ON GRUPO.ID_EMPRESA = PROJ.ID_EMPRESA AND GRUPO.ID = CLI.GRU_ECONO
                      INNER JOIN USUARIOS DIR        ON DIR.ID_EMPRESA = PROJ.ID_EMPRESA AND DIR.ID = PROJ.ID_DIRETOR
                      ${where} 
            `;

        console.log('getResumoProjetosTitulos', sqlStr);

        return db.one(sqlStr);

    } else {

        const strQry = `
                            SELECT  PROJ.ID            AS PROJ_ID
                            ,PROJ.ID_CLIENTE    AS ID_CLIENTE
                            ,CLI.RAZAO          AS CLI_RAZAO
                            ,CLI.GRU_ECONO      AS GRUPO_ID
                            ,GRUPO.RAZAO        AS GRUPO_RAZAO
                            ,PROJ.DESCRICAO     AS PROJ_DESCRICAO
                            ,PROJ.ID_DIRETOR    AS PROJ_ID_DIRETOR
                            ,DIR.RAZAO          AS DIR_RAZAO
                            ,PROJ.HORASVE       AS HORAS_VEN
                            ,PROJ.VALOR         AS PROJ_VALOR
                            ,to_char(PROJ.DATAPROJ,  'DD/MM/YYYY') AS DATA_PROJ
                            ,to_char(PROJ.DATAENC,  'DD/MM/YYYY')  AS DATA_ENCER
                            ,SUM(
                            CASE 
                                WHEN TIT.DATA_VENCTO < NOW() AND TIT.DATA_PAGTO IS NULL THEN TIT.VALOR
                                ELSE                            0
                            END) AS TOTAL_VENCIDO
                            ,SUM(
                            CASE 
                                WHEN TIT.DATA_VENCTO >= NOW() AND TIT.DATA_PAGTO IS NULL THEN TIT.VALOR
                                ELSE                            0
                            END) AS TOTAL_NAO_VENCIDO
                            ,SUM(
                            CASE 
                                WHEN TIT.DATA_PAGTO IS NOT NULL THEN TIT.VALOR
                                ELSE                            0
                            END) AS TOTAL_PAGTO
                    FROM TITULOS_PROJETO TIT
                    INNER JOIN PROJETOS PROJ       ON TIT.ID_EMPRESA = PROJ.ID_EMPRESA AND TIT.ID_PROJETO = PROJ.ID 
                    INNER JOIN CLIENTES CLI        ON CLI.ID_EMPRESA = PROJ.ID_EMPRESA AND CLI.ID = PROJ.ID_CLIENTE
                    INNER JOIN GRUPOS_ECO GRUPO    ON GRUPO.ID_EMPRESA = PROJ.ID_EMPRESA AND GRUPO.ID = CLI.GRU_ECONO
                    INNER JOIN USUARIOS DIR        ON DIR.ID_EMPRESA = PROJ.ID_EMPRESA AND DIR.ID = PROJ.ID_DIRETOR
                    WHERE PROJ.VALOR > 0 
                    GROUP BY  
                            PROJ.ID
                            ,PROJ.ID_CLIENTE
                            ,CLI.RAZAO
                            ,CLI.GRU_ECONO
                            ,GRUPO.RAZAO
                            ,PROJ.DESCRICAO
                            ,PROJ.ID_DIRETOR
                            ,DIR.RAZAO
                            ,PROJ.HORASVE
                            ,PROJ.VALOR
                            ,to_char(PROJ.DATAPROJ,  'DD/MM/YYYY')
                            ,to_char(PROJ.DATAENC,  'DD/MM/YYYY') 
                    ORDER BY PROJ.ID
               ${where}  ${orderby}  ${paginacao} `;

        console.log('getResumoProjetosTitulos', strQry);

        return db.manyOrNone(strQry);
    }
}