const express = require('express');
const router = express.Router();
const clienteSrv = require('../services/clienteServices');


router.get('/api/cliente/:id_empresa/:id', async function(req, res) {
    try {
        console.log(req);
        const lsClientes = await clienteSrv.getCliente(req.params.id_empresa, req.params.id);
        if (lsClientes == null) {
            res.status(409).json({ message: 'Cliente Não Encontrado.' });
        } else {
            res.status(200).json(lsClientes);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CLIENTES', message: err.message });

        }
    }
})

router.get('/api/clientes', async function(req, res) {

    try {
        const lsClientes = await clienteSrv.getClientes();

        if (lsClientes.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsClientes);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CLIENTES', message: err.message });

        }
    }
})


router.post('/api/cliente', async function(req, res) {

    try {

        const cliente = req.body;

        const tar = await clienteSrv.insertCliente(cliente);

        if (tar == null) {
            res.status(409).json({ message: 'Cliente Não Cadastrado!' });
        } else {
            res.status(200).json(tar);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CLIENTES', message: err.message });

        }
    }

});

router.put('/api/cliente', async function(req, res) {
    try {
        const cliente = req.body;
        console.log('cliente', cliente);
        const cli = await clienteSrv.updateCliente(cliente);
        res.status(200).json({ message: 'Cliente Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CLIENTES', message: err.message });

        }
    }
});

router.delete('/api/cliente/:id_empresa/:id', async function(req, res) {
    try {

        await clienteSrv.deleteCliente(req.params.id_empresa, req.params.id);

        res.status(200).json({ message: 'Cliente Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CLIENTES', message: err.message });

        }
    }
});


//consultas post
router.post('/api/clientes', async function(req, res) {
    /*
        {
            "id_empresa: 1", 
            "id" : 3,
            "razao" : "",
            "fantasi" : "",
            "cnpj_cpf" : "",
            "grupo" : 0,
            "sharp" : true
        }
    */
    const params = req.body;

    console.log('params=>Rota Cliente', params);

    try {

        const lsClientes = await clienteSrv.getClientes(params);

        if (params.contador == "S") {

            res.status(200).json(lsClientes);

        } else {

            if (lsClientes.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsClientes);
            }

        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'CLIENTES', message: err.message });

        }
    }
})


module.exports = router;