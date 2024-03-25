const express = require('express');
const router = express.Router();
const gruEcoSrv = require('../services/grupoEcoServices');


router.get('/api/grueco/:id_empresa/:codigo', async function(req, res) {
    try {
        const lsGrupoEco = await gruEcoSrv.getGrupoEco(req.params.id_empresa, req.params.codigo);
        if (lsGrupoEco == null) {
            res.status(409).json({ message: 'Grupo Econômico Não Encontrado.' });
        } else {
            res.status(200).json(lsGrupoEco);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOECO', message: err.message });

        }
    }
})

router.get('/api/gruecos', async function(req, res) {

    try {
        const lsGrupoEco = await gruEcoSrv.getGrupoEcos();

        if (lsGrupoEco.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsGrupoEco);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOECO', message: err.message });

        }
    }
})

router.post('/api/grueco', async function(req, res) {

    try {

        const grueco = req.body;

        const reg = await gruEcoSrv.insertGrupoEco(grueco)

        if (reg == null) {
            res.status(409).json({ message: 'Grupo Econômico Não Encontrado!' });
        } else {
            res.status(200).json(reg);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOECO', message: err.message });

        }
    }

});

router.put('/api/grueco', async function(req, res) {
    try {
        const grueco = req.body;
        const motivo = await gruEcoSrv.updateGrupoEco(grueco);
        res.status(200).json({ message: 'Grupo Econômico Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOECO', message: err.message });

        }
    }
});

router.delete('/api/grueco/:id_empresa/:id', async function(req, res) {
    try {

        await gruEcoSrv.deleteGrupoEco(req.params.id_empresa, req.params.id);

        res.status(200).json({ message: 'Grupo Econômico Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOECO', message: err.message });

        }
    }
});



//consultas post
router.post('/api/gruecos', async function(req, res) {
    /*
        {
            "id_empresa: 1", 
            "id" : 3,
            "razao" : "",
            "sharp" : true
        }
    */
    const params = req.body;

    console.log('gruecos params', params);

    try {
        const lsGrupo = await gruEcoSrv.getGrupoEcos(params);

        if (params.contador == "S") {

            res.status(200).json(lsGrupo);

        } else {

            if (lsGrupo.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsGrupo);
            }

        }
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPO ECONOMICO', message: err.message });

        }
    }
})



module.exports = router;