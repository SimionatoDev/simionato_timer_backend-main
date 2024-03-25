const db = require('../infra/database');
const shared = require('../util/shared');

function getCampos(feriado) {
    return [
        feriado.id_empresa,
        feriado.id_usuario,
        feriado.id_tipo,
        shared.formatDateYYYYMMDD(feriado.data),
        feriado.id_nivel,
        feriado.descricao,
        feriado.nlanc_manha,
        feriado.nlanc_tarde,
        feriado.user_insert,
        feriado.user_update
    ]
};
exports.getFeriado = function(id_empresa, id_usuario, id_tipo, data) {
    sqlStr = `Select 
                fer.id_empresa     
                ,fer.id_usuario     
                ,fer.id_tipo     
                ,to_char(fer.data,'DD/MM/YYYY') as data     
                ,fer.id_nivel     
                ,fer.descricao   
                ,fer.nlanc_manha
                ,fer.nlanc_tarde
                ,fer.user_insert     
                ,fer.user_update 
                ,COALESCE (usu.razao,'')     as usu_nome
                from feriados fer
                left join usuarios usu on usu.id_empresa = fer.id_empresa and usu.id = fer.id_usuario  
                where fer.id_empresa = ${id_empresa} and fer.id_usuario = ${id_usuario} and fer.id_tipo = ${id_tipo} and to_char(fer.data,'DD/MM/YYYY') = '${data}' `;

    console.log("getFeriado", sqlStr);
    return db.oneOrNone(sqlStr);
};

exports.getPonte = function(id_empresa, data) {

    sqlStr = `Select distinct
                fer.id_empresa     
                ,to_char(fer.data,'DD/MM/YYYY') as data     
                ,fer.descricao     
                from feriados fer 
                where fer.id_empresa = ${id_empresa} and id_tipo = 2 and to_char(fer.data,'DD/MM/YYYY') = '${data}' `;

    console.log("getPonte", sqlStr);
    return db.oneOrNone(sqlStr);
};

exports.getFeriados = function(params) {

    if (params) {

        where = "";

        orderby = "";

        paginacao = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Data') {
            if (params.formato == '') {
                orderby = "order by fer.id_empresa,fer.data,fer.id_usuario,fer.descricao";
            } else {
                orderby = "order by fer.id_empresa,fer.data ";
            }
        }

        if (params.orderby == "Descrição") {
            if (params.formato == '') {
                orderby = "order by fer.id_empresa,fer.descricao";
            } else {
                orderby = "order by fer.id_empresa,fer.descricao";
            }
        }

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `fer.id_empresa = ${params.id_empresa}`;
        }

        if (params.id_tipo != 0) {
            if (where != "") where += " and ";
            where += `fer.id_tipo = ${params.id_tipo}`;
        }

        if (params.id_usuario != 0) {
            if (where != "") where += " and ";
            where += ` fer.id_usuario  = ${params.id_usuario} `;
        }

        if (params.data != "") {
            if (where != "") where += " and ";
            where += ` to_char(fer.data,'DD/MM/YYYY') = '${params.data}' `;
        }

        if (params.descricao != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += ` fer.descricao = '${params.descricao.trim()}' `;
            } else {
                where += `(fer.descricao like '%${params.descricao.trim()}%') `;
            }
        }

        if (params.id_nivel != 0) {
            if (where != "") where += " and ";
            where += ` fer.id_nivel = ${params.nivel} `;
        }

        if (params.pagina != 0) {
            paginacao = `limit ${params.tamPagina} offset ((${params.pagina} - 1) * ${params.tamPagina})`;
        }


        if (where != "") where = " where " + where;

        if (orderby == "") orderby = " order by fer.id_empresa,fer.data ";

        if (params.contador == 'S') {
            sqlStr = ` SELECT  COALESCE(COUNT(*),0) as total 
                       FROM    feriados fer    
              ${where} 
         `;

            console.log('sqlStr', sqlStr);

            return db.one(sqlStr);

        } else {

            if (params.formato == '') {
                sqlStr = `  Select 
                         fer.id_empresa     
                        ,fer.id_usuario     
                        ,fer.id_tipo     
                        ,to_char(fer.data,'DD/MM/YYYY') as data     
                        ,fer.id_nivel     
                        ,fer.descricao    
                        ,fer.nlanc_manha
                        ,fer.nlanc_tarde 
                        ,fer.user_insert     
                        ,fer.user_update 
                        ,COALESCE (usu.razao,'')     as usu_nome
                        from feriados fer
                        left join usuarios usu on usu.id_empresa = fer.id_empresa and usu.id = fer.id_usuario  
                         ${where}  ${orderby}   ${paginacao} 
            `;
            } else {
                sqlStr = `Select 
                         fer.id_empresa     
                        ,to_char(fer.data,'DD/MM/YYYY') as data  
                        ,fer.descricao
                        ,COALESCE(count(*),0) as TOTAL    
                        from feriados fer
                         ${where}  
                         GROUP   BY FER.id_empresa , FER.data ,FER.descricao ${orderby}   ${paginacao} 
            `;
            }
            console.log('Feriados:', sqlStr);

            return db.manyOrNone(sqlStr);

        };
    } else {
        return db.manyOrNone('select * from feriados order by id_empresa,data');
    };

}
exports.insertFeriado = function(feriado) {

    console.log(feriado);

    const strInsert = "insert into feriados(id_empresa ,id_usuario , id_tipo , data , id_nivel ,  descricao , nlanc_manha , nlanc_tarde,user_insert, user_update ) " +
        " values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) returning * ";

    console.log("strInsert Feriado", strInsert);
    return db.oneOrNone(strInsert, getCampos(feriado));

};
exports.updateFeriado = function(feriado) {
    sqlUpdate = 'update feriados set ' +
        ' id_nivel        =       $5       ,   ' +
        ' descricao       =       $6       ,   ' +
        ' user_update     =       $8       ,   ' +
        ' where id_empresa = $1 and id_usuario = $2 and id_tipo = $3 data = $s4 returning * ';

    console.log(sqlUpdate, getCampos(feriado));
    return db.oneOrNone(sqlUpdate, getCampos(feriado));

}
exports.updatePonte = function(ponte) {
    sqlUpdate = `update feriados set  
         descricao       =       '${ponte.descricao}' 
         where id_empresa = ${ponte.id_empresa}  and id_tipo = 2 and to_char(data,'YYYY-MM-DD') = '${shared.formatDateYYYYMMDD(ponte.data)}' returning * `;

    console.log(sqlUpdate);
    return db.manyOrNone(sqlUpdate);
}

exports.deleteFeriado = function(id_empresa, id_usuario, id_tipo, data) {
    const strDelete = `delete from feriados where id_empresa = ${id_empresa} and id_usuario = ${id_usuario} and id_tipo = ${id_tipo} and to_char(data,'DD/MM/YYYY') = '${data}' `;
    console.log('deleteFeriado', strDelete);
    return db.oneOrNone(strDelete);
};

exports.deletePonte = function(id_empresa, data) {
    const strDelete = `delete from feriados where id_empresa = ${id_empresa} and id_tipo = 2 and to_char(data,'DD/MM/YYYY') = '${data}' `;
    console.log('deletePonte', strDelete);
    return db.oneOrNone(strDelete);
};