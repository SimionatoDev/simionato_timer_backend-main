/* ROUTE atividades */
const db = require('../infra/database');
const express = require('express');
const router = express.Router();
const atividadeSrv = require('../services/atividadeService');

/* ROTA GETONE atividade */
router.get("/api/atividade/:id_empresa/:id", async function(req, res) {
        try {
            const lsLista = await atividadeSrv.getAtividade(req.params.id_empresa, req.params.id);
            if (lsLista == null) {
                res.status(409).json({ message: 'Atividade Não Encontrada.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'atividade', message: err.message });
            }
        }
    })
    /* ROTA GETALL atividade */
router.get("/api/atividades", async function(req, res) {
        try {
            const lsLista = await atividadeSrv.getAtividades();
            if (lsLista.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsLista);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'atividade', message: err.message });
            }
        }
    })
    /* ROTA INSERT atividade */
router.post("/api/atividade", async function(req, res) {
        try {
            const atividade = req.body;
            const registro = await atividadeSrv.insertAtividade(atividade);
            if (registro == null) {
                res.status(409).json({ message: 'Atividade Não Cadastrada!' });
            } else {
                res.status(200).json(registro);
            }
        } catch (err) {
            if (err.name == 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
            }
        }
    })
    /* ROTA UPDATE atividade */
router.put("/api/atividade", async function(req, res) {
    try {
        const atividade = req.body;
        const registro = await atividadeSrv.updateAtividade(atividade);
        if (registro == null) {
            res.status(409).json({ message: 'Atividade Não Alterada !' });
        } else {
            res.status(200).json(registro);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
        }
    }
})


router.put("/api/updateAtividadehorasdir", async function(req, res) {
    try {
        console.log("updateAtividadehorasdir");
        const atividadeHorasDir = req.body;
        const registro = await atividadeSrv.updateAtividadeHorasDir(atividadeHorasDir);
        if (registro == null) {
            res.status(409).json({ message: 'Horas Da Diretoria Não Alterada!' });
        } else {
            res.status(200).json(registro);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade - Hora Diretoria', message: err.message });
        }
    }
})

/* ROTA DELETE atividade */
router.delete("/api/atividade/:id_empresa/:id_projeto/:conta/:versao/:subconta", async function(req, res) {
    try {
        console.log("deleteatividade", req.params);
        await atividadeSrv.deleteAtividade(req.params.id_empresa, req.params.id_projeto, req.params.conta, req.params.versao, req.params.subconta);
        res.status(200).json({ message: 'Atividade Excluída Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
        }
    }
})


/* ROTA  anexa atividade */
router.get("/api/anexaatividade/:id_empresa/:conta/:versao/:id_projeto/:id_exec/:id_resp", async function(req, res) {
    try {
        console.log('Entrei no anexo...');
        await atividadeSrv.anexaAtividade(req.params.id_empresa, req.params.conta, req.params.versao, req.params.id_projeto, req.params.id_exec, req.params.id_resp);
        res.status(200).json({ message: 'Atividade Anexada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
        }
    }
})

/* ROTA  anexa atividadev2 */
router.post("/api/anexaatividadev2", async function(req, res) {
    try {
        const atividades = req.body;
        console.log("anexaatividadev2");
        await atividadeSrv.anexaAtividadev2(atividades);
        res.status(200).json({ message: 'Atividade Anexada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
        }
    }
})

/* ROTA  anexa atividade */
router.get("/api/desanexaatividade/:id_empresa/:conta/:versao/:id_projeto", async function(req, res) {
    try {
        console.log('desanexaatividade');
        await atividadeSrv.desanexaAtividade(req.params.id_empresa, req.params.conta, req.params.versao, req.params.id_projeto);
        res.status(200).json({ message: 'Atividade Desanexada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
        }
    }
})

/* ROTA  desanexarsubconta */
router.get("/api/desanexasubconta/:id_empresa/:id_projeto/:id_conta/:id_conta_versao/:id_subconta/:nivel", async function(req, res) {
    try {
        console.log('desanexarsubconta');
        await atividadeSrv.desanexasubconta(req.params.id_empresa, req.params.id_projeto, req.params.id_conta, req.params.id_conta_versao, req.params.id_subconta, req.params.nivel);
        res.status(200).json({ message: 'SubAtividade Apagada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Atividade', message: err.message });
        }
    }
})

//consultas post
router.post('/api/atividades', async function(req, res) {
    /*
        public id_empresa: number = 0;
        public id: number = 0;
        public id_projeto: number = 0;
        public conta: string = '';
        public versao: string = '';
        public subconta: string = '';
        public tipo:string = '';
        public nivel: number = 0;
        public id_resp: number = 0;
        public id_exec: number = 0;
        public id_subcliente: number = 0;
        public so_abertas_ex: string = '';
        public orderby: string = '';
        public sharp: Boolean = true;
    */
    const params = req.body;

    try {
        const lsLista = await atividadeSrv.getAtividades(params);

        console.log('Parametros ATIVIDADES');
        console.log(params);
        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ATIVIDADES', message: err.message });

        }
    }
})


router.post('/api/atividadesvazia', async function(req, res) {
    /*
        public id_empresa: number = 0;
        public conta: string = '';
        public versao: string = '';
        public id_projeto: number = 0;
        public id_resp: number = 0;
        public id_exec: number = 0;
    */
    const params = req.body;

    try {


        console.log('Parametros ATIVIDADES VAZIAS');
        console.log(params);

        const lsLista = await atividadeSrv.getAtividadesVazia(params);

        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ATIVIDADES', message: err.message });

        }
    }
})

module.exports = router;