/* DATA condicoes_pagto */
const db = require('../infra/database');

/* CRUD GET */
exports.getCondicao = function(id_empresa, id) {
    return db.oneOrNone('select ' +
        "   condicoes_pagto.id_empresa as  id_empresa " +
        ",  condicoes_pagto.id as  id " +
        ",  condicoes_pagto.np as  np " +
        ",  condicoes_pagto.descricao as  descricao " +
        ",  condicoes_pagto.parcelas  as  parcelas " +
        ",  condicoes_pagto.dia as  dia " +
        ",  condicoes_pagto.user_insert as  user_insert " +
        ",  condicoes_pagto.user_update as  user_update " + '  from condicoes_pagto where  condicoes_pagto.id_empresa = $1  and  condicoes_pagto.id = $2   ', [id_empresa, id]);
}

/* CRUD GET ALL*/
exports.getCondicoes = function(params) {

    if (params) {

        where = "";

        orderby = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Código') {

            console.log('Código', params.orderby);
            orderby = "order by condicoes_pagto.id";
        }

        if (params.orderby == "Descrição") orderby = "order by condicoes_pagto.descricao";

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `condicoes_pagto.id_empresa = ${params.id_empresa}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += `condicoes_pagto.id = ${params.id}`;
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
						condicoes_pagto.id_empresa as  id_empresa  
						,  condicoes_pagto.id as  id 
						,  condicoes_pagto.descricao as  descricao
                        ,  condicoes_pagto.np        as  np 
						,  condicoes_pagto.parcelas as  parcelas 
						,  condicoes_pagto.dia as  dia 
						,  condicoes_pagto.user_insert as  user_insert  
						,  condicoes_pagto.user_update as  user_update 
						from condicoes_pagto 
   		                ${where}  ${orderby}  
		          `;
        console.log('sqlStr', sqlStr);


        return db.manyOrNone(sqlStr);

    } else {
        return db.manyOrNone('select ' +
            "   condicoes_pagto.id_empresa as  id_empresa " +
            ",  condicoes_pagto.id as  id " +
            ",  condicoes_pagto.descricao as  descricao " +
            ",  condicoes_pagto.np        as  np " +
            ",  condicoes_pagto.parcelas as  parcelas " +
            ",  condicoes_pagto.dia as  dia " +
            ",  condicoes_pagto.user_insert as  user_insert " +
            ",  condicoes_pagto.user_update as  user_update " + '  from condicoes_pagto order by id_empresa,id');
    }
}

/* CRUD - INSERT */
exports.insertCondicao = function(condicao) {
    return db.oneOrNone('insert into condicoes_pagto ( id_empresa   ,  descricao   ,  np , parcelas   ,  dia   ,  user_insert   ,  user_update  ) values( $1  ,  $3  ,  $4  ,  $5  ,  $6  ,  $7, $8 )  returning * ', [condicao.id_empresa, condicao.id, condicao.descricao, condicao.np, condicao.parcelas, condicao.dia, condicao.user_insert, condicao.user_update]);
};
/* CRUD - UPDATE */
exports.updateCondicao = function(condicao) {
    return db.oneOrNone('update condicoes_pagto set  descricao = $3  ,  np = $4 , parcelas = $5  ,  dia = $6  ,  user_insert = $7  ,  user_update = $8  where  id_empresa = $1  and  id = $2   returning *', [condicao.id_empresa, condicao.id, condicao.descricao, condicao.np, condicao.parcelas, condicao.dia, condicao.user_insert, condicao.user_update]);
};
/* CRUD - DELETE */
exports.deleteCondicao = function(id_empresa, id) {
    return db.oneOrNone('delete from condicoes_pagto where  id_empresa = $1  and  id = $2   ', [id_empresa, id]);
};