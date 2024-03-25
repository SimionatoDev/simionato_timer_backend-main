const db = require('../infra/database');
const shared = require('../util/shared');


function getCampos(usuario) {
    return [
        usuario.id_empresa,
        usuario.id,
        usuario.razao,
        usuario.cnpj_cpf,
        shared.formatDateYYYYMMDD(usuario.cadastr),
        usuario.rua,
        usuario.nro,
        usuario.complemento,
        usuario.bairro,
        usuario.cidade,
        usuario.uf,
        usuario.cep,
        usuario.tel1,
        usuario.tel2,
        usuario.email,
        usuario.senha,
        usuario.pasta,
        usuario.grupo,
        usuario.ativo,
        usuario.timer,
        usuario.ticket,
        usuario.man_hora_entrada,
        usuario.man_hora_saida,
        usuario.tard_hora_entrada,
        usuario.tard_hora_saida,
        usuario.user_insert,
        usuario.user_update
    ];

}

exports.getUsuario = function(id_empresa, id) {
    return db.oneOrNone("select " +
        " usu.id_empresa, " +
        " usu.id, " +
        " usu.razao, " +
        " usu.cnpj_cpf, " +
        " to_char(usu.cadastr, 'DD/MM/YYYY') as cadastr, " +
        " usu.rua, " +
        " usu.nro, " +
        " usu.complemento, " +
        " usu.bairro, " +
        " usu.cidade, " +
        " usu.uf, " +
        " usu.cep, " +
        " usu.tel1, " +
        " usu.tel2, " +
        " usu.email, " +
        " usu.senha, " +
        " usu.pasta, " +
        " usu.grupo, " +
        " usu.ativo,	" +
        " usu.timer,    " +
        " usu.ticket,   " +
        "usu.man_hora_entrada  , " +
        "usu.man_hora_saida    , " +
        "usu.tard_hora_entrada , " +
        "usu.tard_hora_saida   , " +
        " usu.user_insert, " +
        " usu.user_update  " +
        ", gru.grupo as gru_descricao from usuarios usu inner join  grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo where usu.id_empresa = $1 and usu.id = $2 ", [id_empresa, id]);
};

exports.getUsuarioByEmail = function(id_empresa, email) {
    return db.oneOrNone("select " +
        " usu.id_empresa, " +
        " usu.id, " +
        " usu.razao, " +
        " usu.cnpj_cpf, " +
        " to_char(usu.cadastr, 'DD/MM/YYYY') as cadastr, " +
        " usu.rua, " +
        " usu.nro, " +
        " usu.complemento, " +
        " usu.bairro, " +
        " usu.cidade, " +
        " usu.uf, " +
        " usu.cep, " +
        " usu.tel1, " +
        " usu.tel2, " +
        " usu.email, " +
        " usu.senha, " +
        " usu.pasta, " +
        " usu.grupo, " +
        " usu.ativo,	" +
        " usu.timer,    " +
        " usu.ticket,   " +
        "usu.man_hora_entrada  , " +
        "usu.man_hora_saida    , " +
        "usu.tard_hora_entrada , " +
        "usu.tard_hora_saida   , " +
        " usu.user_insert, " +
        " usu.user_update  " +
        ", gru.grupo as gru_descricao from usuarios usu inner join  grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo where usu.id_empresa = $1 and usu.email = $2 ", [id_empresa, email]);
};

