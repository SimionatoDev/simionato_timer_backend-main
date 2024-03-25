/* DATA estruturas */
const db = require('../infra/database');


/* CRUD GET */
exports.getEstrutura = function(id_empresa, conta, versao, subconta) {
    return db.oneOrNone('select * from estruturas where  id_empresa = $1  and  conta = $2  and versao  = $3 and  subconta = $4   ', [id_empresa, conta, versao, subconta]);
};


/* CRUD GET */
exports.getConta = function(id_empresa, conta, versao) {
    return db.oneOrNone('select * from estruturas where  id_empresa = $1  and  conta = $2 and versao = $3 and nivel = 1 ', [id_empresa, conta, versao]);
};

/* CRUD GET ALL WIHT PARAMS*/
exports.getEstruturas = function(params) {
    if (params) {

        console.log(params);

        where = "";

        orderby = "";

        orderby = "";

        paginacao = "";

        console.log('params Pesquisa Estrutura: ', params);

        console.log('params.orderby', params.orderby)

        if (params.subcontas) {

            orderby = "order by estru.conta,estru.versao,estru.subconta";

            const nivel01 = parseInt(params.nivel) + 1;
            const nivel02 = parseInt(params.nivel) * 2;

            if (params.id_empresa != 0) {
                if (where != "") where += " and ";
                where += `estru.id_empresa = ${params.id_empresa}`;
            }

            if (params.versao.trim() != '') {
                if (where != "") where += " and ";
                where += `estru.versao = '${params.versao}'`;
            }

            if (params.status != 0) {
                if (where != "") where += " and ";
                where += `estru.status = ${params.status}`;
            }

            //
            //if (params.especiais == 'N') {
            //    if (where != "") where += " and ";
            //    where += `estru.conta  < '${params.status}'`;
            //}

            if (where != "") where += " and ";
            where += `estru.nivel = ${nivel01} and left(estru.subconta,${nivel02}) = '${params.subconta.trim()}'`;


        } else {

            if (params.orderby == 'Conta') orderby = "order by estru.id_empresa,estru.conta,estru.versao,estru.subconta";
            if (params.orderby == "SubConta") orderby = "order by estru.id_empresa,estru.conta,estru.versao,estru.subconta";
            if (params.orderby == "Descrição") orderby = "order by estru.descricao";


            if (params.id_empresa != 0) {
                if (where != "") where += " and ";
                where += `estru.id_empresa = ${params.id_empresa}`;
            }

            if (params.conta != "") {
                if (where != "") where += " and ";
                where += `estru.conta = '${params.conta.trim()}'`;
            }

            if (params.versao != "") {
                if (where != "") where += " and ";
                where += `estru.versao = '${params.versao.trim()}'`;
            }

            if (params.subconta != "") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `estru.subconta = '${params.subconta.trim()}'`;

                } else {
                    where += `estru.subconta like '%${params.subconta.trim()}%'`;
                }
            }
            if (params.status != 0) {
                if (where != "") where += " and ";
                where += `estru.status = ${params.status}`;
            }

            if (params.descricao != "") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `estru.descricao = '${params.descricao.trim()}'`;
                } else {
                    where += `estru.descricao like '%${params.descricao.trim()}%'`;
                }

            }

            if (params.nivel != 0) {
                if (where != "") where += " and ";
                where += `estru.nivel = ${params.nivel}`;
            }

            if (params.projeto_in == "S") {
                if (where != "") where += " and ";
                where += ` (exists(select ativ.id from atividades ativ where  ativ.id_empresa = estru.id_empresa and  ativ.conta = estru.conta and ativ.nivel = 1 and ativ.id_projeto = ${params.id_projeto}))`;
            }

            if (params.projeto_off == "S") {
                if (where != "") where += " and ";
                where += ` not(exists(select ativ.id from atividades ativ where  ativ.id_empresa = estru.id_empresa and  ativ.conta = estru.conta and ativ.nivel = 1 and ativ.id_projeto = ${params.id_projeto}))`;
            }


        }

        if (params.controle == 'N') {
            if (where != "") where += " and ";
            where += ` estru.conta < '90' `;
        }

        if (params.controle == 'S') {
            where = ` estru.conta >= '90' `;
        }

        if (params.pagina != 0) {
            paginacao = `limit ${params.tamPagina} offset ((${params.pagina} - 1) * ${params.tamPagina})`;
        }

        if (where != "") where = " where " + where;

        sqlStr = `SELECT      estru.*
                  FROM        estruturas estru
                 ${where}  ${orderby}  ${paginacao}
         `;

        console.log('get estrutura sqlStr', sqlStr);

        return db.manyOrNone(sqlStr);

    } else {
        return db.manyOrNone('select * from estruturas order by id_empresa,conta,versao,subconta');
    }
};
/* CRUD - INSERT */
exports.insertEstrutura = function(estrutura) {
    console.log(estrutura)
    return db.oneOrNone('insert into  estruturas ( id_empresa ,conta, versao , subconta,descricao,nivel,nivel_maxi,tipo,controle,user_insert,user_update, status, id_usuario) values( $1  ,  $2  ,  $3  ,  $4  ,   $5  ,   $6  ,  $7  ,  $8  , $9 , $10, $11, $12, $13 ) returning * ', [estrutura.id_empresa, estrutura.conta, estrutura.versao, estrutura.subconta, estrutura.descricao, estrutura.nivel, estrutura.nivel_maxi, estrutura.tipo, estrutura.controle, estrutura.user_insert, estrutura.user_update, estrutura.status, estrutura.id_usuario]);
};

