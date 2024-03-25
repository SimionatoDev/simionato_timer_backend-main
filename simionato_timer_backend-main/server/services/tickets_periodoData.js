/* DATA tickets_periodo */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Tickets_Periodo){
return [ 
			Tickets_Periodo.id_empresa, 
			Tickets_Periodo.referencia, 
			Tickets_Periodo.data_inicial, 
			Tickets_Periodo.data_final, 
			Tickets_Periodo.id_resp, 
			Tickets_Periodo.status, 
			Tickets_Periodo.user_insert, 
			Tickets_Periodo.user_update, 
 ]; 
}; 


/* CRUD GET */
exports.getTickets_Periodo = function(id_empresa,referencia){
	return db.oneOrNone("select " +  
	"   tickets_periodo.id_empresa as  id_empresa " +  
	",  tickets_periodo.referencia as  referencia " +  
	", to_char(tickets_periodo.data_inicial, 'DD/MM/YYYY') as data_inicial  " + 
	", to_char(tickets_periodo.data_final, 'DD/MM/YYYY') as data_final  " + 
	",  tickets_periodo.id_resp as  id_resp " +  
	",  tickets_periodo.status as  status " +  
	",  tickets_periodo.user_insert as  user_insert " +  
	",  tickets_periodo.user_update as  user_update " +    
	"from tickets_periodo " +
	"where  tickets_periodo.id_empresa = $1  and  tickets_periodo.referencia = $2   ", [id_empresa,referencia]);
}
/* CRUD GET ALL*/
exports.getTicket_Periodo = function(params){
if (params) {
	return db.manyOrNone("select " +  
	"   tickets_periodo.id_empresa as  id_empresa " +  
	",  tickets_periodo.referencia as  referencia " +  
	", to_char(tickets_periodo.data_inicial, 'DD/MM/YYYY') as data_inicial  " + 
	", to_char(tickets_periodo.data_final, 'DD/MM/YYYY') as data_final  " + 
	",  tickets_periodo.id_resp as  id_resp " +  
	",  tickets_periodo.status as  status " +  
	",  tickets_periodo.user_insert as  user_insert " +  
	",  tickets_periodo.user_update as  user_update " +    
	"from tickets_periodo " +
	"order by id_empresa,id ");
}
else 
{
	return db.manyOrNone("select " +  
	"   tickets_periodo.id_empresa as  id_empresa " +  
	",  tickets_periodo.referencia as  referencia " +  
	", to_char(tickets_periodo.data_inicial, 'DD/MM/YYYY') as data_inicial  " + 
	", to_char(tickets_periodo.data_final, 'DD/MM/YYYY') as data_final  " + 
	",  tickets_periodo.id_resp as  id_resp " +  
	",  tickets_periodo.status as  status " +  
	",  tickets_periodo.user_insert as  user_insert " +  
	",  tickets_periodo.user_update as  user_update " +    
	"from tickets_periodo " +
	"order by id_empresa,id ");
}
}
/* CRUD - INSERT */
 exports.insertTickets_Periodo = function(tickets_periodo){
	strSql = `insert into tickets_periodo (
		     id_empresa 
		 ,   referencia 
		 ,   data_inicial 
		 ,   data_final 
		 ,   id_resp 
		 ,   status 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${tickets_periodo.id_empresa} 
		 ,   '${tickets_periodo.referencia}' 
		 ,   '${tickets_periodo.data_inicial}' 
		 ,   '${tickets_periodo.data_final}' 
		 ,   ${tickets_periodo.id_resp} 
		 ,   '${tickets_periodo.status}' 
		 ,   ${tickets_periodo.user_insert} 
		 ,   ${tickets_periodo.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateTickets_Periodo = function(tickets_periodo){
	strSql = `update  set tickets_periodo  
		     data_inicial = '${tickets_periodo.data_inicial}' 
 		 ,   data_final = '${tickets_periodo.data_final}' 
 		 ,   id_resp = ${tickets_periodo.id_resp} 
 		 ,   status = '${tickets_periodo.status}' 
 		 ,   user_insert = ${tickets_periodo.user_insert} 
 		 ,   user_update = ${tickets_periodo.user_update} 
 		 where id_empresa = ${tickets_periodo.id_empresa} and  referencia = '${tickets_periodo.referencia}'  returning * `;
	return  db.oneOrNone(strSql);
}


/* CRUD - DELETE */
 exports.deleteTickets_Periodo = function(id_empresa,referencia){
	strSql = `delete from tickets_periodo 
		 where id_empresa = ${id_empresa} and  referencia = '${referencia}'  `;
 	return  db.oneOrNone(strSql);
}


