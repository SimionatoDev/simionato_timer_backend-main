const express = require('express');
const router = express.Router();
const auditoriaSrv = require('../services/auditoriaService.js');

router.get('/api/auditoria/:id_empresa/:id', async function(req, res) {
    try {
        const lsAuditorias = await auditoriaSrv.getAuditoria(req.params.id_empresa, req.params.id);
        if (lsAuditorias == null) {
            res.status(409).json({ message: 'Auditoria Não Encontrada.' });
        } else {
            res.status(200).json(lsAuditorias);
        }
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'AUDITORIA', message: err.message });

        }
    }
})

router.get('/api/auditorias', async function(req, res) {

    try {
        const lsAuditorias = await auditoriaSrv.getAuditorias(req.params);

        if (lsAuditorias.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsAuditorias);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'AUDITORIA', message: err.message });

        }
    }
})

router.post('/api/auditoria', async function(req, res) {


    try {

        const auditoria = req.body;

        console.log("Olha Como Cheguei!", auditoria);

        const audi = await auditoriaSrv.insertAuditoria(auditoria);

        if (audi == null) {
            res.status(409).json({ message: 'Falha Na Inclusão!' });
        } else {
            res.status(200).json(audi);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'AUDITORIA', message: err.message });

        }
    }

});

router.put('/api/auditoria', async function(req, res) {
    try {
        const auditoria = req.body;
        const audi = await auditoriaSrv.updateAuditoria(auditoria);
        res.status(200).json({ message: 'Auditoria Alterada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'AUDITORIA', message: err.message });

        }
    }
});

router.delete('/api/auditoria/:id_empresa/:id', async function(req, res) {
    try {
        await auditoriaSrv.deleteAuditoria(req.params.id_empresa, req.params.id);
        res.status(200).json({ message: 'Auditoria Exclída Com Sucesso!' });
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'AUDITORIA', message: err.message });

        }
    }
});



//consultas post
router.post('/api/auditorias', async function(req, res) {
    /*
        {
            "id_empresa"  : 1 , 
            "id"          : "",
            "tabela"  : "",
            "campo"    : "",
            "orderby"     : '',     
            "sharp"       : true
        }
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsAuditorias = await auditoriaSrv.getAuditorias(params);
        console.log('lsAuditorias=>', lsAuditorias);
        if (lsAuditorias.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsAuditorias);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'AUDITORIA', message: err.message });

        }
    }
})
module.exports = router;