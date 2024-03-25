const db = require('../infra/database');
const shared = require('../util/shared');


function getCampos(aponExecucao) {
    return [
        aponExecucao.id_empresa,
        aponExecucao.id,
        aponExecucao.id_projeto,
        aponExecucao.id_conta,
        aponExecucao.id_conta_versao,
        aponExecucao.id_subconta,
        aponExecucao.id_subcliente,
        aponExecucao.id_resp,
        aponExecucao.id_exec,
        aponExecucao.id_motivo,
        aponExecucao.produtivo,
        aponExecucao.inicial.replace('GMT-0300', '')
        .replace('T', ' ')
        .replace('Z', ''),
        aponExecucao.final.replace('GMT-0300', '')
        .replace('T', ' ')
        .replace('Z', ''),
        aponExecucao.obs,
        aponExecucao.horasapon,
        aponExecucao.encerramento,
        aponExecucao.nlanc,
        aponExecucao.user_insert,
        aponExecucao.user_update
    ];
}


exports.getAponExecucao = function(id_empresa, id) {
    strSql = ` select 
                    apo.id_empresa
                    ,apo.id
                    ,apo.id_projeto
                    ,apo.id_conta
                    ,apo.id_conta_versao
                    ,apo.id_subconta
                    ,apo.id_subcliente
                    ,apo.id_resp
                    ,apo.id_exec
                    ,apo.id_motivo
                    ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial
                    ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final
                    ,apo.obs
                    ,apo.horasapon
                    ,apo.encerramento
                    ,apo.nlanc
                    ,apo.user_insert
                    ,apo.user_update 
                    ,conta.descricao  as conta_descricao
                    ,grupo.descricao  as grupo_descricao
                    ,estru.descricao as estru_descricao
                    ,resp.razao      as resp_razao
                    ,exec.razao      as exec_razao
                    ,proj.descricao  as proj_descricao
                    ,motivo.motivo   as motivo_descricao
                    ,motivo.produtivo as motivo_produtivo
                    ,to_char(ativ.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as ativ_inicial
                    ,to_char(ativ.final,'YYYY-MM-DD HH24:MI GMT-0300') as ativ_final
                    ,cli.razao                                as cli_razao
            from apons_execucao apo 
                    inner join estruturas conta on conta.id_empresa = apo.id_empresa and conta.conta = apo.id_conta and conta.tipo = 'C' 
                    inner join estruturas grupo on grupo.id_empresa = apo.id_empresa and grupo.conta = apo.id_conta and grupo.subconta = left(apo.id_subconta,4) 
                    inner join estruturas estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta 
                    inner join usuarios      resp   on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp
                    inner join usuarios      exec   on exec.id_empresa = apo.id_empresa and exec.id = apo.id_exec
                    inner join projetos      proj   on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto
                    inner join motivos_apo   motivo on motivo.id_empresa = apo.id_empresa and motivo.codigo = apo.id_motivo
                    inner join atividades    ativ   on ativ.id_empresa   = apo.id_empresa and ativ.subconta = apo.id_subconta and ativ.id_projeto = apo.id_projeto
                    inner join clientes      cli    on cli.id_empresa    = apo.id_empresa and cli.id = apo.id_subcliente
            where apo.id_empresa = ${id_empresa}  and apo.id = ${id}
    `
    console.log("getone", strSql);
    return db.oneOrNone(strSql);
};


