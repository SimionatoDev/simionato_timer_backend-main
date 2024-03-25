/* ROUTE tickets_periodo */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const tickets_periodoSrv = require('../service/tickets_periodoService');

/* ROTA GETONE tickets_periodo */
router.get("/api/tickets_periodo/:id_empresa/:referencia",async function(req, res) {try 
	{
		const lsLista = await tickets_periodoSrv.getTickets_Periodo(req.params.id_empresa,req.params.referencia);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Tickets_Periodo Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'tickets_periodo', message: err.message });
		}
	}
})
/* ROTA GETALL tickets_periodo */
router.get("/api/ticket_periodo",async function(req, res) {try 
	{
		const lsLista = await tickets_periodoSrv.getTicket_Periodo();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'tickets_periodo', message: err.message });
		}
	}
})
/* ROTA INSERT tickets_periodo */
router.post("/api/tickets_periodo",async function(req, res) {try 
	{
		const tickets_periodo = req.body;
		const registro = await tickets_periodoSrv.insertTickets_Periodo(tickets_periodo);		if (registro == null)
		{			res.status(409).json({ message: 'Tickets_Periodo Cadastrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Periodo', message: err.message });
		}
	}
})
/* ROTA UPDATE tickets_periodo */
router.put("/api/tickets_periodo",async function(req, res) {try 
	{
		const tickets_periodo = req.body;
		const registro = await tickets_periodoSrv.updateTickets_Periodo(tickets_periodo);		if (registro == null)
		{			res.status(409).json({ message: 'Tickets_Periodo Alterado Com Sucesso!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Periodo', message: err.message });
		}
	}
})
/* ROTA DELETE tickets_periodo */
router.delete("/api/tickets_periodo/:id_empresa/:referencia",async function(req, res) {try 
	{
		const tickets_periodo = req.body;
		await tickets_periodoSrv.deleteTickets_Periodo(req.params.id_empresa,req.params.referencia);		res.status(200).json({ message: 'Tickets_Periodo Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Tickets_Periodo', message: err.message });
		}
	}
})

module.exports = router;
