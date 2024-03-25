const db = require('../infra/database');

exports.getMotivoApo = function(id_empresa, codigo) {
    return db.oneOrNone('select * from motivos_apo where id_empresa = $1 and codigo = $2 ', [id_empresa, codigo]);
};

exports.getMotivoApos = function(params) {
    if (params) {

        where = "";

        orderby = "";

        paginacao = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Código') {

            console.log('Código', params.orderby);
            orderby = "order by mot.id_empresa, mot.codigo";
        }

        if (params.orderby == "Motivo") orderby = "order by mot.id_empresa,mot.motivo";


        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `mot.id_empresa = ${params.id_empresa}`;
        }

        if (params.codigo != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += ` mot.codigo = '${params.codigo.trim()}' `;
            } else {
                where += `(right(mot.codigo,${params.codigo.trim().length}) like '%${params.codigo.trim()}%') `;
            }
        }

        if (params.analitico != "") {
            if (where != "") where += " and ";
            where += ` right(mot.codigo,3) <> '000' `;
        }

        if (params.sintetico != "") {
            if (where != "") where += " and ";
            where += ` right(mot.codigo,3) = '000' `;
        }

        if (params.motivo != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += ` mot.motivo = '${params.motivo.trim()}' `;
            } else {
                where += `(mot.motivo like '%${params.motivo.trim()}%') `;
            }
        }

        if (params.controle == 'N') {
            if (where != "") where += " and ";
            where += ` left(mot.codigo,3) < '998' `;
        }

        if (params.controle == 'S') {
            where = ` left(mot.codigo,3) >= '998' `;
        }

        if (params.pagina != 0) {
            paginacao = `limit ${params.tamPagina} offset ((${params.pagina} - 1) * ${params.tamPagina})`;
        }

        if (where != "") where = " where " + where;

        if (orderby == "") orderby = " order by mot.id_empresa,mot.codigo, mot.motivo ";

        if (params.contador == 'S') {

            sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
            FROM          motivos_apo mot
            ${where}  
            `;

            console.log('sqlStr', sqlStr);

            return db.one(sqlStr);

        } else {

            sqlStr = `SELECT        mot.id_empresa,mot.codigo, mot.motivo,
                                case
                                    when mot.produtivo = 'S' then 'SIM'
                                    else                          'NÃO'
                                end as produtivo 
                  FROM          motivos_apo mot
                 ${where}  ${orderby}   ${paginacao}
         `;

            console.log('sqlStr', sqlStr);

            return db.manyOrNone(sqlStr);

        }



    } else {
        return db.manyOrNone('select * from motivos_apo order by id_empresa,codigo');
    }
};

exports.insertMotivoApo = function(motivoApo) {

    return db.oneOrNone('insert into motivos_apo (id_empresa,codigo,motivo,produtivo,user_insert,user_update) values ($1,$2,$3,$4,$5,$6) returning * ', [motivoApo.id_empresa, motivoApo.codigo, motivoApo.motivo, motivoApo.produtivo, motivoApo.user_insert, motivoApo.user_update]);

};

exports.updateMotivoApo = function(motivoApo) {
    return db.oneOrNone('update motivos_apo set motivo = $3, produtivo = $4, user_insert = $5, user_update = $6 where id_empresa = $1 and codigo = $2 returning * ', [motivoApo.id_empresa, motivoApo.codigo, motivoApo.motivo, motivoApo.produtivo, motivoApo.user_insert, motivoApo.user_update]);
};

exports.deleteMotivoApo = function(id_empresa, codigo) {
    return db.none('delete from motivos_apo where id_empresa = $1 and codigo = $2 ', [id_empresa, codigo]);
};