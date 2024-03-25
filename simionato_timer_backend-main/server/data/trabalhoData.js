/* DATA trabalho */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Trabalho) {
    return [
        Trabalho.id_empresa,
        Trabalho.id_projeto,
        Trabalho.id_atividade,
        Trabalho.id,
        Trabalho.id_responsavel,
        Trabalho.horas_prog,
        Trabalho.horas_cons,
        Trabalho.saldo_hrs,
        Trabalho.descricao,
        Trabalho.situacao,
        Trabalho.user_insert,
        Trabalho.user_update,
    ];
};


/* CRUD GET */
exports.getTrabalho = function(id_empresa, id_projeto, id_atividade, id) {
        sqlStr = ` select    
                trabalhos.id_empresa     as  id_empresa    
             ,  trabalhos.id_projeto     as  id_projeto    
             ,  trabalhos.id_atividade   as  id_atividade    
             ,  trabalhos.id             as  id    
             ,  trabalhos.id_responsavel as  id_responsavel    
             ,  trabalhos.horas_prog     as  horas_prog    
             ,  trabalhos.horas_cons     as  horas_cons    
             ,  trabalhos.saldo_hrs      as  saldo_hrs    
             ,  trabalhos.descricao      as  descricao    
             ,  trabalhos.situacao       as  situacao    
             ,  trabalhos.user_insert    as  user_insert    
             ,  trabalhos.user_update    as  user_update    
             ,  ativ.obs                 as  ativ_desc    
             ,  resp.razao               as  resp_nome    
             from trabalhos    
             inner join atividades ativ on ativ.id_empresa = trabalhos.id_empresa and ativ.id = trabalhos.id_atividade    
             inner join usuarios resp   on resp.id_empresa = trabalhos.id_empresa and resp.id = trabalhos.id_responsavel    
             where  trabalhos.id_empresa = ${id_empresa}  and trabalhos.id_projeto = ${id_projeto} and  trabalhos.id_atividade = ${id_atividade}  and  trabalhos.id = ${id}  `;

        console.log("getTrabalho", sqlStr)
        return db.oneOrNone(sqlStr);

    }
    /* CRUD GET ALL*/
