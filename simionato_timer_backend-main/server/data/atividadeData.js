/* DATA atividades */
const db = require('../infra/database');

/* CRUD GET */
exports.getAtividade = function(id_empresa, id) {
        strSelec = `SELECT  
            ativ.id_empresa  
            ,ativ.id  
            ,ativ.id_projeto  
            ,ativ.conta  
            ,ativ.versao  
            ,ativ.subconta  
            ,ativ.nivel  
            ,ativ.tipo  
            ,ativ.controle  
            ,ativ.id_resp  
            ,ativ.id_exec  
            ,ativ.id_subcliente  
            ,ativ.inicial  
            ,ativ.final  
            ,ativ.horasplan  
            ,ativ.horasexec  
            ,ativ.horasdir  
            ,ativ.obs  
            ,ativ.status  
            ,ativ.status_pl  
            ,ativ.status_ex  
            ,ativ.user_insert  
            ,ativ.user_update   
            ,estr.descricao descricao_estru 
            ,cli.razao as razao_cliente  
            ,COALESCE(resp.razao,'') as resp_nome
            from atividades ativ  
            inner join estruturas estr on estr.id_empresa = ativ.id_empresa and estr.conta = ativ.conta and estr.versao = ativ.versao and estr.subconta = ativ.subconta 
            inner join clientes   cli  on cli.id_empresa  = ativ.id_empresa and cli.id = ativ.id_subcliente  
            left  join usuarios   resp on resp.id_empresa = ativ.id_empresa and resp.id = ativ.id_resp
            where  ativ.id_empresa = ${id_empresa}  and  ativ.id = ${id}   `;
        console.log('getatividade', strSelec);
        return db.oneOrNone(strSelec);
    }
    /* CRUD GET ALL*/
exports.getAtividades = function(params) {
    if (params) {
        where = "";

        orderby = "";

        console.log('params', params);

        if (params.orderby == 'projeto') {
            orderby = "order by ativ.id_empresa,ativ.conta,ativ.subconta";
        }

        if (params.orderby == 'descricao') {
            orderby = "order by ativ.id_empresa,ativ.id_projeto,estru.descricao";
        }
        if (params.id_empresa != 0) {
            if (where != "") where += " and ";
            where += `ativ.id_empresa = ${params.id_empresa}`;
        }

        if (params.id != 0) {
            if (where != "") where += " and ";
            where += `ativ.id = ${params.id}`;
        }

        if (params.id_projeto != 0) {
            if (where != "") where += " and ";
            where += `ativ.id_projeto = ${params.id_projeto}`;
        }

        if (params.conta != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += `ativ.conta = '${params.conta.trim()}'`;
            } else {
                where += `ativ.conta like '%${params.conta.trim()}%'`;
            }
        }

        if (params.versao != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += `ativ.versao = '${params.versao.trim()}'`;
            } else {
                where += `ativ.versao like '%${params.versao.trim()}%'`;
            }
        }

        if (params.subconta != "") {
            if (params.subconta_nivel != "S") {
                if (where != "") where += " and ";
                if (params.sharp) {
                    where += `ativ.subconta = '${params.subconta.trim()}'`;
                } else {
                    where += `ativ.subconta like '%${params.subconta.trim()}%'`;
                }
            } else {
                if (where != "") where += " and ";
                where += `LEFT(ativ.subconta,${params.nivel_filtro*2}) = '${params.subconta.trim()}'`;

            }
        }

        if (params.tipo != "") {
            if (where != "") where += " and ";
            if (params.sharp) {
                where += `ativ.tipo = '${params.tipo.trim()}'`;
            }
        }

        if (params.nivel != 0) {
            if (where != "") where += " and ";
            where += `ativ.nivel = ${params.nivel}`;
        }

        if (params.id_resp != 0) {
            if (where != "") where += " and ";
            where += `ativ.id_resp = ${params.id_resp}`;
        }

        if (params.id_exec != 0) {
            if (where != "") where += " and ";
            where += `ativ.id_exec = ${params.id_exec}`;
        }

        if (params.id_subcliente != 0) {
            if (where != "") where += " and ";
            where += `ativ.id_subcliente = ${params.id_subcliente}`;
        }

        if (params.so_abertas_ex != "") {
            if (where != "") where += " and ";
            where += `ativ.status_ex <  '2' `;
        }

        if (params.controle == 'N') {
            if (where != "") where += " and ";
            where += ` ativ.conta < '90' `;
        }

        if (params.controle == 'S') {
            where = ` ativ.conta >= '90' `;
        }

        if (where != "") where = " where " + where;

        sqlStr = `select
					 ativ.id_empresa
					,ativ.id
					,ativ.id_projeto
					,ativ.conta
                    ,ativ.versao
					,ativ.subconta
					,ativ.nivel
					,ativ.tipo
                    ,ativ.controle
					,ativ.id_resp
					,ativ.id_exec
					,ativ.id_subcliente
					,to_char(ativ.inicial,'YYYY-MM-DD') as inicial
					,to_char(ativ.final  ,'YYYY-MM-DD') as final
					,ativ.horasplan
					,ativ.horasexec
                    ,ativ.horasdir
					,ativ.obs
                    ,ativ.status
                    ,ativ.status_pl
                    ,ativ.status_ex
					,ativ.user_insert
					,ativ.user_update  
					,proj.descricao as proj_descri
					,estru.descricao as estru_descri
					,COALESCE(exec.razao,'') as exec_razao
					,COALESCE(resp.razao,'') as resp_razao
                    ,cli.razao               as subcliente_razao
                    ,cli.gru_econo           as gru_econo,
                    get_cor(ativ.inicial,ativ.final,ativ.status_pl) as nivelplan, 
                    get_cor(ativ.inicial,ativ.final,ativ.status_ex) as nivelexec
					from   atividades ativ
					inner join projetos proj on proj.id_empresa = ativ.id_empresa  and proj.id = ativ.id_projeto
					inner join estruturas estru on estru.id_empresa = ativ.id_empresa and estru.conta = ativ.conta and estru.subconta = ativ.subconta
                    inner join clientes   cli   on cli.id_empresa = ativ.id_empresa and cli.id = ativ.id_subcliente 
					left join usuarios exec on exec.id = ativ.id_exec
					left join usuarios resp on resp.id = ativ.id_resp
					 ${where}  ${orderby}  
			 `;

        console.log(`Query das atividades ${sqlStr}`);
        return db.manyOrNone(sqlStr);

    } else {
        return db.manyOrNone('select * from atividades order by id_empresa,id');
    }
}

