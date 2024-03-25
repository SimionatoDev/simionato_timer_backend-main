const express = require('express');
const router = express.Router();
const aponPlanejamentoSrv = require('../services/aponPlanejamentoServices');
const atividadeSrv = require('../services/atividadeService');
const shared = require('../util/shared');


router.get('/api/aponplan/:id_empresa/:id', async function(req, res) {
    try {
        const lsApontamentos = await aponPlanejamentoSrv.getAponPlanejamento(req.params.id_empresa, req.params.id);
        if (lsApontamentos == null) {
            res.status(409).json({ message: 'Apontamento De Planejamento  Não Encontrado.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

        }
    }
})

router.get('/api/aponplans', async function(req, res) {

    try {
        const lsApontamentos = await aponPlanejamentoSrv.getAponPlanejamentos();

        if (lsApontamentos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

        }
    }
})

router.post('/api/aponplan', async function(req, res) {

    try {

        const apontamento = req.body;

        console.log("Chegou assim", apontamento);

        const apon = await aponPlanejamentoSrv.insertAponPlanejamento(apontamento);

        if (apon == null) {
            res.status(409).json({ message: 'Apontamento De Planejamento  Não Encontrado!' });
        } else {
            res.status(200).json(apon);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

        }
    }

});

router.put('/api/aponplan', async function(req, res) {
    try {
        const apontamento = req.body;
        const apon = await aponPlanejamentoSrv.updateAponPlanejamento(apontamento);
        res.status(200).json({ message: 'Apontamento De Planejamento  Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

        }
    }
});

router.delete('/api/aponplan/:id_empresa/:id', async function(req, res) {
    try {
        const lsApontamentos = await aponPlanejamentoSrv.getAponPlanejamento(req.params.id_empresa, req.params.id);
        await aponPlanejamentoSrv.deleteAponPlanejamento(req.params.id_empresa, req.params.id);
        res.status(200).json({ message: 'Apontamento De Planejamento  Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

        }
    }
});


//consultas post
router.post('/api/aponplans', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
            public id: number = 0;
            public id_projeto: number = 0;
            public id_conta: string = '';
            public id_versao:string = '';
            public id_subconta: string = '';
            public id_resp: number = 0;
            public id_exec: number = 0;
            public data: string = '';
            public orderby: string = '';
            public sharp: Boolean = true;
        }
    */

    const params = req.body;


    try {
        const lsApontamentos = await aponPlanejamentoSrv.getAponPlanejamentos(params);
        if (lsApontamentos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsApontamentos);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONT. PLANEJAMENTO', message: err.message });

        }
    }
})

router.post('/api/aponagenda', async function(req, res) {
    /*
        {
            "id_empresa"  : 1 , 
            "id"          : 1,
            "id_projeto"  : "",
            "agenda"      : [
            {
                "data":"2022-03-02",
                "manha":false,
                "tarde": false
            },
            {
                "data":"2022-03-03",
                "manha":false,
                "tarde": false
            },
            {
                "data":"2022-03-04",
                "manha":false,
                "tarde": false
            }
            ]
        }
    */
    const params = req.body;

    console.log('params', params);

    try {

        for (const age of params.agenda) {
            console.log("Age =>", age);
            const lsAgenda = await aponPlanejamentoSrv.getAponAgendaPlanejamentos(params.id_empresa, age.id_exec, age.data_);
            age.movimentos = lsAgenda;
        };

        res.status(200).json(params);

    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'APONT. PLANEJAMENTO', message: err.message });

        }
    }

})



router.post('/api/planejamento', async function(req, res) {

    const params = req.body;

    console.log('parametros - planejamento', params);

    for (x = 0; x < params.length; x++) {
        if (params[x].acao == "I") {
            try {

                const apon = await aponPlanejamentoSrv.insertAponPlanejamento(params[x].lanca);

                if (apon == null) {
                    //res.status(409).json({ message: 'Apontamento De Planejamento  Não Encontrado!' });
                } else {
                    //res.status(200).json(apon);
                }

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    //res.status(409).json(err);

                } else {

                    //res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

                }
            }
        }
        if (params[x].acao == "D") {
            try {

                const apon = await aponPlanejamentoSrv.deleteAponPlanejamento(params[x].id_empresa, params[x].id)

                if (apon == null) {
                    //res.status(409).json({ message: 'Apontamento De Planejamento  Não Encontrado!' });
                } else {
                    //res.status(200).json(apon);
                }

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    //res.status(409).json(err);

                } else {

                    //res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

                }
            }
        }
        if (params[x].acao == "A") {
            try {


                console.log("Entrei na alteração");

                const apon = await aponPlanejamentoSrv.updateAponPlanejamentoObs(params[x].id_empresa, params[x].id, params[x].lanca.obs)

                if (apon == null) {
                    //res.status(409).json({ message: 'Apontamento De Planejamento  Não Encontrado!' });
                } else {
                    //res.status(200).json(apon);
                }

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    //res.status(409).json(err);

                } else {

                    //res.status(500).json({ erro: 'BAK-END', tabela: 'APONPLAN', message: err.message });

                }
            }
        }
    }

    res.status(200).json({ message: "Planejamento OK" });


})



module.exports = router;