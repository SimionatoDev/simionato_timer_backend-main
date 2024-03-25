const express = require('express');
const router = express.Router();
const feriadoSrv = require('../services/feriadoServices');


router.get('/api/feriado/:id_empresa/:id_usuario:/id_tipo/:data', async function(req, res) {
    try {
        const searchRegExp = /_/g;
        const data = req.params.data.replace(searchRegExp, '/');
        const lsFeriados = await feriadoSrv.getFeriado(req.params.id_empresa, req.params.id_usuario, req.params.id_tipo, data);
        if (lsFeriados == null) {
            res.status(409).json({ message: 'Feriado Não Encontrado.' });
        } else {
            res.status(200).json(lsFeriados);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'FERIADOS', message: err.message });

        }
    }
})

router.get('/api/feriados', async function(req, res) {

    try {
        const lsFeriados = await feriadoSrv.getFeriados();

        if (lsFeriados.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsFeriados);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'FERIADOS', message: err.message });

        }
    }
})

router.post('/api/feriado', async function(req, res) {

    try {

        console.log('Post feriado', req.body);

        const feriado = req.body;

        const reg = await feriadoSrv.insertFeriado(feriado);

        if (reg == null) {
            res.status(409).json({ message: 'Feriado Não Cadastrato!' });
        } else {
            res.status(200).json(reg);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'FERIADOS', message: err.message });

        }
    }

});


router.post('/api/allpontes', async function(req, res) {

    try {

        console.log('allpontes', req.body);

        const lsPontes = req.body;

        for await (let ponte of lsPontes) {

            const reg = await feriadoSrv.insertFeriado(ponte);

        }
        res.status(200).json({ message: 'Ponte Cadastrada!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PONTES', message: err.message });

        }
    }

});

router.post('/api/alterpontes', async function(req, res) {

    try {

        console.log('alterpontes', req.body);

        const params = req.body;

        for await (let param of params) {
            //Inclusao
            if (param.acao == 1) {
                const reg = await feriadoSrv.insertFeriado(param.feriado);
            }
            //Exclusao
            if (param.acao == 4) {
                const reg = await feriadoSrv.deleteFeriado(param.feriado.id_empresa, param.feriado.id_usuario, param.feriado.id_tipo, param.feriado.data);
            }
        }

        res.status(200).json({ message: 'Alteração Executada Com Sucesso' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PONTES', message: err.message });

        }
    }

});


router.put('/api/feriado', async function(req, res) {
    try {
        const feriado = req.body;
        const user = await feriadoSrv.updateFeriado(feriado);
        res.status(200).json({ message: 'Feriado Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'FERIADOS', message: err.message });

        }
    }
});


router.put('/api/alterpontedescricao', async function(req, res) {
    try {
        /*
         public id_empresa: number = 0;
         public data: string = '';
         public descricao: string = '';
         public total: number = 0;
        */
        const ponte = req.body;
        const lsPontes = await feriadoSrv.updatePonte(ponte);
        res.status(200).json({ message: 'Descrição Da Ponte Alterada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PONTES', message: err.message });

        }
    }
});

router.delete('/api/feriado/:id_empresa/:id_usuario/:id_tipo/:data', async function(req, res) {
    try {
        const searchRegExp = /_/g;
        const data = req.params.data.replace(searchRegExp, '/');
        await feriadoSrv.deleteFeriado(req.params.id_empresa, req.params.id_usuario, req.params.id_tipo, data);

        res.status(200).json({ message: 'Feriado Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'FERIADOS', message: err.message });

        }
    }
});



router.delete('/api/ponte/:id_empresa/:data', async function(req, res) {
    try {
        const searchRegExp = /_/g;
        const data = req.params.data.replace(searchRegExp, '/');
        await feriadoSrv.deletePonte(req.params.id_empresa, data);

        res.status(200).json({ message: 'Ponte Excluída Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PONTES', message: err.message });

        }
    }
});

router.post('/api/feriados', async function(req, res) {

    const params = req.body;

    console.log('params=>Rota Feriados', params);

    try {

        const lsferiados = await feriadoSrv.getFeriados(params);

        if (params.contador == "S") {

            res.status(200).json(lsferiados);

        } else {

            if (lsferiados.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsferiados);
            }

        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'FERIADOS', message: err.message });

        }
    }
})

module.exports = router;