/* CRUD - UPDATE */
exports.updateEstrutura = function(estrutura) {
    console.log("Alteração", estrutura);
    return db.oneOrNone('update estruturas set  descricao = $5  ,  nivel = $6  ,  nivel_maxi = $7  ,  tipo = $8  ,  controle = $9 , user_insert = $10  ,  user_update = $11, status = $12 , id_usuario = $13 where  id_empresa = $1  and  conta = $2  and  versao = $3 and subconta = $4  returning * ', [estrutura.id_empresa, estrutura.conta, estrutura.versao, estrutura.subconta, estrutura.descricao, estrutura.nivel, estrutura.nivel_maxi, estrutura.tipo, estrutura.controle, estrutura.user_insert, estrutura.user_update, estrutura.status, estrutura.id_usuario]);
};


/* CRUD - DELETE */
exports.deleteEstrutura = function(id_empresa, conta, versao, subconta) {
    return db.oneOrNone('delete from estruturas where  id_empresa = $1  and  conta = $2  and versao = $3 and  subconta = $4   ', [id_empresa, conta, versao, subconta]);
};

exports.deleteAllEstrutura = function(id_empresa, conta, versao) {
    return db.oneOrNone('delete from estruturas where  id_empresa = $1  and  conta = $2  and versao = $3 ', [id_empresa, conta, versao]);
};

exports.saveAllEstrutura = function(estruturas) {
    strVirgula = '';
    strCabec = 'insert into estruturas( ' +
        ' id_empresa ' +
        ',conta ' +
        ',versao ' +
        ',subconta ' +
        ',descricao ' +
        ',nivel ' +
        ',nivel_maxi ' +
        ',tipo ' +
        ',controle ' +
        ',user_insert ' +
        ',user_update ' +
        ',status      ' +
        ',id_usuario ) ';
    strvalues = ' values ';

    estruturas.forEach(estrutura => {
        strvalues += ` ${strVirgula} `;
        strvalues += `( 
           ${estrutura.id_empresa},
          '${estrutura.conta}',
          '${estrutura.versao}',
          '${estrutura.subconta}',
          '${estrutura.descricao}',
           ${estrutura.nivel} ,
           ${estrutura.nivel_maxi} ,
          '${estrutura.tipo}',
          '${estrutura.controle}',
           ${estrutura.user_insert},
           ${estrutura.user_update},
           ${estrutura.status},  
           ${estrutura.id_usuario} 
        )`;
        strVirgula = ','
    });
    console.log('Atualizado Estrutura', strCabec, strvalues);
    return db.oneOrNone(strCabec + strvalues);
}


/* CRUD - LAST CONTA */
exports.lastConta = function(id_empresa) {
    const strSel = `select max(conta) from estruturas where id_empresa = ${id_empresa} and conta < '90' `
    return db.oneOrNone(strSel);
};

/* CRUD - LAST SUBCONTA */
exports.lastSubConta = function(id_empresa, conta, versao, subconta, nivel) {
    const par = (nivel - 1) * 2;
    const str = `select max(subconta) from estruturas where id_empresa = ${id_empresa} and versao = '${versao}' and nivel = ${nivel} and left(subconta,${par}) = '${subconta.trim()}' `;
    console.log(str);
    return db.oneOrNone(str);
};


/* CRUD - LAST SUBCONTA */
exports.mudaStatus = function(id_empresa, conta, versao, status) {
    const str = `update estruturas set status = ${status} where id_empresa = ${id_empresa} and conta  = '${conta}' and versao = '${versao}' `;
    console.log(str);
    return db.oneOrNone(str);
};

/* GERA UMA ESTRUTURA HEADER */
exports.Estrutura_header = function(id_empresa, conta, versao, controle, descricao) {
    const estrutura = {
        id_empresa: id_empresa,
        conta: conta,
        versao: '0101',
        subconta: conta,
        descricao: 'Cópia: ' + descricao.trim(),
        nivel: 1,
        nivel_maxi: 7,
        tipo: 'C',
        controle: controle,
        user_insert: 1,
        user_update: 0,
        status: 1,
        id_usuario: 0
    }
    return estrutura;
};



/* PEGA A ESTRUTURA DA CONTA */
exports.getEstrutura_Histo = function(par) {
    const str = `SELECT * FROM function_histo(${par.id_empresa},'${par.conta}','${par.subconta.trim()}','${par.versao}',${par.nivel});`;
    console.log(str);
    return db.oneOrNone(str);
};