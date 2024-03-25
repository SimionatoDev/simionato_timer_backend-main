/* SERVICE condicoes_pagto */
const condicaoData = require('../data/condicaoData');
const validacao = require('../util/validacao');
const parametros = require('../util/parametrostabelas');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/regrasdenegocio');
const TABELA = 'CONDICOES_PAGTO';
/* CRUD GET SERVICE */
exports.getCondicao = async function(id_empresa,id){
	return condicaoData.getCondicao(id_empresa,id);
};
/* CRUD GET ALL SERVICE */
exports.getCondicoes = async function(params){
	return condicaoData.getCondicoes(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertCondicao = async function(condicao){
try 
{
//await regras.Clientes_Inclusao(cliente);
//validacao.Validacao(TABELA, cliente, parametros.Clientes());
	return condicaoData.insertCondicao(condicao);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateCondicao = async function(condicao){
try 
{
//await regras.Condicoes_Inclusao(condicao);
//validacao.Validacao(TABELA, condicao, parametros.Condicoes());
	return condicaoData.updateCondicao(condicao);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteCondicao = async function(id_empresa,id){
try 
{
//await regras.Condicoes_Exclusao(id_empresa,id);
//validacao.Validacao(TABELA, condicao, parametros.Condicoes());
	return condicaoData.deleteCondicao(id_empresa,id);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