exports.getAponExecucaoByNlanc = function(id_empresa, nlanc) {
    strSql = ` select 
                    apo.id_empresa
                    ,apo.id
                    ,apo.id_projeto
                    ,apo.id_conta
                    ,apo.id_conta_versao
                    ,apo.id_subconta
                    ,apo.id_subcliente
                    ,apo.id_resp
                    ,apo.id_exec
                    ,apo.id_motivo
                    ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial
                    ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final
                    ,apo.obs
                    ,apo.horasapon
                    ,apo.encerramento
                    ,apo.nlanc
                    ,apo.user_insert
                    ,apo.user_update 
                    ,conta.descricao  as conta_descricao
                    ,grupo.descricao  as grupo_descricao
                    ,estru.descricao as estru_descricao
                    ,resp.razao      as resp_razao
                    ,exec.razao      as exec_razao
                    ,proj.descricao  as proj_descricao
                    ,motivo.motivo   as motivo_descricao
                    ,motivo.produtivo as motivo_produtivo
                    ,to_char(ativ.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as ativ_inicial
                    ,to_char(ativ.final,'YYYY-MM-DD HH24:MI GMT-0300') as ativ_final
                    ,cli.razao                                as cli_razao
            from apons_execucao apo 
                    inner join estruturas conta on conta.id_empresa = apo.id_empresa and conta.conta = apo.id_conta and conta.tipo = 'C' 
                    inner join estruturas grupo on grupo.id_empresa = apo.id_empresa and grupo.conta = apo.id_conta and grupo.subconta = left(apo.id_subconta,4) 
                    inner join estruturas estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta 
                    inner join usuarios      resp   on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp
                    inner join usuarios      exec   on exec.id_empresa = apo.id_empresa and exec.id = apo.id_exec
                    inner join projetos      proj   on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto
                    inner join motivos_apo   motivo on motivo.id_empresa = apo.id_empresa and motivo.codigo = apo.id_motivo
                    inner join atividades    ativ   on ativ.id_empresa   = apo.id_empresa and ativ.subconta = apo.id_subconta and ativ.id_projeto = apo.id_projeto
                    inner join clientes      cli    on cli.id_empresa    = apo.id_empresa and cli.id = apo.id_subcliente
            where apo.id_empresa = ${id_empresa}  and apo.nlanc = ${nlanc}
    `
    console.log("getAponExecucaoByNlanc", strSql);
    return db.oneOrNone(strSql);
};

