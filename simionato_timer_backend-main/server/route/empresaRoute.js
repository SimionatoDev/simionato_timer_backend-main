const express = require('express');
const router = express.Router();
const empresaSrv = require('../services/empresaServices');


router.get('/api/empresa/:id', async function(req, res) {
    try {
        const lsEmpresas = await empresaSrv.getEmpresa(req.params.id);

        if (lsEmpresas == null) {
            res.status(409).json({ message: 'Empresa Não Encontrado.' });
        } else {
            res.status(200).json(lsEmpresas);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'EMPRESAS', message: err.message });

        }
    }
})

router.get('/api/empresas', async function(req, res) {

    try {

        const lsEmpresas = await empresaSrv.getEmpresas();

        if (lsEmpresas.length == 0) {
            res.status(409).json({ message: 'Nenhuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsEmpresas);
        }
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'EMPRESAS', message: err.message });

        }
    }
})


router.post('/api/empresa', async function(req, res) {

    try {

        const empresa = req.body;

        const tar = await empresaSrv.insertEmpresa(empresa);

        if (tar == null) {
            res.status(409).json({ message: 'Empresa Não Cadastrado!' });
        } else {
            res.status(200).json(tar);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'EMPRESAS', message: err.message });

        }
    }

});

router.put('/api/empresa', async function(req, res) {
    try {
        const empresa = req.body;
        const cli = await empresaSrv.updateEmpresa(empresa);
        res.status(200).json({ message: 'Empresa Alterada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'EMPRESA', message: err.message });

        }
    }
});

router.delete('/api/empresa/:id', async function(req, res) {
    try {

        await empresaSrv.deleteEmpresa(req.params.id);

        res.status(200).json({ message: 'Empresa Excluída Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'EMPRESAS', message: err.message });

        }
    }
});


/* consultas post */
router.post('/api/empresas', async function(req, res) {
    /*
        {
            "id" : 3,
            "razao" : "",
            "fantasi" : "",
            "cnpj_cpf" : "",
            "sharp" : true
        }
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsEmpresas = await empresaSrv.getEmpresas(params);

        if (params.contador == "S") {

            res.status(200).json(lsEmpresas);

        } else {

            if (lsEmpresas.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsEmpresas);
            }
        }

    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'EMPRESAS', message: err.message });

        }
    }
})

module.exports = router;