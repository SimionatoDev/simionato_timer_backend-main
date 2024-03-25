/* SERVICE tickets_movi */
const tickets_moviData = require('../data/tickets_moviData');
////const validacao = require('../util/validacao');
////const parametros = require('../util/parametrostabelas');
////const erroDB = require('../util/userfunctiondb');
////const regras = require('../util/regrasdenegocio');
const TABELA = 'TICKETS_MOVI';
/* CRUD GET SERVICE */
exports.getTickets_Movi = async function(id_empresa,id_usuario,data_ref){
	return tickets_moviData.getTickets_Movi(id_empresa,id_usuario,data_ref);
};
/* CRUD GET ALL SERVICE */
exports.getTicket_Movi = async function(params){
	return tickets_moviData.getTicket_Movi(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertTickets_Movi = async function(tickets_movi){
try 
{
//await regras.Clientes_Inclusao(cliente);
//validacao.Validacao(TABELA, cliente, parametros.Clientes());
	return tickets_moviData.insertTickets_Movi(tickets_movi);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateTickets_Movi = async function(tickets_movi){try 
{
//await regras.Ticket_Movi_Inclusao(tickets_movi);
//validacao.Validacao(TABELA, tickets_movi, parametros.Ticket_Movi());
	return tickets_moviData.updateTickets_Movi(tickets_movi);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteTickets_Movi = async function(id_empresa,id_usuario,data_ref){try 
{
//await regras.Ticket_Movi_Exclusao(id_empresa,id_usuario,data_ref);
//validacao.Validacao(TABELA, tickets_movi, parametros.Ticket_Movi());
	return tickets_moviData.deleteTickets_Movi(id_empresa,id_usuario,data_ref);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