exports.getAponExecucoes = function(params) {

    if (params) {

        where = "";

        orderby = "";

        if (params.orderby == 'Código') {
            orderby = "order by apo.id_empresa, apo.id";
        }

        if (params.orderby == "Projeto") orderby = "order by apo.id_empresa, apo.id_projeto,apo.id";
        if (params.orderby == "Conta") orderby = "order by apo.id_empresa, apo.id_conta,apo.id";
        if (params.orderby == "SubConta") orderby = "order by apo.id_empresa, apo.id_subconta,apo.id";
        if (params.orderby == "Responsável") orderby = "order by apo.id_empresa, apo.id_resp,apo.inicial";
        if (params.orderby == "Executor") orderby = "order by apo.id_empresa, apo.id_exec,apo.inicial";

        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `apo.id_empresa = ${params.id_empresa}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += ` apo.id = ${params.id} `;
        }

        if (params.id_projeto != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_projeto = ${params.id_projeto} `;
        }
        if (params.id_conta != "") {
            if (where != "") where += " and ";
            where += ` apo.id_conta = '${params.id_conta}' `;
        }
        if (params.id_subconta != "") {
            if (where != "") where += " and ";
            where += ` apo.id_subconta = '${params.id_subconta}' `;
        }
        if (params.id_resp != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_resp = ${params.id_resp} `;
        }
        if (params.id_exec != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_exec = ${params.id_exec} `;
        }
        if (params.id_dir != 0) {
            if (where != "") where += " and ";
            where += ` proj.id_diretor = ${params.id_dir} `;
        }
        if (params.data != "") {
            if (where != "") where += " and ";
            where += ` to_char(apo.inicial,'YYYY-MM-DD') = '${params.data}' `;
        }

        if (params.controle == 'N') {
            if (where != "") where += " and ";
            where += ` apo.id_projeto <  900000 `;
        }

        if (params.controle == 'S') {
            if (where != "") where += " and ";
            where += ` apo.id_projeto =  900000 `;
        }


        if (where != "") where = " where " + where;

        if (orderby == "") orderby = " order by apo.id_empresa, apo.id ";


        console.log('where ==>', where, "Order by ==>", orderby);

        const strSql = `select  
                     apo.id_empresa
                    ,apo.id
                    ,apo.id_projeto
                    ,apo.id_conta
                    ,apo.id_conta_versao
                    ,apo.id_subconta
                    ,apo.id_subcliente
                    ,apo.id_resp
                    ,apo.id_exec
                    ,apo.id_motivo
                    ,apo.produtivo
                    ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial
                    ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final
                    ,apo.obs
                    ,apo.horasapon
                    ,apo.encerramento
                    ,apo.nlanc
                    ,apo.user_insert
                    ,apo.user_update 
                    ,conta.descricao  as conta_descricao
                    ,grupo.descricao  as grupo_descricao
                    ,estru.descricao  as estru_descricao
                    ,resp.razao       as resp_razao
                    ,exec.razao       as exec_razao
                    ,proj.descricao   as proj_descricao
                    ,motivo.motivo    as motivo_descricao
                    ,to_char(ativ.inicial,'YYYY-MM-DD HH24:MI') as ativ_inicial
                    ,to_char(ativ.final,'YYYY-MM-DD HH24:MI')   as ativ_final
                    ,cli.razao                                  as cli_razao
                    ,proj.id_diretor                            as id_diretor
                    ,dir.razao                                  as dir_razao
            from apons_execucao apo 
                    inner join estruturas    conta on conta.id_empresa = apo.id_empresa and conta.conta = apo.id_conta and conta.tipo = 'C' 
                    inner join estruturas    grupo on grupo.id_empresa = apo.id_empresa and grupo.conta = apo.id_conta and grupo.subconta = left(apo.id_subconta,4) 
                    inner join estruturas    estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta 
                    inner join usuarios      resp on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp
                    inner join usuarios      exec on exec.id_empresa = apo.id_empresa and exec.id = apo.id_exec
                    inner join projetos      proj on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto
                    inner join usuarios      dir  on dir.id_empresa = proj.id_empresa and dir.id = proj.id_diretor
                    inner join motivos_apo   motivo on motivo.id_empresa = apo.id_empresa and motivo.codigo = apo.id_motivo
                    inner join atividades    ativ   on ativ.id_empresa   = apo.id_empresa and ativ.subconta = apo.id_subconta and  apo.id_conta_versao = ativ.versao  and ativ.id_projeto = apo.id_projeto
                    inner join clientes      cli    on cli.id_empresa    = apo.id_empresa and cli.id = apo.id_subcliente
             ${where}  ${orderby}  
                 `;
        console.log('getAponExecucoes sqlStr ==>', strSql);
        return db.manyOrNone(strSql);

    } else {

        const strSql = `
        select  * from apons_execucao apo order by apo.id_empresa, apo.id `
        console.log(strSql);
        return db.manyOrNone(strSql);

    }
};

exports.insertAponExecucao = function(aponExecucao) {
    sqlString = 'insert into apons_execucao' +
        '(id_empresa,  id_projeto, id_conta, id_conta_versao, id_subconta, id_subcliente, id_resp, id_exec, id_motivo, produtivo, inicial, final, obs, horasapon, encerramento, nlanc , user_insert, user_update) ' +
        ' values ($1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15, $16, $17, $18, $19 ) returning *';
    console.log("Insert=>", sqlString);
    return db.oneOrNone(sqlString, getCampos(aponExecucao));

};

exports.updateAponExecucao = function(aponExecucao) {

    sqlUpdate = 'update apons_execucao set ' +
        ' id_subcliente   =    $7    ,' +
        ' id_resp         =    $8    ,' +
        ' id_exec         =    $9   ,' +
        ' id_motivo       =    $10    ,' +
        ' produtivo       =    $11   ,' +
        ' inicial         =    $12    ,' +
        ' final           =    $13    ,' +
        ' obs             =    $14   ,' +
        ' horasapon       =    $15   ,' +
        ' encerramento    =    $16   , ' +
        ' user_insert     =    $18   , ' +
        ' user_update     =    $19     ' +
        ' where id_empresa = $1  and id = $2   returning * ';

    return db.oneOrNone(sqlUpdate, getCampos(aponExecucao));
};

