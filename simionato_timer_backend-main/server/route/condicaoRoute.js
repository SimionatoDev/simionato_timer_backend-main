/* ROUTE condicoes_pagto */
const db = require('../infra/database');
const express = require('express');
const router = express.Router();
const condicaoSrv = require('../services/condicaoService');

/* ROTA GETONE condicao */
router.get("/api/condicao/:id_empresa/:id", async function(req, res) {
        try {
            const lsLista = await condicaoSrv.getCondicao(req.params.id_empresa, req.params.id);
            if (lsLista == null) {
                res.status(409).json({ message: 'Condicao Não Encontrada.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'condicao', message: err.message });
            }
        }
    })
    /* ROTA GETALL condicao */
router.get("/api/condicoes", async function(req, res) {
        try {
            const lsLista = await condicaoSrv.getCondicoes();
            if (lsLista.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'condicao', message: err.message });
            }
        }
    })
    /* ROTA INSERT condicao */
router.post("/api/condicao", async function(req, res) {
        try {
            const condicao = req.body;
            const registro = await condicaoSrv.insertCondicao(condicao);
            if (registro == null) {
                res.status(409).json({ message: 'Condicao Cadastrado!' });
            } else {
                res.status(200).json(registro);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Condicao', message: err.message });
            }
        }
    })
    /* ROTA UPDATE condicao */
router.put("/api/condicao", async function(req, res) {
        try {
            const condicao = req.body;
            const registro = await condicaoSrv.updateCondicao(condicao);
            if (registro == null) {
                res.status(409).json({ message: 'Condicao Alterado Com Sucesso!' });
            } else {
                res.status(200).json(registro);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Condicao', message: err.message });
            }
        }
    })
    /* ROTA DELETE condicao */
router.delete("/api/condicao/:id_empresa/:id", async function(req, res) {
    try {
        const condicao = req.body;
        await condicaoSrv.deleteCondicao(req.params.id_empresa, req.params.id);
        res.status(200).json({ message: 'Condicao Excluído Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Condicao', message: err.message });
        }
    }
})

//consultas post
router.post('/api/condicoes', async function(req, res) {
    /*
        {
            "id_empresa"  : 1 , 
            "id"          : "",
            "descricao"   : "",
            "orderby"     : '';
            "sharp"       : true
        }
    */
    const params = req.body;

    try {
        const lsLista = await condicaoSrv.getCondicoes(params);
        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'COND. PAGTO', message: err.message });

        }
    }
});


module.exports = router;