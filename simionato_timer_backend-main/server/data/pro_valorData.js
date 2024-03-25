/* DATA projeto_valores */
const db = require('../infra/database');

/* CRUD GET */
exports.getPro_Valor = function(id_empresa, id) {
        return db.oneOrNone('select ' +
            "     projeto_valores.id_empresa as  id_empresa " +
            ",  projeto_valores.id as  id " +
            ",  projeto_valores.id_projeto as  id_projeto " +
            ",  projeto_valores.id_diretor as  id_diretor " +
            ",  projeto_valores.id_cond_pgto as  id_cond_pgto " +
            ",  projeto_valores.descricao as  descricao " +
            ", to_char(projeto_valores.emissao, 'DD/MM/YYYY') as emissao  " +
            ",  projeto_valores.valor as  valor " +
            ",  projeto_valores.saldo as  saldo " +
            ",  projeto_valores.status as  status " +
            ",  projeto_valores.user_insert as  user_insert " +
            ",  projeto_valores.user_update as  user_update " + '  from projeto_valores where  projeto_valores.id_empresa = $1  and  projeto_valores.id = $2   ', [id_empresa, id]);
    }
    /* CRUD GET ALL*/
exports.getPro_Valores = function(params) {
    if (params) {

        where = "";

        orderby = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Código') {

            console.log('Código', params.orderby);
            orderby = "order by projeto_valores.id";
        }

        if (params.orderby == "Descrição") orderby = "order by projeto_valores.descricao";

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `projeto_valores.id_empresa = ${params.id_empresa}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += `projeto_valores.id = ${params.id}`;
        }

        if (params.id_projeto != 0) {
            if (where != "") where += " and ";
            where += `projeto_valores.id_projeto = ${params.id_projeto}`;
        }

        if (params.id_diretor != 0) {
            if (where != "") where += " and ";
            where += `projeto_valores.id_diretor = ${params.id_diretor}`;
        }

        if (params.id_cond_pgto != 0) {
            if (where != "") where += " and ";
            where += `projeto_valores.id_cond_pgto = ${params.id_cond_pgto}`;
        }

        if (params.descricao != "") {

            if (where != "") where += " and ";
            if (params.sharp) {

                where += `condicoes_pagto.descricao = '${params.descricao.trim()}'`;

            } else {

                where += `condicoes_pagto.descricao like '%${params.descricao.trim()}%'`;

            }
        }

        if (where != "") where = " where " + where;

        sqlStr = `select  
               projeto_valores.id_empresa as  id_empresa    
                ,  projeto_valores.id as  id    
                ,  projeto_valores.id_projeto as  id_projeto    
                ,  projeto_valores.id_diretor as  id_diretor    
                ,  projeto_valores.id_cond_pgto as  id_cond_pgto    
                ,  projeto_valores.descricao as  descricao    
                ,  to_char(projeto_valores.emissao, 'DD/MM/YYYY') as emissao    
                ,  projeto_valores.valor as  valor    
                ,  projeto_valores.saldo as  saldo    
                ,  projeto_valores.status as  status    
                ,  projeto_valores.user_insert as  user_insert    
                ,  projeto_valores.user_update as  user_update    
                ,  proj.descricao              as proj_descricao
                ,  dir.razao                   as dir_razao
                ,  cond.descricao              as cond_descricao
            from projeto_valores 
            inner join projetos proj  on proj.id_empresa = projeto_valores.id_empresa and proj.id = projeto_valores.id_projeto
            inner join usuarios dir  on dir.id_empresa = projeto_valores.id_empresa and dir.id = projeto_valores.id_diretor
            inner join condicoes_pagto cond on cond.id_empresa = projeto_valores.id_empresa and cond.id = projeto_valores.id_cond_pgto               
            ${where}  ${orderby}  
            `;

        console.log('sqlStr', sqlStr);

        return db.manyOrNone(sqlStr);

    } else {
        sqlStr = `select  
            projeto_valores.id_empresa as  id_empresa    
             ,  projeto_valores.id as  id    
             ,  projeto_valores.id_projeto as  id_projeto    
             ,  projeto_valores.id_diretor as  id_diretor    
             ,  projeto_valores.id_cond_pgto as  id_cond_pgto    
             ,  projeto_valores.descricao as  descricao    
             ,  to_char(projeto_valores.emissao, 'DD/MM/YYYY') as emissao    
             ,  projeto_valores.valor as  valor    
             ,  projeto_valores.saldo as  saldo    
             ,  projeto_valores.status as  status    
             ,  projeto_valores.user_insert as  user_insert    
             ,  projeto_valores.user_update as  user_update    
             ,  proj.descricao              as proj_descricao
             ,  dir.razao                   as dir_razao
             ,  cond.descricao              as cond_descricao
         from projeto_valores 
         inner join projetos proj  on proj.id_empresa = projeto_valores.id_empresa and proj.id = projeto_valores.id_projeto
         inner join usuarios dir  on dir.id_empresa = projeto_valores.id_empresa and dir.id = projeto_valores.id_diretor
         inner join condicoes_pagto cond on cond.id_empresa = projeto_valores.id_empresa and cond.id = projeto_valores.id_cond_pgto               
         order by  projeto_valores.id_empresa, projeto_valores.id 
         `;

        console.log('sqlStr', sqlStr);

        return db.manyOrNone(sqlStr);

    }

}


/* CRUD - INSERT */
exports.insertPro_Valor = function(pro_valor) {
    return db.oneOrNone('insert into projeto_valores ( id_empresa   ,  id_projeto   ,  id_diretor   ,  id_cond_pgto   ,  descricao   ,  emissao   ,  valor   ,  saldo   ,  status   ,  user_insert   ,  user_update  ) values( $1  ,  $3  ,  $4  ,  $5  ,  $6  ,  $7  ,  $8  ,  $9  ,  $10  ,  $11  ,  $12 )  returning * ', [pro_valor.id_empresa, pro_valor.id, pro_valor.id_projeto, pro_valor.id_diretor, pro_valor.id_cond_pgto, pro_valor.descricao, pro_valor.emissao, pro_valor.valor, pro_valor.saldo, pro_valor.status, pro_valor.user_insert, pro_valor.user_update]);
};

/* CRUD - UPDATE */
exports.updatePro_Valor = function(pro_valor) {
    return db.oneOrNone('update projeto_valores set  id_projeto = $3  ,  id_diretor = $4  ,  id_cond_pgto = $5  ,  descricao = $6  ,  emissao = $7  ,  valor = $8  ,  saldo = $9  ,  status = $10  ,  user_insert = $11  ,  user_update = $12  where  id_empresa = $1  and  id = $2   returning *', [pro_valor.id_empresa, pro_valor.id, pro_valor.id_projeto, pro_valor.id_diretor, pro_valor.id_cond_pgto, pro_valor.descricao, pro_valor.emissao, pro_valor.valor, pro_valor.saldo, pro_valor.status, pro_valor.user_insert, pro_valor.user_update]);
};

/* CRUD - DELETE */
exports.deletePro_Valor = function(id_empresa, id) {
    return db.oneOrNone('delete from projeto_valores where  id_empresa = $1  and  id = $2   ', [id_empresa, id]);
};