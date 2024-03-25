/* SERVICE tickets_libera */
const tickets_liberaData = require('../data/tickets_liberaData');
////const validacao = require('../util/validacao');
////const parametros = require('../util/parametrostabelas');
////const erroDB = require('../util/userfunctiondb');
////const regras = require('../util/regrasdenegocio');
const TABELA = 'TICKETS_LIBERA';
/* CRUD GET SERVICE */
exports.getTickets_Libera = async function(id_empresa,referencia){
	return tickets_liberaData.getTickets_Libera(id_empresa,referencia);
};
/* CRUD GET ALL SERVICE */
exports.getTicket_Libera = async function(params){
	return tickets_liberaData.getTicket_Libera(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertTickets_Libera = async function(tickets_libera){
try 
{
//await regras.Clientes_Inclusao(cliente);
//validacao.Validacao(TABELA, cliente, parametros.Clientes());
	return tickets_liberaData.insertTickets_Libera(tickets_libera);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateTickets_Libera = async function(tickets_libera){try 
{
//await regras.Ticket_Libera_Inclusao(tickets_libera);
//validacao.Validacao(TABELA, tickets_libera, parametros.Ticket_Libera());
	return tickets_liberaData.updateTickets_Libera(tickets_libera);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteTickets_Libera = async function(id_empresa,referencia){try 
{
//await regras.Ticket_Libera_Exclusao(id_empresa,referencia);
//validacao.Validacao(TABELA, tickets_libera, parametros.Ticket_Libera());
	return tickets_liberaData.deleteTickets_Libera(id_empresa,referencia);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
