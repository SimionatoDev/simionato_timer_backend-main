/* ROUTE titulos_projeto */
const db = require('../infra/database');
const shared = require('../util/shared');
const express = require('express');
const router = express.Router();
const titulo_projetoSrv = require('../services/titulo_projetoService');

/* ROTA GETONE titulo_projeto */
router.get("/api/titulo_projeto/:id_empresa/:id_projeto/:data_vencto", async function(req, res) {
        const searchRegExp = /_/g;
        const vencto = req.params.data_vencto.replace(searchRegExp, '/');
        try {
            const lsLista = await titulo_projetoSrv.getTitulo_Projeto(req.params.id_empresa, req.params.id_projeto, vencto);
            if (lsLista == null) {
                res.status(409).json({ message: 'Titulo_Projeto Não Encontrada.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'titulo_projeto', message: err.message });
            }
        }
    })
    /* ROTA GETALL titulo_projeto */
router.get("/api/titulos_projeto", async function(req, res) {
    try {
        const lsLista = await titulo_projetoSrv.getTitulos_Projeto();
        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'titulo_projeto', message: err.message });
        }
    }
})


/* ROTA INSERT titulo_projeto */
router.post("/api/titulo_projeto", async function(req, res) {
    try {
        const titulo_projeto = req.body;
        console.log("Rota titulo_projeto", titulo_projeto);
        const registro = await titulo_projetoSrv.insertTitulo_Projeto(titulo_projeto);
        if (registro == null) {
            res.status(409).json({ message: 'Titulo_Projeto Não Cadastrado!' });
        } else {
            res.status(200).json(registro);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Titulo_Projeto', message: err.message });
        }
    }
})

/* ROTA UPDATE titulo_projeto */
router.put("/api/titulo_projeto", async function(req, res) {
        try {
            const titulo_projeto = req.body;
            console.log('params=>Rota UPDATE titulosprojeto', titulo_projeto);
            const registro = await titulo_projetoSrv.updateTitulo_Projeto(titulo_projeto);
            if (registro == null) {
                res.status(409).json({ message: 'Titulo_Projeto Não Alterado!' });
            } else {
                res.status(200).json(registro);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Titulo_Projeto', message: err.message });
            }
        }
    })
    /* ROTA DELETE titulo_projeto */
router.delete("/api/titulo_projeto/:id_empresa/:id_projeto/:data_vencto", async function(req, res) {
        console.log('params=>Rota delete titulosprojeto', req.params.id_empresa, req.params.id_projeto, req.params.data_vencto);
        const searchRegExp = /_/g;
        const vencto = req.params.data_vencto.replace(searchRegExp, '/');
        try {
            const titulo_projeto = req.body;
            await titulo_projetoSrv.deleteTitulo_Projeto(req.params.id_empresa, req.params.id_projeto, vencto);
            res.status(200).json({ message: 'Titulo_Projeto Excluído Com Sucesso!' });
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Titulo_Projeto', message: err.message });
            }
        }
    })
    //consultas post
router.post('/api/titulosprojeto', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
			public id_projeto: number = 0;	
			public data_vencto:string =  ""  ; 
			public data_pagto:string =   "" ; 
			public pagina: number = 0;
			public tamPagina: number = 50;
			public contador: string = 'N';
			public orderby: string = '';
			public sharp: boolean = false;
        }
    */
    const params = req.body;

    console.log('params=>Rota titulosprojeto', params);

    try {

        const lsTitulos = await titulo_projetoSrv.getTitulos_Projeto(params);

        if (params.contador == "S") {

            res.status(200).json(lsTitulos);

        } else {

            if (lsTitulos.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsTitulos);
            }

        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'TíTULOS', message: err.message });

        }
    }
})

//Gravação de um array
router.post("/api/titulo_projeto_save_all", async function(req, res) {
    try {
        const titulos = req.body;
        titulos.forEach(
            async(titulo_projeto) => {
                const registro = await titulo_projetoSrv.insertTitulo_Projeto(titulo_projeto);
            });
        res.status(200).json({ message: 'Títulos Gravados Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Titulo_Projeto', message: err.message });
        }
    }
})


//consultas post
router.post('/api/getresumoprojetostitulos', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
			public id_projeto: number = 0;	
			public data_vencto:string =  ""  ; 
			public data_pagto:string =   "" ; 
			public pagina: number = 0;
			public tamPagina: number = 50;
			public contador: string = 'N';
			public orderby: string = '';
			public sharp: boolean = false;
        }
    */
    const params = req.body;

    console.log('params=>Rota getresumoprojetostitulos', params);

    try {

        const lsTitulos = await titulo_projetoSrv.getResumoProjetosTitulos(params);

        if (params.contador == "S") {

            res.status(200).json(lsTitulos);

        } else {

            if (lsTitulos.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsTitulos);
            }

        }
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'TíTULOS', message: err.message });

        }
    }
})

module.exports = router;