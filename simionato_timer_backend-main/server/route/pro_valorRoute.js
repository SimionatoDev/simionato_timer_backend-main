/* ROUTE projeto_valores */
const db = require('../infra/database');
const express = require('express');
const router = express.Router();
const pro_valorSrv = require('../services/pro_valorService');

/* ROTA GETONE pro_valor */
router.get("/api/pro_valor/:id_empresa/:id", async function(req, res) {
        try {
            const lsLista = await pro_valorSrv.getPro_Valor(req.params.id_empresa, req.params.id);
            if (lsLista == null) {
                res.status(409).json({ message: 'Pro_Valor Não Encontrada.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'pro_valor', message: err.message });
            }
        }
    })
    /* ROTA GETALL pro_valor */
router.get("/api/pro_valores", async function(req, res) {
        try {
            const lsLista = await pro_valorSrv.getPro_Valores();
            if (lsLista.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'pro_valor', message: err.message });
            }
        }
    })
    /* ROTA INSERT pro_valor */
router.post("/api/pro_valor", async function(req, res) {
        try {
            const pro_valor = req.body;
            const registro = await pro_valorSrv.insertPro_Valor(pro_valor);
            if (registro == null) {
                res.status(409).json({ message: 'Pro_Valor Cadastrado!' });
            } else {
                res.status(200).json(registro);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Pro_Valor', message: err.message });
            }
        }
    })
    /* ROTA UPDATE pro_valor */
router.put("/api/pro_valor", async function(req, res) {
        try {
            const pro_valor = req.body;
            const registro = await pro_valorSrv.updatePro_Valor(pro_valor);
            if (registro == null) {
                res.status(409).json({ message: 'Pro_Valor Alterado Com Sucesso!' });
            } else {
                res.status(200).json(registro);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Pro_Valor', message: err.message });
            }
        }
    })
    /* ROTA DELETE pro_valor */
router.delete("/api/pro_valor/:id_empresa/:id", async function(req, res) {
    try {
        const pro_valor = req.body;
        await pro_valorSrv.deletePro_Valor(req.params.id_empresa, req.params.id);
        res.status(200).json({ message: 'Pro_Valor Excluído Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Pro_Valor', message: err.message });
        }
    }
})

//consultas post
router.post('/api/pro_valores', async function(req, res) {
    /*
        {
            "id_empresa"    :  0 ,
            "id"            :  0 ,
            "id_projeto"    :  0 ,
            "id_diretor"    :  0 ,
            "id_cond_pgto"  :  0 ,
            "descricao"     :  "",
            "orderby"       : '',
            "sharp"         : true
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