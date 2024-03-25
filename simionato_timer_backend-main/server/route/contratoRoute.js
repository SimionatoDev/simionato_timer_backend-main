const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const constratoServ = require('../services/contratoService');

router.get('/api/contrato', async function(req, res) {

    try {

        res.status(200).json({ message: 'GET CONTRATO' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CONTRATOS', message: err.message });

        }
    }

});

router.post('/api/contrato', upload.single('file'), async function(req, res) {

    try {

        constratoServ.insertContrato(req, res);

        res.status(200).json({ message: 'CONTRATO INCLUIDO!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CONTRATOS', message: err.message });

        }
    }

});

module.exports = router;