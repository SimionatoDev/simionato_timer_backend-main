/* DATA parametros */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Parametro) {
    return [
        Parametro.id_empresa,
        Parametro.modulo,
        Parametro.id_usuario,
        Parametro.parametro,
        Parametro.user_insert,
        Parametro.user_update,
    ];
};


/* CRUD GET */
exports.getParametro = function(id_empresa, modulo, assinatura, id_usuario) {
    const sqlStr = `select  
                           parametros.id_empresa  as  id_empresa 
                        ,  parametros.modulo      as  modulo 
                        ,  parametros.assinatura  as  assinatura 
                        ,  parametros.id_usuario  as  id_usuario 
                        ,  parametros.parametro   as  parametro 
                        ,  parametros.user_insert as  user_insert
                        ,  parametros.user_update as  user_update 
                           from parametros 
                           where  parametros.id_empresa = ${id_empresa}  and  parametros.modulo = '${modulo}' and  parametros.assinatura = '${assinatura}' and  parametros.id_usuario = ${id_usuario}  `;

    console.log('getParametro sqlStr', sqlStr);

    return db.manyOrNone(sqlStr, [id_empresa, modulo, assinatura, id_usuario]);
}

/* CRUD GET ALL*/
exports.getParametros = function(params) {

        if (params) {

            where = "";

            orderby = "";

            paginacao = "";


            if (params.orderby == 'Módulo') orderby = "order by parametros.id_empresa,parametros.modulo,parametros.assinatura";
            if (params.orderby == 'Usuário') orderby = "order by parametros.id_empresa,parametros.id_usuario,parametros.modulo,parametros.assinatura";


            if (params.id_empresa != 0) {
                if (where != "") where += " and ";
                where += `parametros.id_empresa = ${params.id_empresa}`;
            }
            if (params.modulo != "") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `parametros.modulo = '${params.modulo.trim()}'`;
                } else {
                    where += `parametros.modulo like '%${params.modulo.trim()}%'`;
                }
            }

            if (params.assinatura != "") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `parametros.assinatura = '${params.assinatura.trim()}'`;
                } else {
                    where += `parametros.assinatura like '%${params.assinatura.trim()}%'`;
                }
            }

            if (params.id_usuario != 0) {
                if (where != "") where += " and ";
                where += `parametros.id_usuario = ${params.id_usuario}`;
            }

            if (where != "") where = " where " + where;

            if (params.contador == 'S') {
                sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
                    FROM    parametros parametros
                    ${where} 
                    `;

                console.log('sqlStr', sqlStr);

                return db.one(sqlStr);

            } else {
                sqlStr = `select  
					parametros.id_empresa as  id_empresa    
					,  parametros.modulo as  modulo  
                    ,  parametros.assinatura as  assinatura  
					,  parametros.id_usuario as  id_usuario   
					,  parametros.parametro as  parametro  
					,  parametros.user_insert as  user_insert   
					,  parametros.user_update as  user_update     
					from parametros 
					${where}  ${orderby}  ${paginacao}
					`;

                console.log('sqlStr', sqlStr);


                return db.manyOrNone(sqlStr);
            }

        } else {
            return db.manyOrNone("select " +
                "   parametros.id_empresa as  id_empresa " +
                ",  parametros.modulo as  modulo " +
                ",  parametros.id_usuario as  id_usuario " +
                ",  parametros.parametro as  parametro " +
                ",  parametros.user_insert as  user_insert " +
                ",  parametros.user_update as  user_update " +
                "from parametros " +
                "order by id_empresa,modulo,assinatura,id_usuario ");
        }
    }
    /* CRUD - INSERT */
exports.insertParametro = function(parametro) {
    strSql = `insert into parametros (
		     id_empresa 
		 ,   modulo 
         ,   assinatura
		 ,   id_usuario 
		 ,   parametro 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${parametro.id_empresa} 
		 ,   '${parametro.modulo}'
         ,   '${parametro.assinatura}' 
		 ,   ${parametro.id_usuario} 
		 ,   '${parametro.parametro}' 
		 ,   ${parametro.user_insert} 
		 ,   ${parametro.user_update} 
		 ) 
 returning * `;
    return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
exports.updateParametro = function(parametro) {
    strSql = `update  parametros set  
		     parametro = '${parametro.parametro}' 
 		 ,   user_insert = ${parametro.user_insert} 
 		 ,   user_update = ${parametro.user_update} 
 		 where id_empresa = ${parametro.id_empresa} and  modulo = '${parametro.modulo}' and assinatura = '${parametro.assinatura}' and  id_usuario = ${parametro.id_usuario}  returning * `;
    console.log(strSql);
    return db.oneOrNone(strSql);
}


/* CRUD - DELETE */
exports.deleteParametro = function(id_empresa, modulo, assinatura, id_usuario) {
    strSql = `delete from parametros 
		 where id_empresa = ${id_empresa} and  modulo = '${modulo}' and assinatura = '${assinatura}' and  id_usuario = ${id_usuario}  `;
    return db.oneOrNone(strSql);
}