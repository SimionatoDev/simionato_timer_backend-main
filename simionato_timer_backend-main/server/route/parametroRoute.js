/* ROUTE parametros */
const db = require('../infra/database');
const express = require('express');
const router = express.Router();
const parametroSrv = require('../services/parametroService');

/* ROTA GETONE parametro */
router.get("/api/parametro/:id_empresa/:modulo/:assinatura/:id_usuario", async function(req, res) {
    try {
        console.log("GET PARAMETRO", req.params);
        const lsLista = await parametroSrv.getParametro(req.params.id_empresa, req.params.modulo, req.assinatura, req.params.id_usuario);
        if (lsLista == null) {
            res.status(409).json({ message: 'Parametro Não Encontrada.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'parametro', message: err.message });
        }
    }
})

/* ROTA GETALL parametro */
router.get("/api/parametros", async function(req, res) {
    try {
        const lsLista = await parametroSrv.getParametros();

        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'parametro', message: err.message });
        }
    }
})

/* ROTA INSERT parametro */
router.post("/api/parametro", async function(req, res) {
    try {
        console.log(req.body);
        const parametro = req.body;
        const registro = await parametroSrv.insertParametro(parametro);
        if (registro == null) {
            res.status(409).json({ message: 'Parametro Não Cadastrado!' });
        } else {
            res.status(200).json(registro);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Parametro', message: err.message });
        }
    }
})

/* ATUALIZA parametro */
router.post("/api/atualizarparametro", async function(req, res) {
    try {

        console.log(req.body);

        const parametro = req.body;

        const param = await parametroSrv.getParametro(parametro.id_empresa, parametro.modulo, parametro.assinatura, parametro.id_usuario);

        console.log('atualizarparametro seek', param);

        if (param.length == 0) {
            console.log('Inseri', parametro);
            const registro = await parametroSrv.insertParametro(parametro);
            if (registro == null) {
                res.status(409).json({ message: 'Parametro Não Cadastrado!' });
            } else {
                res.status(200).json(registro);
            }
        } else {
            console.log('Alterei', parametro);
            const registro = await parametroSrv.updateParametro(parametro);
            if (registro == null) {
                res.status(409).json({ message: 'Parametro Alterado Com Sucesso!' });
            } else {
                res.status(200).json(registro);
            }
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Parametro', message: err.message });
        }
    }
})

/* ROTA UPDATE parametro */
router.put("/api/parametro", async function(req, res) {
    try {
        const parametro = req.body;
        console.log(req.body);
        const registro = await parametroSrv.updateParametro(parametro);
        if (registro == null) {
            res.status(409).json({ message: 'Parametro Alterado Com Sucesso!' });
        } else {
            res.status(200).json(registro);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Parametro', message: err.message });
        }
    }
})

/* ROTA DELETE parametro */
router.delete("/api/parametro/:id_empresa/:modulo/:assinatura/:id_usuario", async function(req, res) {
    try {
        const parametro = req.body;
        await parametroSrv.deleteParametro(parametro.id_empresa, parametro.modulo, parametro.assinatura, parametro.id_usuario);
        res.status(200).json({ message: 'Parametro Excluído Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'Parametro', message: err.message });
        }
    }
})

//consultas post
router.post('/api/parametros', async function(req, res) {
    /*
        public id_empresa: number = 0;
        public modulo: string = '';
        public assinatura: string = '';
        public id_usuario: number = 0;
        public pagina: number = 0;
        public tamPagina: number = 50;
        public contador: string = 'N';
        public orderby: string = '';
        public sharp: Boolean = false;
    */
    const params = req.body;

    console.log('params=>Parametros', params);

    try {

        const lsParametros = await parametroSrv.getParametros(params);

        if (params.contador == "S") {

            res.status(200).json(lsParametros);

        } else {

            if (lsParametros.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsParametros);
            }

        }
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PARAMETROS', message: err.message });

        }
    }
})


module.exports = router;