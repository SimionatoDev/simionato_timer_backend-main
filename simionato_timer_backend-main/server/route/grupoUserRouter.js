const express = require('express');
const router = express.Router();
const gruUserSrv = require('../services/grupoUserServices');


router.get('/api/gruuser/:id_empresa/:codigo', async function(req, res) {
    try {
        const lsGrupoUser = await gruUserSrv.getGrupoUser(req.params.id_empresa, req.params.codigo);
        if (lsGrupoUser == null) {
            res.status(409).json({ message: 'Grupo de Usuário Não Encontrado.' });
        } else {
            res.status(200).json(lsGrupoUser);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOUSER', message: err.message });

        }
    }
})

router.get('/api/gruusers', async function(req, res) {

    try {
        const lsGrupoUser = await gruUserSrv.getGrupoUsers();

        if (lsGrupoUser.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsGrupoUser);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOUSER', message: err.message });

        }
    }
})

router.post('/api/gruuser', async function(req, res) {

    try {

        const gruuser = req.body;

        const reg = await gruUserSrv.insertGrupoUser(gruuser)

        if (reg == null) {
            res.status(409).json({ message: 'Grupo de Usuário Não Encontrado!' });
        } else {
            res.status(200).json(reg);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOUSER', message: err.message });

        }
    }

});

router.put('/api/gruuser', async function(req, res) {
    try {
        const gruuser = req.body;
        const grupo = await gruUserSrv.updateGrupoUser(gruuser);
        res.status(200).json({ message: 'Grupo de Usuário Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOUSER', message: err.message });

        }
    }
});

router.delete('/api/gruuser/:id_empresa/:id', async function(req, res) {
    try {

        await gruUserSrv.deleteGrupoUser(req.params.id_empresa, req.params.id);

        res.status(200).json({ message: 'Grupo de Usuário Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPOUSER', message: err.message });

        }
    }
});



//consultas post
router.post('/api/gruusers', async function(req, res) {
    /*
        {
            "id_empresa: 1", 
            "id" : 3,
            "grupo" : "",
            "sharp" : true
        }
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsGrupo = await gruUserSrv.getGrupoUsers(params);

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

            res.status(500).json({ erro: 'BAK-END', tabela: 'GRUPO DE USUÁRIOS', message: err.message });

        }
    }
})


module.exports = router;