exports.getUsuarios = function(params) {

    if (params) {

        where = "";

        orderby = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Código') {

            console.log('Código', params.orderby);
            orderby = "order by usu.id";
        }
        if (params.orderby == "Razão") orderby = "order by usu.razao";

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `usu.id_empresa = ${params.id_empresa}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += `usu.id = ${params.id}`;
        }


        if (params.razao != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += `usu.razao = '${params.razao.trim()}'`;

            } else {
                where += `usu.razao like '%${params.razao.trim()}%'`;
            }
        }

        if (params.cnpj_cpf != "") {
            if (where != "") where += " and ";
            where += `usu.cnpj_cpf = ${params.cnpj_cpf}`;
        }


        if (params.grupo.length > 0) {

            console.log("===>", params.grupo, params.grupo.length);

            const grupos = params.grupo;

            let filtro = grupos.toString();

            if (where != "") where += " and ";

            where += `usu.grupo in ( ${filtro} )`;
        }

        if (params.ativo != '') {

            if (where != "") where += " and ";

            where += `usu.ativo =  '${params.ativo}' )`;
        }

        if (params.timer != '') {

            if (where != "") where += " and ";

            where += `usu.timer =  '${params.timer}' )`;
        }

        if (params.ticket != '') {

            if (where != "") where += " and ";

            where += `usu.ticket =  '${params.ticket}' )`;
        }

        if (where != "") where = " where " + where;

        if (params.contador == 'S') {

            sqlStr = `SELECT  COALESCE(COUNT(*),0) as total 
                      FROM          usuarios usu
                      INNER JOIN    grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo
                    ${where}  
           `;

            console.log('sqlStr', sqlStr);

            return db.oneOrNone(sqlStr);

        } else {

            sqlStr = `SELECT    usu.id_empresa,usu.id, usu.razao, gru.grupo as grupo, usu.email, usu.ativo
                  FROM          usuarios usu
                  INNER JOIN    grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo
                 ${where}  ${orderby}  
         `;

            console.log('sqlStr', sqlStr);

            return db.manyOrNone(sqlStr);

        }

    } else {

        return db.manyOrNone('select usu.*, gru.grupo as gru_descricao from usuarios usu inner join  grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo order by usu.id_empresa,usu.id');

    }
};

exports.getUsuariosByProjeto = function(params) {

    if (params) {

        where = "";

        orderby = "";

        console.log('params', params);

        console.log('params.orderby', params.orderby)

        if (params.orderby == 'Código') {

            console.log('Código', params.orderby);
            orderby = "order by usu.id";
        }
        if (params.orderby == "Razão") orderby = "order by usu.razao";

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `usu.id_empresa = ${params.id_empresa}`;
        }
        if (params.id_resp != 0) {
            if (where != "") where += " and ";
            where += `usu.id_resp = '${params.id_resp}'`;
        }
        if (params.id_exec != 0) {
            if (where != "") where += " and ";
            where += `usu.id_exec = '${params.id_exec}'`;
        }
        if (where != "") where = " where " + where;

        sqlStr = `SELECT       usu.id_empresa,usu.id, usu.razao, gru.grupo as grupo, usu.email, usu.ativo
                  FROM          usuarios usu
                  INNER JOIN    grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo
                 ${where}  ${orderby}  
         `;

        console.log('sqlStr', sqlStr);

        return db.manyOrNone(sqlStr);

    } else {

        return db.manyOrNone('select usu.*, gru.grupo as gru_descricao from usuarios usu inner join  grupos_user  gru on gru.id_empresa = usu.id_empresa and gru.id = usu.grupo order by usu.id_empresa,usu.id');

    }
};

exports.getUsuariosByPonte = function(params) {

    where = "";

    orderby = "";

    console.log('params', params);

    console.log('params.orderby', params.orderby)

    if (params.orderby == 'Código') {

        console.log('Código', params.orderby);
        orderby = "order by usu.id";
    }
    if (params.orderby == "Razão") orderby = "order by usu.razao";

    if (params.id_empresa != 0) {
        if (where != "") where += " and ";
        where += `usu.id_empresa = ${params.id_empresa}`;
    }
    if (params.ativo != '') {
        if (where != "") where += " and ";
        where += `usu.ativo = '${params.ativo}'`;
    }
    if (params.timer != '') {
        if (where != "") where += " and ";
        where += `usu.timer = '${params.timer}'`;
    }
    if (params.flag_ponte != '') {
        if (where != "") where += " and ";
        where += `fer.flag_ponte = '${params.flag_ponte}'`;
    }

    if (params.grupo.length > 0) {

        console.log("===>", params.grupo, params.grupo.length);

        const grupos = params.grupo;

        let filtro = grupos.toString();

        if (where != "") where += " and ";

        where += `usu.grupo in ( ${filtro} )`;
    }

    if (where != "") where = " where " + where;

    sqlStr = `SELECT 
                  USU.ID_EMPRESA
                 ,USU.ID
                 ,USU.RAZAO
                 ,FER.DATA
                 ,FER.DESCRICAO
                 ,CASE
                    WHEN FER.DATA IS NULL THEN 'N'
                  ELSE                       'S'
                  END AS FLAG_PONTE  
                  FROM   USUARIOS USU
                  LEFT JOIN FERIADOS FER ON FER.ID_EMPRESA = USU.ID_EMPRESA AND FER.ID_USUARIO = USU.ID AND FER.ID_TIPO = '2' AND TO_CHAR(FER.DATA,'DD/MM/YYYY') = '${params.data}'
                 ${where}  ${orderby}  
         `;

    console.log('sqlStr', sqlStr);

    return db.manyOrNone(sqlStr);

};


exports.insertUsuario = function(usuario) {
    console.log("usuario =>", usuario);
    sqlString = 'insert into usuarios' +
        '(id_empresa,  razao, cnpj_cpf, cadastr, rua, nro, complemento, bairro, cidade, uf, cep, tel1, tel2, email, senha, pasta, grupo,ativo,timer,ticket,man_hora_entrada,man_hora_saida,tard_hora_entrada ,tard_hora_saida,user_insert,user_update) ' +
        ' values ($1,  $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) returning *';

    return db.oneOrNone(sqlString, getCampos(usuario));

};

exports.updateUsuario = function(usuario) {

    sqlUpdate = 'update usuarios set ' +
        ' razao           =   $3     ,  ' +
        ' cnpj_cpf        =   $4     ,  ' +
        ' cadastr         =   $5     ,  ' +
        ' rua             =   $6     ,  ' +
        ' nro             =   $7     ,  ' +
        ' complemento     =   $8     ,  ' +
        ' bairro          =   $9     ,  ' +
        ' cidade          =   $10    ,  ' +
        ' uf              =   $11    ,  ' +
        ' cep             =   $12    ,  ' +
        ' tel1            =   $13    ,  ' +
        ' tel2            =   $14    ,  ' +
        ' email           =   $15    ,  ' +
        ' senha           =   $16    ,  ' +
        ' pasta           =   $17    ,  ' +
        ' grupo           =   $18    ,  ' +
        ' timer             =  $20    ,  ' +
        ' ticket            =  $21    ,  ' +
        ' man_hora_entrada  =  $22    ,  ' +
        ' man_hora_saida    =  $23    ,  ' +
        ' tard_hora_entrada =  $24    ,  ' +
        ' tard_hora_saida   =  $25    ,  ' +
        ' user_update       =  $27       ' +
        ' where id_empresa  = $1 and id = $2 returning * ';

    return db.oneOrNone(sqlUpdate, getCampos(usuario));
};

exports.deleteUsuario = function(id_empresa, id) {
    return db.manyOrNone('delete from usuarios where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};

exports.existeUsuariosByGrupo = function(id_empresa, id_grupo) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from usuarios
	where id_empresa = ${id_empresa} and  grupo  = ${id_grupo} `;
    return db.oneOrNone(strQuery);
};

