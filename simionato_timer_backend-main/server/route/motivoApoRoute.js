const express = require('express');
const router = express.Router();
const motivoApoSrv = require('../services/motivoApoServices');


router.get('/api/motivoapo/:id_empresa/:codigo', async function(req, res) {
    try {
        const lsMotivoApo = await motivoApoSrv.getMotivoApo(req.params.id_empresa, req.params.codigo);
        if (lsMotivoApo == null) {
            res.status(409).json({ message: 'Motivo Apontamento Não Encontrado.' });
        } else {
            res.status(200).json(lsMotivoApo);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'MOTIVOAPOS', message: err.message });

        }
    }
})

router.get('/api/motivoapos', async function(req, res) {

    try {
        const lsMotivoApo = await motivoApoSrv.getMotivoApos();

        if (lsMotivoApo.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsMotivoApo);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'MOTIVOAPOS', message: err.message });

        }
    }
})

router.post('/api/motivoapo', async function(req, res) {

    try {

        const motivoApo = req.body;

        const reg = await motivoApoSrv.insertMotivoApo(motivoApo);

        if (reg == null) {
            res.status(409).json({ message: 'Motivo Apontamento Não Encontrado!' });
        } else {
            res.status(200).json(reg);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'MOTIVOAPOS', message: err.message });

        }
    }

});

router.put('/api/motivoapo', async function(req, res) {
    try {
        const motivoApo = req.body;
        const motivo = await motivoApoSrv.updateMotivoApo(motivoApo);
        res.status(200).json({ message: 'Motivo Apontamento Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'MOTIVOAPOS', message: err.message });

        }
    }
});

router.delete('/api/motivoapo/:id_empresa/:codigo', async function(req, res) {
    try {

        await motivoApoSrv.deleteMotivoApo(req.params.id_empresa, req.params.codigo);

        res.status(200).json({ message: 'Motivo Apontamento Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'MOTIVOAPOS', message: err.message });

        }
    }
});

//consultas post
router.post('/api/motivoapos', async function(req, res) {
    /*
        {
            "id_empresa": 1, 
            "codigo" : "",
            "motivo" : "",
            "sintetico":'';
             analitico":'';
            "orderby": ""
            "sharp" : true
        }
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsMotivos = await motivoApoSrv.getMotivoApos(params);
        if (lsMotivos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsMotivos);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'MOTIVOS DE APONTAMENTO', message: err.message });

        }
    }
})



module.exports = router;