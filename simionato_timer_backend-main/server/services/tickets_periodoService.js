/* SERVICE tickets_periodo */
const tickets_periodoData = require('../data/tickets_periodoData');
////const validacao = require('../util/validacao');
////const parametros = require('../util/parametrostabelas');
////const erroDB = require('../util/userfunctiondb');
////const regras = require('../util/regrasdenegocio');
const TABELA = 'TICKETS_PERIODO';
/* CRUD GET SERVICE */
exports.getTickets_Periodo = async function(id_empresa,referencia){
	return tickets_periodoData.getTickets_Periodo(id_empresa,referencia);
};
/* CRUD GET ALL SERVICE */
exports.getTicket_Periodo = async function(params){
	return tickets_periodoData.getTicket_Periodo(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertTickets_Periodo = async function(tickets_periodo){
try 
{
//await regras.Clientes_Inclusao(cliente);
//validacao.Validacao(TABELA, cliente, parametros.Clientes());
	return tickets_periodoData.insertTickets_Periodo(tickets_periodo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateTickets_Periodo = async function(tickets_periodo){try 
{
//await regras.Ticket_Periodo_Inclusao(tickets_periodo);
//validacao.Validacao(TABELA, tickets_periodo, parametros.Ticket_Periodo());
	return tickets_periodoData.updateTickets_Periodo(tickets_periodo);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteTickets_Periodo = async function(id_empresa,referencia){try 
{
//await regras.Ticket_Periodo_Exclusao(id_empresa,referencia);
//validacao.Validacao(TABELA, tickets_periodo, parametros.Ticket_Periodo());
	return tickets_periodoData.deleteTickets_Periodo(id_empresa,referencia);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
