/* DATA tickets_movi */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Tickets_Movi){
return [ 
			Tickets_Movi.id_empresa, 
			Tickets_Movi.id_usuario, 
			Tickets_Movi.data_ref, 
			Tickets_Movi.util, 
			Tickets_Movi.feriado, 
			Tickets_Movi.ponte, 
			Tickets_Movi.afastado, 
			Tickets_Movi.ferias, 
			Tickets_Movi.horas, 
			Tickets_Movi.total, 
			Tickets_Movi.user_insert, 
			Tickets_Movi.user_update, 
 ]; 
}; 


/* CRUD GET */
exports.getTickets_Movi = function(id_empresa,id_usuario,data_ref){
	return db.oneOrNone("select " +  
	"   tickets_movi.id_empresa as  id_empresa " +  
	",  tickets_movi.id_usuario as  id_usuario " +  
	", to_char(tickets_movi.data_ref, 'DD/MM/YYYY') as data_ref  " + 
	",  tickets_movi.util as  util " +  
	",  tickets_movi.feriado as  feriado " +  
	",  tickets_movi.ponte as  ponte " +  
	",  tickets_movi.afastado as  afastado " +  
	",  tickets_movi.ferias as  ferias " +  
	",  tickets_movi.horas as  horas " +  
	",  tickets_movi.total as  total " +  
	",  tickets_movi.user_insert as  user_insert " +  
	",  tickets_movi.user_update as  user_update " +    
	"from tickets_movi " +
	"where  tickets_movi.id_empresa = $1  and  tickets_movi.id_usuario = $2  and  tickets_movi.data_ref = $3   ", [id_empresa,id_usuario,data_ref]);
}
/* CRUD GET ALL*/
exports.getTicket_Movi = function(params){
if (params) {
	return db.manyOrNone("select " +  
	"   tickets_movi.id_empresa as  id_empresa " +  
	",  tickets_movi.id_usuario as  id_usuario " +  
	", to_char(tickets_movi.data_ref, 'DD/MM/YYYY') as data_ref  " + 
	",  tickets_movi.util as  util " +  
	",  tickets_movi.feriado as  feriado " +  
	",  tickets_movi.ponte as  ponte " +  
	",  tickets_movi.afastado as  afastado " +  
	",  tickets_movi.ferias as  ferias " +  
	",  tickets_movi.horas as  horas " +  
	",  tickets_movi.total as  total " +  
	",  tickets_movi.user_insert as  user_insert " +  
	",  tickets_movi.user_update as  user_update " +    
	"from tickets_movi " +
	"order by id_empresa,id ");
}
else 
{
	return db.manyOrNone("select " +  
	"   tickets_movi.id_empresa as  id_empresa " +  
	",  tickets_movi.id_usuario as  id_usuario " +  
	", to_char(tickets_movi.data_ref, 'DD/MM/YYYY') as data_ref  " + 
	",  tickets_movi.util as  util " +  
	",  tickets_movi.feriado as  feriado " +  
	",  tickets_movi.ponte as  ponte " +  
	",  tickets_movi.afastado as  afastado " +  
	",  tickets_movi.ferias as  ferias " +  
	",  tickets_movi.horas as  horas " +  
	",  tickets_movi.total as  total " +  
	",  tickets_movi.user_insert as  user_insert " +  
	",  tickets_movi.user_update as  user_update " +    
	"from tickets_movi " +
	"order by id_empresa,id ");
}
}
/* CRUD - INSERT */
 exports.insertTickets_Movi = function(tickets_movi){
	strSql = `insert into tickets_movi (
		     id_empresa 
		 ,   id_usuario 
		 ,   data_ref 
		 ,   util 
		 ,   feriado 
		 ,   ponte 
		 ,   afastado 
		 ,   ferias 
		 ,   horas 
		 ,   total 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${tickets_movi.id_empresa} 
		 ,   ${tickets_movi.id_usuario} 
		 ,   '${tickets_movi.data_ref}' 
		 ,   '${tickets_movi.util}' 
		 ,   '${tickets_movi.feriado}' 
		 ,   '${tickets_movi.ponte}' 
		 ,   '${tickets_movi.afastado}' 
		 ,   '${tickets_movi.ferias}' 
		 ,   ${tickets_movi.horas} 
		 ,   ${tickets_movi.total} 
		 ,   ${tickets_movi.user_insert} 
		 ,   ${tickets_movi.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateTickets_Movi = function(tickets_movi){
	strSql = `update  set tickets_movi  
		     util = '${tickets_movi.util}' 
 		 ,   feriado = '${tickets_movi.feriado}' 
 		 ,   ponte = '${tickets_movi.ponte}' 
 		 ,   afastado = '${tickets_movi.afastado}' 
 		 ,   ferias = '${tickets_movi.ferias}' 
 		 ,   horas = ${tickets_movi.horas} 
 		 ,   total = ${tickets_movi.total} 
 		 ,   user_insert = ${tickets_movi.user_insert} 
 		 ,   user_update = ${tickets_movi.user_update} 
 		 where id_empresa = ${tickets_movi.id_empresa} and  id_usuario = ${tickets_movi.id_usuario} and  data_ref = '${tickets_movi.data_ref}'  returning * `;
	return  db.oneOrNone(strSql);
}


/* CRUD - DELETE */
 exports.deleteTickets_Movi = function(id_empresa,id_usuario,data_ref){
	strSql = `delete from tickets_movi 
		 where id_empresa = ${id_empresa} and  id_usuario = ${id_usuario} and  data_ref = '${data_ref}'  `;
 	return  db.oneOrNone(strSql);
}


