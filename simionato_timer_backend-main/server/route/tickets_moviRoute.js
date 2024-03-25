/* ROUTE tickets_movi */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const tickets_moviSrv = require('../service/tickets_moviService');

/* ROTA GETONE tickets_movi */
router.get("/api/tickets_movi/:id_empresa/:id_usuario/:data_ref",async function(req, res) {try 
	{
		const lsLista = await tickets_moviSrv.getTickets_Movi(req.params.id_empresa,req.params.id_usuario,req.params.data_ref);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Tickets_Movi Não Encontrada.' });
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'tickets_movi', message: err.message });
		}
	}
})
/* ROTA GETALL tickets_movi */
router.get("/api/ticket_movi",async function(req, res) {try 
	{
		const lsLista = await tickets_moviSrv.getTicket_Movi();
		if (lsLista.length == 0) 
		{
			res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.'} );
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'tickets_movi', message: err.message });
		}
	}
})
/* ROTA INSERT tickets_movi */
router.post("/api/tickets_movi",async function(req, res) {try 
	{
		const tickets_movi = req.body;
		const registro = await tickets_moviSrv.insertTickets_Movi(tickets_movi);		if (registro == null)
		{			res.status(409).json({ message: 'Tickets_Movi Cadastrado!' });
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Movi', message: err.message });
		}
	}
})
/* ROTA UPDATE tickets_movi */
router.put("/api/tickets_movi",async function(req, res) {try 
	{
		const tickets_movi = req.body;
		const registro = await tickets_moviSrv.updateTickets_Movi(tickets_movi);		if (registro == null)
		{			res.status(409).json({ message: 'Tickets_Movi Alterado Com Sucesso!' });
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Movi', message: err.message });
		}
	}
})
/* ROTA DELETE tickets_movi */
router.delete("/api/tickets_movi/:id_empresa/:id_usuario/:data_ref",async function(req, res) {try 
	{
		const tickets_movi = req.body;
		await tickets_moviSrv.deleteTickets_Movi(req.params.id_empresa,req.params.id_usuario,req.params.data_ref);		res.status(200).json({ message: 'Tickets_Movi Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Movi', message: err.message });
		}
	}
})

module.exports = router;