exports.getAtividadesVazia = function(params) {
        if (params) {



            console.log('getAtividadesVazia - params', params);

            where = `WHERE ESTRU.ID_EMPRESA = ${params.id_empresa} AND ESTRU.CONTA = '${params.conta}' AND ESTRU.VERSAO = '${params.versao}'`;

            orderby = "ORDER BY  ESTRU.ID_EMPRESA , ESTRU.CONTA , ESTRU.VERSAO ,ESTRU.SUBCONTA";


            sqlStr = `SELECT
                     estru.id_empresa       as id_empresa
                    ,0                      as id
                    ,proj.id                as id_projeto
                    ,estru.conta            as conta
                    ,estru.versao           as versao
                    ,estru.subconta         as subconta
                    ,estru.nivel            as nivel
                    ,estru.tipo             as tipo
                    ,estru.controle         as controle
                    ,0                      as id_resp
                    ,0                      as id_exec
                    ,proj.id_cliente        as id_subcliente
                    ,to_char(proj.dataproj,'YYYY-MM-DD') as inicial
                    ,to_char(proj.dataenc ,'YYYY-MM-DD') as final
                    ,0 as horasplan
                    ,0 as horasexec
                    ,0 as horasdir
                    ,'' as obs
                    ,'0' as status
                    ,'0'  as status_pl
                    ,'0'  as status_ex
                    ,17  as user_insert
                    ,0   as user_update  
                    ,proj.descricao as proj_descri
                    ,estru.descricao as estru_descri
                    ,COALESCE(exec.razao,'') as exec_razao
                    ,COALESCE(resp.razao,'') as resp_razao
                    ,cli.razao               as subcliente_razao
                    ,cli.gru_econo           as gru_econo
                    ,'' as nivelplan 
                    ,'' as nivelexec
                    , case
                        when ativ.conta is null then 'S'
                        else                         'N'
                      end  as vazia
                    FROM estruturas estru
                    INNER JOIN projetos proj    on proj.id_empresa = estru.id_empresa  and proj.id = ${params.id_projeto}
                    inner join clientes   cli   on cli.id_empresa = estru.id_empresa and cli.id = proj.id_cliente 
                    LEFT  JOIN ATIVIDADES ATIV ON ATIV.ID_EMPRESA = 1 AND ATIV.CONTA = estru.conta AND ATIV.VERSAO = estru.versao AND ATIV.SUBCONTA = estru.subconta and ATIV.ID_PROJETO =  ${params.id_projeto}
                    left join usuarios    exec  on exec.id = ${params.id_exec}
                    left join usuarios resp     on resp.id = ${params.id_resp}
					 ${where}  ${orderby}  
			 `;

            console.log(`Query das atividades vazias ${sqlStr}`);
            return db.manyOrNone(sqlStr);

        } else {
            return db.manyOrNone('select * from atividades order by id_empresa,id');
        }
    }
    /* CRUD - INSERT */
