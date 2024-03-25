const db = require('../infra/database');
const shared = require('../util/shared');


function getCampos(aponPlanejamento) {
    return [
        aponPlanejamento.id_empresa,
        aponPlanejamento.id,
        aponPlanejamento.id_projeto,
        aponPlanejamento.id_conta,
        aponPlanejamento.id_subconta,
        aponPlanejamento.id_resp,
        aponPlanejamento.id_exec,
        aponPlanejamento.inicial.replace('GMT-0300', '')
        .replace('T', ' ')
        .replace('Z', ''),
        aponPlanejamento.final.replace('GMT-0300', '')
        .replace('T', ' ')
        .replace('Z', ''),
        aponPlanejamento.horasapon,
        aponPlanejamento.obs,
        aponPlanejamento.encerra,
        aponPlanejamento.user_insert,
        aponPlanejamento.user_update
    ];

}


exports.getAponPlanejamento = function(id_empresa, id) {
    const strSql = `select  
    apo.id_empresa
   ,apo.id
   ,apo.id_projeto
   ,apo.id_conta
   ,apo.id_subconta
   ,apo.id_resp
   ,apo.id_exec
   ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial
   ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final  
   ,apo.horasapon
   ,apo.obs
   ,apo.encerra
   ,apo.user_insert
   ,apo.user_update 
   ,resp.razao as resp_razao
   ,exec.razao as exec_razao
   ,estru.descricao as ativ_descricao
    from apons_planejamento apo
        inner join estruturas estru        on estru.id_empresa     = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta
        inner join usuarios resp           on resp.id_empresa      = apo.id_empresa and resp.id         = apo.id_resp
        inner join usuarios exec           on exec.id_empresa      = apo.id_empresa and exec.id         = apo.id_resp
    where apo.id_empresa = ${id_empresa}  and apo.id = ${id}     
   `
    return db.oneOrNone(strSql);
};

