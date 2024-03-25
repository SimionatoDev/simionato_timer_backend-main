const db = require('../infra/database');
const express = require('express');
const router = express.Router();
const aponExecucaoSrv = require('../services/aponExecucaoServices');
//const atividadeSrv = require('../services/atividadeService');
const generateExcel = require('../Excel/generateExcel.js');


router.get('/api/aponexec/:id_empresa/:id', async function(req, res) {
    try {
        const lsApontamentos = await aponExecucaoSrv.getAponExecucao(req.params.id_empresa, req.params.id);
        if (lsApontamentos == null) {
            res.status(409).json({ message: 'Apontamento De Execução  Não Encontrado.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONEXEC', message: err.message });

        }
    }
})

router.get('/api/aponexecs', async function(req, res) {

    try {
        const lsApontamentos = await aponExecucaoSrv.getAponExecucoes();

        if (lsApontamentos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONEXEC', message: err.message });

        }
    }
})

router.post('/api/aponexec', async function(req, res) {


    try {

        let apontamento = req.body;

        const apon = await aponExecucaoSrv.insertAponExecucao(apontamento);

        if (apon == null) {
            res.status(409).json({ message: 'Apontamento De Execução  Não Incluído!' });
        } else {
            if (apontamento.id_motivo == '998001') {
                apontamento.id = 0;
                apontamento.id_projeto = 900000;
                apontamento.id_conta = '90';
                apontamento.id_conta_versao = '0101';
                apontamento.id_subconta = '900101';
                apontamento.id_subcliente = 50;
                apontamento.id_resp = 13;
                apontamento.id_motivo = '998001';
                apontamento.produtivo = 'S';
                apontamento.nlanc = apon.id;
                apontamento.obs = `CONPENSAÇÃO HORAS LANÇAMENTO BASE(${apon.id})`;
                apontamento.encerramento = 'N';
                const apon2 = await aponExecucaoSrv.insertAponExecucao(apontamento);
                if (apon2 == null) {
                    res.status(409).json({ message: 'Apontamento De Execução  Não Incluído!' });
                }
            }
            res.status(200).json(apon);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONEXEC', message: err.message });

        }
    }

});

router.put('/api/aponexec', async function(req, res) {
    try {
        const apontamento = req.body;
        const apon = await aponExecucaoSrv.updateAponExecucao(apontamento);
        let apon2 = await aponExecucaoSrv.getAponExecucaoByNlanc(apontamento.id_empresa, apontamento.id);
        if (apon2 != null) {
            apon2.inicial = apontamento.inicial;
            apon2.final = apontamento.final;
            apon2.horasapon = apontamento.horasapon;
            apon2.user_update = apontamento.user_update;
            apon2 = await aponExecucaoSrv.updateAponExecucao(apon2);
            console.log("apon2", apon2);
        }
        res.status(200).json({ message: 'Apontamento De Execução  Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONEXEC', message: err.message });

        }
    }
});

router.delete('/api/aponexec/:id_empresa/:id', async function(req, res) {
    try {
        const apon = await aponExecucaoSrv.getAponExecucao(req.params.id_empresa, req.params.id);
        await aponExecucaoSrv.deleteAponExecucao(req.params.id_empresa, req.params.id);
        if (apon !== null && apon.id_motivo == '998001') {
            await aponExecucaoSrv.deleteAponExecucaoByNlanc(apon.id_empresa, apon.id);
        }
        res.status(200).json({ message: 'Apontamento De Execução  Exclído Com Sucesso!' });
    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONEXEC', message: err.message });

        }
    }
});

//consultas post
router.post('/api/aponexecs', async function(req, res) {
    /*
        {
            "id_empresa"  : 1 , 
            "id"          : "",
            "id_projeto"  : "",
            "id_conta"    : "",
            "id_subconta" : "",
            "id_resp"     : 0,
            "id_exec"     : 0,
            "data"        : "",
            "orderby"     : '',     
            "sharp"       : true
        }
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsApontamentos = await aponExecucaoSrv.getAponExecucoes(params);
        if (lsApontamentos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONT. EXECUÇÃO', message: err.message });

        }
    }
})

//consultas post
router.post("/api/aponexecsexcel", async function(req, res) {
        try {
            const params = req.body;
            console.log(params, "parametros");
    
            const lsApontamentos = await aponExecucaoSrv.getAponExecucoes(params);
    
            if (lsApontamentos === null) {
                res.status(409).json({ message: 'Nenhum Registro Encontrado!' });
                return;
            }
    
            await generateExcel(lsApontamentos);
    
            res.status(200).json({ message: 'Excel gerado com sucesso!' });
        } catch (err) {
            if (err.name === 'MyExceptionDB') {
                res.status(409).json(err);
            } else {
                res.status(500).json({ erro: 'BAK-END', tabela: 'Apons Excecução Excel', message: err.message });
            }
        }
    });

router.get('/api/getaponexecbyexecutor/:id_empresa/:id_usuario/:data_ref', async function(req, res) {
    try {
        const lsApontamentos = await aponExecucaoSrv.getAponExecByExecutor(req.params.id_empresa, req.params.id_usuario, req.params.data_ref.replace('_', '/'));

        if (lsApontamentos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONEXEC', message: err.message });

        }
    }
})

module.exports = router;