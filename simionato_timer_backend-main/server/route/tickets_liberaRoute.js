/* ROUTE tickets_libera */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const tickets_liberaSrv = require('../service/tickets_liberaService');

/* ROTA GETONE tickets_libera */
router.get("/api/tickets_libera/:id_empresa/:referencia",async function(req, res) {try 
	{
		const lsLista = await tickets_liberaSrv.getTickets_Libera(req.params.id_empresa,req.params.referencia);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Tickets_Libera Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'tickets_libera', message: err.message });
		}
	}
})
/* ROTA GETALL tickets_libera */
router.get("/api/ticket_libera",async function(req, res) {try 
	{
		const lsLista = await tickets_liberaSrv.getTicket_Libera();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'tickets_libera', message: err.message });
		}
	}
})
/* ROTA INSERT tickets_libera */
router.post("/api/tickets_libera",async function(req, res) {try 
	{
		const tickets_libera = req.body;
		const registro = await tickets_liberaSrv.insertTickets_Libera(tickets_libera);		if (registro == null)
		{			res.status(409).json({ message: 'Tickets_Libera Cadastrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Libera', message: err.message });
		}
	}
})
/* ROTA UPDATE tickets_libera */
router.put("/api/tickets_libera",async function(req, res) {try 
	{
		const tickets_libera = req.body;
		const registro = await tickets_liberaSrv.updateTickets_Libera(tickets_libera);		if (registro == null)
		{			res.status(409).json({ message: 'Tickets_Libera Alterado Com Sucesso!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Libera', message: err.message });
		}
	}
})
/* ROTA DELETE tickets_libera */
router.delete("/api/tickets_libera/:id_empresa/:referencia",async function(req, res) {try 
	{
		const tickets_libera = req.body;
		await tickets_liberaSrv.deleteTickets_Libera(req.params.id_empresa,req.params.referencia);		res.status(200).json({ message: 'Tickets_Libera Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Libera', message: err.message });
		}
	}
})

module.exports = router;
