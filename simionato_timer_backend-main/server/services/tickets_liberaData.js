/* DATA tickets_libera */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Tickets_Libera){
return [ 
			Tickets_Libera.id_empresa, 
			Tickets_Libera.referencia, 
			Tickets_Libera.id, 
			Tickets_Libera.id_resp, 
			Tickets_Libera.id_usuario, 
			Tickets_Libera.justificativa, 
			Tickets_Libera.horas, 
			Tickets_Libera.user_insert, 
			Tickets_Libera.user_update, 
 ]; 
}; 


/* CRUD GET */
exports.getTickets_Libera = function(id_empresa,referencia){
	return db.oneOrNone("select " +  
	"   tickets_libera.id_empresa as  id_empresa " +  
	",  tickets_libera.referencia as  referencia " +  
	",  tickets_libera.id as  id " +  
	",  tickets_libera.id_resp as  id_resp " +  
	",  tickets_libera.id_usuario as  id_usuario " +  
	",  tickets_libera.justificativa as  justificativa " +  
	",  tickets_libera.horas as  horas " +  
	",  tickets_libera.user_insert as  user_insert " +  
	",  tickets_libera.user_update as  user_update " +    
	"from tickets_libera " +
	"where  tickets_libera.id_empresa = $1  and  tickets_libera.referencia = $2   ", [id_empresa,referencia]);
}
/* CRUD GET ALL*/
exports.getTicket_Libera = function(params){
if (params) {
	return db.manyOrNone("select " +  
	"   tickets_libera.id_empresa as  id_empresa " +  
	",  tickets_libera.referencia as  referencia " +  
	",  tickets_libera.id as  id " +  
	",  tickets_libera.id_resp as  id_resp " +  
	",  tickets_libera.id_usuario as  id_usuario " +  
	",  tickets_libera.justificativa as  justificativa " +  
	",  tickets_libera.horas as  horas " +  
	",  tickets_libera.user_insert as  user_insert " +  
	",  tickets_libera.user_update as  user_update " +    
	"from tickets_libera " +
	"order by id_empresa,id ");
}
else 
{
	return db.manyOrNone("select " +  
	"   tickets_libera.id_empresa as  id_empresa " +  
	",  tickets_libera.referencia as  referencia " +  
	",  tickets_libera.id as  id " +  
	",  tickets_libera.id_resp as  id_resp " +  
	",  tickets_libera.id_usuario as  id_usuario " +  
	",  tickets_libera.justificativa as  justificativa " +  
	",  tickets_libera.horas as  horas " +  
	",  tickets_libera.user_insert as  user_insert " +  
	",  tickets_libera.user_update as  user_update " +    
	"from tickets_libera " +
	"order by id_empresa,id ");
}
}
/* CRUD - INSERT */
 exports.insertTickets_Libera = function(tickets_libera){
	strSql = `insert into tickets_libera (
		     id_empresa 
		 ,   referencia 
		 ,   id_resp 
		 ,   id_usuario 
		 ,   justificativa 
		 ,   horas 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${tickets_libera.id_empresa} 
		 ,   '${tickets_libera.referencia}' 
		 ,   ${tickets_libera.id_resp} 
		 ,   ${tickets_libera.id_usuario} 
		 ,   '${tickets_libera.justificativa}' 
		 ,   ${tickets_libera.horas} 
		 ,   ${tickets_libera.user_insert} 
		 ,   ${tickets_libera.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateTickets_Libera = function(tickets_libera){
	strSql = `update  set tickets_libera  
		     id = ${tickets_libera.id} 
 		 ,   id_resp = ${tickets_libera.id_resp} 
 		 ,   id_usuario = ${tickets_libera.id_usuario} 
 		 ,   justificativa = '${tickets_libera.justificativa}' 
 		 ,   horas = ${tickets_libera.horas} 
 		 ,   user_insert = ${tickets_libera.user_insert} 
 		 ,   user_update = ${tickets_libera.user_update} 
 		 where id_empresa = ${tickets_libera.id_empresa} and  referencia = '${tickets_libera.referencia}'  returning * `;
	return  db.oneOrNone(strSql);
}


/* CRUD - DELETE */
 exports.deleteTickets_Libera = function(id_empresa,referencia){
	strSql = `delete from tickets_libera 
		 where id_empresa = ${id_empresa} and  referencia = '${referencia}'  `;
 	return  db.oneOrNone(strSql);
}