exports.usarioHorasExec = function(params) {
    const id_empresa = params.id_empresa;
    const mes = params.mes;
    const ano = params.ano;

    filtroLanca = "";

    where = "";

    orderby = "";

    console.log('params', params);

    console.log('params.orderby', params.orderby)

    if (params.orderby == "Razão") orderby = "order by usu.id_empresa,usu.razao";

    if (params.id_empresa != 0) {
        if (where != "") where += " and ";
        where += `usu.id_empresa = ${params.id_empresa}`;
    }
    if (params.id_resp != 0) {
        filtroLanca = ` and apo.id_resp = ${params.id_resp} `;
    }
    if (params.id_exec != 0) {
        if (where != "") where += " and ";
        where += `usu.id = '${params.id_exec}'`;
    }
    if (where != "") where = " where " + where;

    const strQuery = `
	    SELECT  USU.ID,USU.RAZAO,GRU.GRUPO,USU.ATIVO,USU.TIMER,USU.TICKET,(${mes} || '/' || ${ano}) AS DATA,
        (SELECT coalesce(SUM(apo.horasapon),0) from apons_execucao apo  where apo.id_empresa = usu.id_empresa and TO_CHAR(apo.inicial,'mm') = '${mes}' and TO_CHAR(apo.inicial,'YYYY') = '${ano}' ${filtroLanca} and apo.id_exec = usu.id) AS HORAS_LANCADAS
        FROM    USUARIOS USU
        INNER JOIN grupos_user GRU on gru.id_empresa = usu.id_empresa and gru.id  = usu.grupo
        ${where} AND ATIVO = 'S' AND TIMER = 'S'
        ORDER   BY RAZAO `;

    console.log(strQuery);
    return db.manyOrNone(strQuery);
};