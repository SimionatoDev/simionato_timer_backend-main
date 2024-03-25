const express = require('express');
const router = express.Router();
const projetoSrv = require('../services/projetoServices');


router.get('/api/projeto/:id_empresa/:id', async function(req, res) {
    try {
        const lsLista = await projetoSrv.getProjeto(req.params.id_empresa, req.params.id);
        if (lsLista == null) {
            res.status(409).json({ message: 'Projeto Não Encontrado.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETO', message: err.message });

        }
    }
})

router.get('/api/projetos', async function(req, res) {

    try {
        const lsLista = await projetoSrv.getProjetos();

        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETO', message: err.message });

        }
    }
})

router.post('/api/projeto', async function(req, res) {

    try {

        const projeto = req.body;

        const reg = await projetoSrv.insertProjeto(projeto);

        if (reg == null) {
            res.status(409).json({ message: 'Projeto Não Cadastrado!' });
        } else {
            res.status(200).json(reg);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETO', message: err.message });

        }
    }

});

router.put('/api/projeto', async function(req, res) {
    try {
        const projeto = req.body;
        const reg = await projetoSrv.updateProjeto(projeto);
        res.status(200).json({ message: 'Projeto Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETO', message: err.message });

        }
    }
});

router.delete('/api/projeto/:id_empresa/:id', async function(req, res) {
    try {

        await projetoSrv.deleteProjeto(req.params.id_empresa, req.params.id);

        res.status(200).json({ message: 'Projeto Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETO', message: err.message });

        }
    }
});

//consultas post
router.post('/api/projetos', async function(req, res) {
    /*
            public id_empresa: number = 0;
            public id: number = 0;
            public descricao: string = '';
            public id_diretor: string = '';
            public cli_razao: string = '';
            public cli_grupo: string = '';
            public dataproj: string = '';
            public dataenc:string = '';
            public status: string = '';
            public status_pl: string = '';
            public status_ex: string = '';
            public tem_atividade: string = 'N';
            public pagina: number = 0;
            public tamPagina: number = 50;
            public contador: string = 'N';
            public orderby: string = '';
            public sharp: boolean = false;

            Não implementado dataproj,dataenc
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsProjetos = await projetoSrv.getProjetos(params);
        if (lsProjetos.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsProjetos);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {
            res.status(409).json(err);
        } else {
            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETOS', message: err.message });
        }
    }
})

router.post('/api/agehoras', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
            public id: number = 0;
            public id_projeto: number = 0;
            public id_conta: string = '';
            public id_subconta: string = '';
            public id_resp: number = 0;
            public id_exec: number = 0;
            public mes: string = '';
            public ano: string = '';
            public orderby: string = '';
            public sharp: Boolean = true;
        }
    */
    const params = req.body;

    console.log('getAgeHoras params: ', params);

    try {
        const lsHoras = await projetoSrv.getAgeHoras(params);
        if (lsHoras == null) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsHoras);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETOS', message: err.message });

        }
    }
})

router.post('/api/lastprojects', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
            public id_exec: number = 0;
            public nro_retorno: number = 0;
            public controle:string = '';
            public orderby: string = '';
            public sharp: Boolean = true;
        }
    */
    const params = req.body;

    console.log('lastprojects params: ', params);

    try {
        const lsProjetos = await projetoSrv.getLastProjects(params);
        if (lsProjetos == null) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsProjetos);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'PROJETOS', message: err.message });

        }
    }
})



module.exports = router;