exports.getTrabalhos = function(params) {

    if (params) {

        inner_projeto = "";

        where = "";

        orderby = "";

        paginacao = "";

        console.log('trabalhos => params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'id') orderby = `order by trabalhos.id `;

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `trabalhos.id_empresa = ${params.id_empresa}`;
        }

        if (params.id_projeto != 0) {
            if (where != "") where += " and ";
            where += `trabalhos.id_projeto = ${params.id_projeto}`;
        }

        if (params.id_atividade != 0) {
            if (where != "") where += " and ";
            where += `trabalhos.id_atividade = ${params.id_atividade}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += `trabalhos.id = ${params.id}`;
        }

        if (params.id_responsavel != 0) {
            if (where != "") where += " and ";
            where += `trabalhos.id_responsavel = ${params.id_responsavel}`;
        }

        if (params.pagina != 0) {
            paginacao = `limit ${params.tamPagina} offset ((${params.pagina} - 1) * ${params.tamPagina})`;
        }


        if (where != "") where = " where " + where;

        if (params.contador == 'S') {
            sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
			    FROM  trabalhos 
                inner join atividades ativ on ativ.id_empresa = trabalhos.id_empresa and ativ.id = trabalhos.id_atividade  
                inner join projetos   proj on proj.id_empresa = trabalhos.id_empresa and proj.id = trabalhos.id_projeto    
                inner join clientes   cli  on cli.id_empresa  = trabalhos.id_empresa and cli.id  = ativ.id_subcliente
                inner join usuarios   resp on resp.id_empresa = trabalhos.id_empresa and resp.id = trabalhos.id_responsavel 
			    ${where} 
			`;
            console.log('sqlStr', sqlStr);
            return db.oneOrNone(sqlStr);
        } else {
            sqlStr = `SELECT 
                   trabalhos.id_empresa   as  id_empresa  
                ,  trabalhos.id_atividade as  id_atividade  
                ,  trabalhos.id_projeto   as  id_projeto  
                ,  trabalhos.id as  id  
                ,  trabalhos.id_responsavel as  id_responsavel  
                ,  trabalhos.horas_prog as  horas_prog  
                ,  trabalhos.horas_cons as  horas_cons  
                ,  trabalhos.saldo_hrs as  saldo_hrs  
                ,  trabalhos.descricao as  descricao  
                ,  trabalhos.situacao as  situacao  
                ,  trabalhos.user_insert as  user_insert  
                ,  trabalhos.user_update as  user_update  
                ,  ativ.obs as ativ_obs   
                ,  resp.razao     as resp_nome   
                ,  proj.id        as proj_id     
                ,  proj.descricao as proj_desc   
                from trabalhos 
                inner join atividades ativ on ativ.id_empresa = trabalhos.id_empresa and ativ.id = trabalhos.id_atividade  
                inner join projetos   proj on proj.id_empresa = trabalhos.id_empresa and proj.id = trabalhos.id_projeto    
                inner join clientes   cli  on cli.id_empresa  = trabalhos.id_empresa and cli.id  = ativ.id_subcliente
                inner join usuarios   resp   on resp.id_empresa = trabalhos.id_empresa and resp.id = trabalhos.id_responsavel 
                ${where} ${orderby}
                `;
            console.log('sqlStr', sqlStr);
            return db.manyOrNone(sqlStr);
        }
    } else {
        return db.manyOrNone("select " +
            "   trabalhos.id_empresa as  id_empresa " +
            ",  trabalhos.id_atividade as  id_atividade " +
            ",  trabalhos.id as  id " +
            ",  trabalhos.id_responsavel as  id_responsavel " +
            ",  trabalhos.horas_prog as  horas_prog " +
            ",  trabalhos.horas_cons as  horas_cons " +
            ",  trabalhos.saldo_hrs as  saldo_hrs " +
            ",  trabalhos.descricao as  descricao " +
            ",  trabalhos.situacao as  situacao " +
            ",  trabalhos.user_insert as  user_insert " +
            ",  trabalhos.user_update as  user_update " +
            "from trabalhos" +
            "order by trabalhos.id_empresa,trabalhos.id ");
    }
}

/* CRUD - INSERT */
exports.insertTrabalho = function(trabalho) {
    strSql = `insert into trabalhos (
		     id_empresa
		 ,   id_projeto  
		 ,   id_atividade
		 ,   id_responsavel 
		 ,   horas_prog 
		 ,   horas_cons 
		 ,   saldo_hrs 
		 ,   descricao 
		 ,   situacao 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${trabalho.id_empresa} 
         ,   ${trabalho.id_projeto}     
		 ,   ${trabalho.id_atividade} 
		 ,   ${trabalho.id_responsavel} 
		 ,   ${trabalho.horas_prog} 
		 ,   ${trabalho.horas_cons} 
		 ,   ${trabalho.saldo_hrs} 
		 ,   '${trabalho.descricao}' 
		 ,   '${trabalho.situacao}' 
		 ,   ${trabalho.user_insert} 
		 ,   ${trabalho.user_update} 
		 ) 
 returning * `;
    return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
exports.updateTrabalho = function(trabalho) {
    strSql = `update  trabalhos set  
		     id_responsavel = ${trabalho.id_responsavel} 
 		 ,   descricao = '${trabalho.descricao}' 
 		 ,   situacao = '${trabalho.situacao}' 
 		 ,   user_insert = ${trabalho.user_insert} 
 		 ,   user_update = ${trabalho.user_update} 
 		 where id_empresa = ${trabalho.id_empresa} and  id_projeto = ${trabalho.id_projeto} and id_atividade = ${trabalho.id_atividade} and  id = ${trabalho.id}  returning * `;
    return db.oneOrNone(strSql);
}


/* CRUD - DELETE */
exports.deleteTrabalho = function(id_empresa, id_projeto, id_atividade, id) {
    strSql = `delete from trabalhos 
    where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and id_atividade = ${id_atividade} and  id = ${id}  `;
    return db.oneOrNone(strSql);
}