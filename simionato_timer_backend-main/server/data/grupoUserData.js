const db = require('../infra/database');

exports.getGrupoUser = function(id_empresa, id) {
    return db.oneOrNone('select * from grupos_user where id_empresa = $1 and id = $2 ', [id_empresa, id]);
};

exports.getGrupoUsers = function(params) {

    if (params) {

        where = "";

        orderby = "";

        paginacao = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Código') {

            console.log('Código', params.orderby);
            orderby = "order by grupo.id_empresa, grupo.id";
        }

        if (params.orderby == "Grupo") orderby = "order by grupo.id_empresa,grupo.grupo";


        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `grupo.id_empresa = ${params.id_empresa}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += ` grupo.id = ${params.id} `;
        }


        if (params.grupo != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += ` grupo.grupo = '${params.grupo.trim()}' `;
            } else {
                where += `(grupo.grupo like '%${params.grupo.trim()}%') `;
            }
        }

        if (where != "") where = " where " + where;

        if (orderby == "") orderby = " order by grupo.id_empresa, grupo.id ";

        if (params.contador == 'S') {

            sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
            FROM  grupos_user grupo  ${where}  
                 `;

            console.log('sqlStr', sqlStr);

            return db.one(sqlStr);

        } else {
            sqlStr = `SELECT        grupo.id_empresa,grupo.id, grupo.grupo
                  FROM          grupos_user grupo
                 ${where}  ${orderby}  
                 `;

            console.log('sqlStr', sqlStr);

            return db.manyOrNone(sqlStr);
        }
    } else {
        return db.manyOrNone('select * from grupos_user order by id_empresa,id');
    }
};

exports.insertGrupoUser = function(grupoUser) {

    return db.oneOrNone('insert into grupos_user (id_empresa, grupo, user_insert, user_update) values ($1,$3,$4,$5) returning * ', [grupoUser.id_empresa, grupoUser.id, grupoUser.grupo, grupoUser.user_insert, grupoUser.user_update]);

};

exports.updateGrupoUser = function(grupoUser) {
    return db.oneOrNone('update grupos_user set grupo = $3, user_insert = $4 , user_update  = $5 where id_empresa = $1 and id = $2 returning * ', [grupoUser.id_empresa, grupoUser.id, grupoUser.grupo, grupoUser.user_insert, grupoUser.user_update]);
};

exports.deleteGrupoUser = function(id_empresa, id) {
    return db.none('delete from grupos_user where id_empresa = $1 and id = $2 ', [id_empresa, id]);
};