exports.getAponPlanejamentos = function(params) {

    if (params) {

        where = "";

        orderby = "";

        if (params.orderby == 'Código') {
            orderby = "order by apo.id_empresa, apo.id";
        }

        if (params.orderby == "Projeto") orderby = "order by apo.id_empresa, apo.id_projeto,apo.id";
        if (params.orderby == "Conta") orderby = "order by apo.id_empresa, apo.id_conta,apo.id";
        if (params.orderby == "SubConta") orderby = "order by apo.id_empresa, apo.id_subconta,apo.id";
        if (params.orderby == "Responsável") orderby = "order by apo.id_empresa, apo.id_resp,apo.id,apo.inicial";
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
        if (params.id_conta != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_conta = ${params.id_conta} `;
        }
        if (params.id_subconta != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_subconta = ${params.id_subconta} `;
        }
        if (params.id_resp != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_resp = ${params.id_resp} `;
        }
        if (params.id_exec != 0) {
            if (where != "") where += " and ";
            where += ` apo.id_exec = ${params.id_exec} `;
        }
        if (params.id != 0) {
            if (where != "") where += " and ";
            where += ` apo.id = ${params.id} `;
        }
        if (params.data != "") {
            if (where != "") where += " and ";
            where += ` to_char(apo.inicial,'YYYY-MM-DD') = '${params.data}' `;
        }
        if (where != "") where = " where " + where;

        if (orderby == "") orderby = " order by apo.id_empresa, apo.id ";

        sqlStr = `select  
                         apo.id_empresa
                        ,apo.id
                        ,apo.id_projeto
                        ,apo.id_conta
                        ,apo.id_subconta
                        ,apo.id_resp
                        ,apo.id_exec
                        ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial
                        ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final  
                        ,apo.horasapon
                        ,apo.obs
                        ,apo.encerra
                        ,apo.user_insert
                        ,apo.user_update 
                        ,ativ.status    as status_atividade ,
                        proj.dataprop   as projeto_data_proposta,
                        proj.dataproj   as projeto_data_projeto,
                        proj.dataenc    as projeto_data_enc,
                        proj.id_diretor as diretor_id,
                        proj.id_cliente as cliente_id,
                        proj.descricao  as projeto_descricao,
                        diretor.razao   as diretor_razao,
                        resp.razao      as resp_razao,
                        exec.razao      as exec_razao,
                        cli.razao       as cli_razao,
                        estru.descricao as estru_descricao
                        from apons_planejamento apo
                        inner join atividades  ativ           on ativ.id_empresa    = apo.id_empresa and ativ.id_projeto = apo.id_projeto and ativ.subconta = apo.id_subconta
                        inner join projetos    proj           on proj.id_empresa    = apo.id_empresa and proj.id        = apo.id_projeto
                        inner join usuarios    resp           on resp.id_empresa    = apo.id_empresa and resp.id        = apo.id_resp
                        inner join usuarios    exec           on exec.id_empresa    = apo.id_empresa and exec.id        = apo.id_exec
                        inner join usuarios    diretor        on diretor.id_empresa = apo.id_empresa and diretor.id     = proj.id_diretor
                        inner join clientes    cli            on cli.id_empresa     = apo.id_empresa and cli.id         = proj.id_cliente  
                        inner join estruturas  estru          on estru.id_empresa   = apo.id_empresa and estru.conta    = apo.id_conta   and estru.subconta = apo.id_subconta
                         ${where}  ${orderby}  
                 `;

        console.log('sqlStr', sqlStr);
        return db.manyOrNone(sqlStr);


    } else {

        const strSql = `
        select  
             apo.id_empresa
            ,apo.id
            ,apo.id_projeto
            ,apo.id_conta
            ,apo.id_subconta
            ,apo.id_resp
            ,apo.id_exec
            ,apo.inicial AT TIME ZONE 'UTC' as inicial
            ,apo.final   AT TIME ZONE 'UTC' as final
            ,apo.horasapon
            ,apo.obs
            ,apo.encerra
            ,apo.user_insert
            ,apo.user_update 
            from apons_Planejamento apo order by apo.id_empresa, apo.id

                `

        console.log(strSql);
        return db.manyOrNone(strSql);

    }
};


exports.getAponAgendaPlanejamentos = function(id_empresa, id_exec, data) {

    filtro = "";

    where = `where apo.id_empresa = ${id_empresa} and apo.id_exec = ${id_exec} `;

    if (filtro != "") filtro += " or  ";

    filtro += `( to_char(apo.inicial,'YYYY-MM-DD') = '${data}') `;

    where = where + ` and (${filtro}) `

    sqlStr = `select  apo.id_empresa     
                ,apo.id     
                ,apo.id_projeto     
                ,apo.id_conta     
                ,apo.id_subconta     
                ,apo.id_resp     
                ,apo.id_exec     
                ,to_char(apo.inicial,'YYYY-MM-DD HH24:MI GMT-0300') as inicial
                ,to_char(apo.final,'YYYY-MM-DD HH24:MI GMT-0300') as final  
                ,apo.horasapon     
                ,apo.obs                                                 
                ,apo.encerra      
                ,apo.user_insert     
                ,apo.user_update    
                ,resp.razao as resp_razao
                ,cli.razao  as cli_razao
                ,proj.descricao  as proj_descricao 
                ,estru.descricao as estru_descricao 
          from   apons_planejamento apo
          inner join usuarios resp on resp.id_empresa = apo.id_empresa and resp.id = apo.id_resp
          inner join projetos proj on proj.id_empresa = apo.id_empresa and proj.id = apo.id_projeto  
          inner join clientes cli  on cli.id_empresa  = apo.id_empresa and cli.id = proj.id_cliente
          inner join estruturas    estru on estru.id_empresa = apo.id_empresa and estru.conta = apo.id_conta and estru.subconta = apo.id_subconta 
          ${where} 
          order by apo.inicial,apo.id_projeto,apo.id_subconta,apo.inicial
        `

    console.log('Planejamentos Sql', sqlStr);

    return db.manyOrNone(sqlStr);
};

exports.insertAponPlanejamento = function(aponPlanejamento) {
    sqlString = 'insert into apons_Planejamento' +
        '(id_empresa,  id_projeto, id_conta, id_subconta, id_resp, id_exec, inicial, final, horasapon, obs, encerra, user_insert, user_update ) ' +
        ' values ($1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 ) returning *';
    console.log(`Lancamento Planejamento ${sqlString}`);
    return db.oneOrNone(sqlString, getCampos(aponPlanejamento));

};

exports.updateAponPlanejamento = function(aponPlanejamento) {

    sqlUpdate = 'update apons_Planejamento set ' +
        ' id_resp          =      $6     , ' +
        ' id_exec          =      $7     , ' +
        ' inicial          =      $8     , ' +
        ' final            =      $9     , ' +
        ' horasapon        =      $10    , ' +
        ' obs              =      $11    , ' +
        ' encerra          =      $12    , ' +
        ' user_insert      =      $13    , ' +
        ' user_update      =      $14      ' +
        ' where id_empresa = $1  and id = $2   returning * ';

    //console.log(aponPlanejamento);

    return db.oneOrNone(sqlUpdate, getCampos(aponPlanejamento));
};

exports.updateAponPlanejamentoObs = function(id_empresa, id, obs) {

    console.log(id_empresa, id, obs);

    sqlUpdate = 'update apons_Planejamento set ' +
        ' obs              =      $3    ' +
        ' where id_empresa = $1  and id = $2   returning * ';

    console.log("updateAponPlanejamentoObs", sqlUpdate);

    return db.oneOrNone(sqlUpdate, [id_empresa, id, obs]);
};


exports.deleteAponPlanejamento = function(id_empresa, id) {
    return db.manyOrNone('delete from apons_Planejamento where id_empresa = $1  and id = $2 ', [id_empresa, id]);
};

exports.existeAponPlanejamentoAtividadeUnica = function(id_empresa, id_projeto, conta, versao, subconta) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from apons_Planejamento
	where id_empresa = ${id_empresa} and id_projeto = ${id_projeto} and id_conta = '${conta}'  and id_subconta = '${subconta}'`;
    console.log('existeAponPlanejamentoAtividadeUnica', strQuery);
    return db.oneOrNone(strQuery);
}


exports.existeAponPlanejamentoAtividade = function(id_empresa, id_projeto) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from apons_Planejamento
	where id_empresa = ${id_empresa} and id_projeto = ${id_projeto}`;
    return db.oneOrNone(strQuery);
};