exports.insertAtividade = function(atividade) {
    return db.oneOrNone('insert into atividades ( id_empresa   ,  id_projeto   ,  conta   ,  versao, subconta   ,  nivel   ,  tipo  , controle ,  id_resp   ,  id_exec   ,  id_subcliente   ,  inicial   ,  final   ,  horasplan   ,  horasexec   ,  obs   ,  user_insert   ,  user_update  ) values( $1  ,  $3  ,  $4  ,  $5  ,  $6  ,  $7  ,  $8  ,  $9  ,  $10  ,  $11  ,  $12  ,  $13  ,  $14  ,  $15  ,  $16  ,  $17, $18)  returning * ', [atividade.id_empresa, atividade.id, atividade.id_projeto, atividade.conta, atividade.versao, atividade.subconta, atividade.nivel, atividade.tipo, atividade.id_resp, atividade.id_exec, atividade.id_subcliente, atividade.inicial, atividade.final, atividade.horasplan, atividade.horasexec, atividade.horasdir, atividade.obs, atividade.user_insert, atividade.user_update]);
};


/* CRUD - UPDATE */
exports.updateAtividade = function(atividade) {
    return db.oneOrNone('update atividades set  id_projeto = $3  ,  conta = $4  ,  subconta = $5  ,  nivel = $6  ,  tipo = $7  ,  controle = $8, id_resp = $9  ,  id_exec = $10  ,  id_subcliente = $11  ,  inicial = $12  ,  final = $13  ,  obs = $16  ,  user_insert = $17  ,  user_update = $18  where  id_empresa = $1  and  id = $2   returning * ', [atividade.id_empresa, atividade.id, atividade.id_projeto, atividade.conta, atividade.subconta, atividade.nivel, atividade.tipo, atividade.controle, atividade.id_resp, atividade.id_exec, atividade.id_subcliente, atividade.inicial, atividade.final, atividade.horasplan, atividade.horasexec, atividade.obs, atividade.user_insert, atividade.user_update]);
};


exports.updateAtividadeHorasDir = function(atividadeHorasDir) {
    return db.oneOrNone('update atividades set  horasdir = $3 ,  user_update = $4  where  id_empresa = $1  and  id = $2   returning *', [atividadeHorasDir.id_empresa, atividadeHorasDir.id_atividade, atividadeHorasDir.horasdir, atividadeHorasDir.user_update]);
};


/* CRUD - DELETE */
exports.deleteAtividade = function(id_empresa, id_projeto, conta, versao, subconta) {
    return db.oneOrNone('delete from atividades where  id_empresa = $1  and  id_projeto = $2 and conta = $3 and versao = $4 and subconta = $5  ', [id_empresa, id_projeto, conta, versao, subconta]);
};

/* ANEXA ATIVIDADES NO PROJETO */
exports.anexaAtividade = function(atividades) {
    const strInsert = `insert into atividades
	(id_empresa
	,id_projeto
	,conta
    ,versao
	,subconta
	,nivel
	,tipo
    ,controle
	,id_resp
	,id_exec
	,id_subcliente
	,inicial
	,final
	,horasplan
	,horasexec
    ,horasdir
	,obs
	,user_insert
	,user_update)
	(select
	  estruturas.id_empresa
	 ,proj.id
	 ,estruturas.conta
     ,estruturas.versao
	 ,estruturas.subconta
	 ,estruturas.nivel
	 ,estruturas.tipo
     ,estruturas.controle
     ,( SELECT * FROM define_id_operador(${id_empresa},'${conta}',estruturas.subconta,'${versao}',${id_resp},'R')) AS id_resp
	 ,( SELECT * FROM define_id_operador(${id_empresa},'${conta}',estruturas.subconta,'${versao}',${id_exec},'E')) AS id_exec
	 ,proj.id_cliente as id_subcliente
	 ,proj.dataproj as inicial
	 ,proj.dataenc  as final
	 ,0  as horasplan
	 ,0  as horasexec
     ,0  as horasdir
	 ,'' as obs
	 ,1  as user_insert 
	 ,0  as user_update 
	 from estruturas 
	 inner join projetos proj on proj.id_empresa =  estruturas.id_empresa and proj.id = ${id_projeto} 
	 where estruturas.id_empresa = ${id_empresa} and estruturas.conta = '${conta}' and estruturas.versao = '${versao}'
	 order by estruturas.id_empresa,estruturas.conta,estruturas.subconta)`
    console.log('Anexa com esta string', strInsert);
    return db.none(strInsert);
};