exports.deleteAponExecucao = function(id_empresa, id) {
    return db.manyOrNone('delete from apons_execucao where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};


exports.deleteAponExecucaoByNlanc = function(id_empresa, nlanc) {
    const strDelete = `delete from apons_execucao 
                              where id_empresa = ${id_empresa}  and id_projeto = 900000 and nlanc = ${nlanc} `;
    if (nlanc > 0) {
        console.log('Deletei !:', strDelete)
        return db.oneOrNone(strDelete);
    }
};


exports.existeAponExecucaoAtividadeUnica = function(id_empresa, id_projeto, conta, versao, subconta) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from apons_execucao
	where id_empresa = ${id_empresa} and id_projeto = ${id_projeto} and id_conta = '${conta}' and id_subconta = '${subconta}'`;
    return db.oneOrNone(strQuery);
}

exports.existeAponExecucaoAtividade = function(id_empresa, id_projeto) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from apons_execucao
	where id_empresa = ${id_empresa} and id_projeto = ${id_projeto}`;
    return db.oneOrNone(strQuery);
};

exports.ExisteLancamentoNestaHora = function(aponExecucao, operacao) {
    let whereid = '';
    if (operacao == 'E') {
        whereid = ` and apon.id <> ${aponExecucao.id} `;
    }
    const strQuery = `
	SELECT count(*) TOTAL FROM apons_execucao apon
    WHERE apon.id_empresa = ${aponExecucao.id_empresa} ${whereid}  and apon.id_exec = ${aponExecucao.id_exec} and TO_CHAR(inicial,'yyyy-MM-dd') = '${aponExecucao.inicial.substring(0,10)}' AND (('${aponExecucao.inicial.replace(' GMT-0300','')}' > inicial and  '${aponExecucao.inicial.replace(' GMT-0300','')}' < final) or ('${aponExecucao.final.replace(' GMT-0300','')}' > inicial and  '${aponExecucao.final.replace(' GMT-0300','')}' < final)) `;
    console.log('   ', strQuery);
    return db.oneOrNone(strQuery);
}

exports.ExisteLancamentoNestaHoraExato = function(aponExecucao, operacao) {
    let whereid = '';
    if (operacao == 'E') {
        whereid = ` and apon.id <> ${aponExecucao.id} `;
    }
    const strQuery = `
	SELECT count(*) TOTAL FROM apons_execucao apon
    WHERE apon.id_empresa = ${aponExecucao.id_empresa} ${whereid} and apon.id_exec = ${aponExecucao.id_exec} and TO_CHAR(inicial,'yyyy-MM-dd') = '${aponExecucao.inicial.substring(0,10)}' AND (('${aponExecucao.inicial.replace(' GMT-0300','')}' = inicial) and  ('${aponExecucao.final.replace(' GMT-0300','')}' = final)) `;
    console.log('   ', strQuery);
    return db.oneOrNone(strQuery);
}


exports.getAponExecByExecutor = function(id_empresa, id_usuario, data_ref) {
    const strQuery = `
        select to_char(apo.inicial,'dd/MM/YYYY') as data,apo.id_exec,usu.razao as nome, sum(apo.horasapon) as total
        from apons_execucao apo
        inner join usuarios usu on usu.id_empresa = apo.id_empresa  and usu.id = apo.id_exec 
        where apo.id_empresa = ${id_empresa} and apo.id_exec = ${id_usuario} and to_char(apo.inicial,'MM/YYYY') = '${data_ref}' and apo.id_projeto < 900000 
        group by to_char(apo.inicial,'dd/MM/YYYY'),apo.id_exec,usu.razao
        order by to_char(apo.inicial,'dd/MM/YYYY'),apo.id_exec,usu.razao
    `;
    console.log('GetAponExecByExecutor=>', strQuery);
    return db.manyOrNone(strQuery);
}