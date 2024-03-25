/* DATA atividades */
const db = require('../infra/database');

function getCampos(auditoria) {
    return [
        auditoria.id_empresa,
        auditoria.id,
        auditoria.tabela,
        auditoria.campo,
        auditoria.chave,
        auditoria.old_data,
        auditoria.new_data,
        auditoria.data.replace('GMT-0300', '')
        .replace('T', ' ')
        .replace('Z', ''),
        auditoria.descricao,
        auditoria.user_insert,
        auditoria.user_update,
    ];

}

/* CRUD GET */
exports.getAtividade = function(id_empresa, id) {
    strSelec = `SELECT 
                     audi.id_empresa
                    ,audi.id
                    ,audi.tabela
                    ,audi.campo
                    ,audi.chave
                    ,audi.old_data
                    ,audi.new_data
                    ,audi.data
                    ,audi.descricao
                    ,audi.user_insert
                    ,audi.user_update
                    ,usu.razao as user_name	
                FROM auditorias audi
                INNER JOIN usuarios usu on usu.id_empresa = audi.id_empresa and usu.id = audi.user_insert
                WHERE  audi.id_empresa = ${id_empresa} and audi.id = ${id}`;
    return db.oneOrNone(strSelec);

}

/* CRUD GET ALL*/
exports.getAuditorias = function(params) {
        if (params) {
            where = "";

            orderby = "";

            console.log('params', params);

            if (params.orderby == 'tabela') {
                orderby = "order by audi.id_empresa,audi.tabela,audi.data";
            }

            if (params.orderby == 'campo') {
                orderby = "order by audi.id_empresa,audi.campo,audi.data";
            }
            if (params.id_empresa != 0) {
                if (where != "") where += " and ";
                where += `audi.id_empresa = ${params.id_empresa}`;
            }

            if (params.id != 0) {
                if (where != "") where += " and ";
                where += `audi.id = ${params.id}`;
            }
            if (params.tabela != "") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `audi.tabela = '${params.tabela.trim()}'`;
                } else {
                    where += `audi.tabela like '%${params.tabela.trim()}%'`;
                }
            }

            if (params.campo != "") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `audi.campo = '${params.campo.trim()}'`;
                } else {
                    where += `audi.campo like '%${params.campo.trim()}%'`;
                }
            }

            if (where != "") where = " where " + where;

            sqlStr = `SELECT 
                     audi.id_empresa
                    ,audi.id
                    ,audi.tabela
                    ,audi.campo
                    ,audi.chave
                    ,audi.old_data
                    ,audi.new_data
                    ,audi.data
                    ,audi.descricao
                    ,audi.user_insert
                    ,audi.user_update
                    ,usu.razao as user_name	
                FROM auditorias audi
                INNER JOIN usuarios usu on usu.id_empresa = audi.id_empresa and usu.id = audi.user_insert
					 ${where}  ${orderby}  
			 `;

            console.log('sqlStr=>', sqlStr);

            return db.manyOrNone(sqlStr);

        } else {
            return db.manyOrNone('select * from auditorias order by id_empresa,id');
        }
    }
    /* CRUD - INSERT */
exports.insertAuditoria = function(auditoria) {
    return db.oneOrNone('insert into auditorias(id_empresa,  tabela, campo, chave, old_data, new_data, data, descricao, user_insert, user_update)  values( $1,$3,$4,$5,$6,$7,$8,$9,$10,$11)  returning * ', getCampos(auditoria));
};
/* CRUD - UPDATE */
exports.updateAuditoria = function(auditoria) {
    return db.oneOrNone('update auditorias set tabela = $3, campo = $4,chave = $5,old_data = $6,new_data = $7,data = $8,descricao = $9,user_insert = $10,user_update = $11 where  id_empresa = $1  and  id = $2   returning *', getCampos(auditoria));
};

/* CRUD - DELETE */
exports.deleteAuditoria = function(id_empresa, id) {
    return db.oneOrNone('delete from auditorias where  id_empresa = $1  and  id = $2   ', [id_empresa, id]);
};