exports.anexaAtividadev2 = function(atividades) {
    const strInsert = `insert into atividades
	(id_empresa
	,id_projeto
	,conta
    ,versao
	,subconta
	,nivel
	,tipo
    ,controle
	,id_resp
	,id_exec
	,id_subcliente
	,inicial
	,final
	,horasplan
	,horasexec
    ,horasdir
	,obs
	,user_insert
	,user_update ) values ${getAtivString(atividades)}
	`
    console.log('Anexa com esta string v2 ', strInsert);

    return db.none(strInsert);
};


/* APAGA TODAS AS ATIVIDADES DE UMA ESTRUTURA. USADA COM A ESTRUTURA FOR DELETADA */
exports.deleteAtividadeEstrutura = function(id_empresa, conta, versao) {
    return db.oneOrNone('delete from atividades where  id_empresa = $1  and  conta = $2 and versao = $3 ', [id_empresa, conta, versao]);
};


/* DESAANEXA ATIVIDADES NO PROJETO */
exports.desanexaAtividade = function(id_empresa, conta, versao, id_projeto) {
    return db.oneOrNone('delete from atividades where  id_empresa = $1  and  conta = $2  and versao = $3 and  id_projeto = $4  ', [id_empresa, conta, versao, id_projeto]);
};



exports.existeAtividade = function(id_empresa, id_projeto, conta, versao, subconta) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from atividades
	where id_empresa = ${id_empresa} and id_projeto = ${id_projeto} and conta = '${conta}' and versao = '${versao}' and subconta = '${subconta}'`;
    console.log('existeAtividade', strQuery);
    return db.oneOrNone(strQuery);
};


exports.existeAtividades = function(id_empresa, id_projeto, conta, versao) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from atividades
	where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and conta = '${conta}' and versao = '${versao}'`;
    return db.oneOrNone(strQuery);
};

exports.existeAtividadesByProj = function(id_empresa, id_projeto) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from atividades
	where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} `;
    return db.oneOrNone(strQuery);
};


exports.existeAtividadesEstrutura = function(id_empresa, conta, versao) {
    const strQuery = `
	select COALESCE(count(*),0) as total
	from atividades
	where id_empresa = ${id_empresa} and  conta = '${conta}'  and versao = '${versao}'`;
    return db.oneOrNone(strQuery);
};

exports.setatus = function(id_empresa, id_projeto, id_subconta) {
    const sqlStr = `select from setStatus(${id_empresa},${id_projeto},'${id_subconta.trim()}')`;
    console.log("sqlStr", sqlStr);
    return db.any(sqlStr);
};

exports.existeLancamentosSubconta = function(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
    const sqlStr = `SELECT count(*) as total from apons_execucao
        where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and  id_conta = '${id_conta}'  and  id_conta_versao = '${id_conta_versao}' and id_conta_versao = '${id_subconta}'  and  LEFT(id_subconta,${nivel*2}) = '${id_subconta.trim()}' union all
        SELECT count(*) as total from apons_planejamento
        where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and  id_conta = '${id_conta}'  and  id_conta_versao = '${id_conta_versao}' and id_conta_versao = '${id_subconta}'  and  LEFT(id_subconta,${nivel*2}) = '${id_subconta.trim()}'`;
    console.log("sqlStr", sqlStr);
    return db.any(sqlStr);
};


exports.desanexasubconta = function(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {
    const strDelete = `delete from  atividades 
                        where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and  conta = '${id_conta}'  and  
                              versao = '${id_conta_versao}'  and  LEFT(subconta,${nivel*2}) = '${id_subconta.trim()}' `
    console.log(`Delete subconta: ${strDelete}`);
    return db.oneOrNone(strDelete);
}

function getAtivString(atividades) {
    retorno = '';
    virgula = '';
    if (atividades.length > 0) {
        atividades.forEach(ativ => {
            if (ativ.checked && ativ.vazia) {
                retorno += ` ${virgula} (
                                  ${ativ.atividade.id_empresa}
                                , ${ativ.atividade.id_projeto}
                                ,'${ativ.atividade.conta}'
                                ,'${ativ.atividade.versao}'
                                ,'${ativ.atividade.subconta}'
                                , ${ativ.atividade.nivel}
                                ,'${ativ.atividade.tipo}'
                                ,'${ativ.atividade.controle}'
                                , ${ativ.atividade.id_resp}
                                , ${ativ.atividade.id_exec}
                                , ${ativ.atividade.id_subcliente}
                                ,'${ativ.atividade.inicial}'
                                ,'${ativ.atividade.final}'
                                ,0  
                                ,0  
                                ,0  
                                ,'' 
                                ,1   
                                ,0 )  `;
                virgula = ',';
            }
        });
    }
    return retorno;
}