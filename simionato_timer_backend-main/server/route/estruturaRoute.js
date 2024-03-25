const express = require('express');
const router = express.Router();
const estruturaSrv = require('../services/estruturasService');
const shared = require('../util/shared');

function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return "" + numero;
}

router.get('/api/estrutura/:id_empresa/:conta/:versao/:subconta', async function(req, res) {
    try {
        const lsLista = await estruturaSrv.getEstrutura(req.params.id_empresa, req.params.conta, req.params.versao, req.params.subconta);
        if (lsLista == null) {
            res.status(409).json({ message: 'Estrutura Não Encontrada.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            console.log(err);

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
})


router.get('/api/conta/:id_empresa/:conta/:versao', async function(req, res) {
    try {
        const lsLista = await estruturaSrv.getConta(req.params.id_empresa, req.params.conta, req.params.versao);
        if (lsLista == null) {
            res.status(409).json({ message: 'Conta Não Encontrada.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            console.log(err);

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
})


router.get('/api/estruturas', async function(req, res) {

    try {
        const lsLista = await estruturaSrv.getEstruturas();
        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
})

router.post('/api/estrutura', async function(req, res) {

    try {

        const estrutura = req.body.estrutura;

        const lsUsuarios = req.body.usuarios;

        estrutura.nivel = parseInt(estrutura.nivel);

        console.log("Parametro Na chegada:", estrutura);

        var subconta = await shared.novaConta(estrutura.id_empresa, estrutura.conta, estrutura.versao, estrutura.subconta, estrutura.nivel);

        console.log('subconta', subconta.substring(0, 2));

        if (estrutura.conta == '') {
            estrutura.conta = subconta;
        }

        estrutura.subconta = subconta;

        console.log("Ficou assim:", estrutura);

        const reg = await estruturaSrv.insertEstrutura(estrutura)


        if (reg == null) {
            res.status(409).json({ message: 'Falha No Cadastro Da Estrutura' });
        } else {

            if (lsUsuarios != null) {

                let estruturas = [];

                let id = 1;


                lsUsuarios.forEach(user => {

                    estru = {
                        id_empresa: reg.id_empresa,
                        conta: reg.conta,
                        versao: reg.versao,
                        subconta: reg.conta.trim() + adicionaZero(id),
                        descricao: user.nome,
                        nivel: 2,
                        nivel_maxi: 7,
                        tipo: 'O',
                        controle: 'N',
                        user_insert: reg.user_insert,
                        user_update: 0,
                        status: 1,
                        id_usuario: user.id
                    };

                    estruturas.push(estru);
                    id++;
                });

                try {

                    await estruturaSrv.saveAllEstrutura(estruturas)

                    const par = {
                        id_empresa: estruturas[0].id_empresa,
                        conta: estruturas[0].conta,
                        versao: estruturas[0].versao,
                        subconta: '',
                        descricao: '',
                        nivel: 0,
                        tipo: '',
                        orderby: '',
                        sharp: false,
                        subcontas: false,
                        projeto_in: '',
                        projeto_off: '',
                        id_projeto: number = 0,
                        status: 1
                    };

                    const lsLista = await estruturaSrv.getEstruturas(par);

                    if (lsLista == null) {
                        res.status(409).json({ message: 'Estrutura Não Encontrada.' });
                    } else {
                        res.status(200).json(reg);
                    }


                } catch (err) {

                    console.log('Erro-> ', err);

                    if (err.name == 'MyExceptionDB') {

                        res.status(409).json(err);

                    } else {

                        res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

                    }
                }




            } else {

                res.status(200).json(reg);
            }

        }

    } catch (err) {

        console.log(err);

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

router.post('/api/saveAllEstrutura', async function(req, res) {

    const estruturas = req.body.estruturas;

    const oldVersion = req.body.oldVersion;

    console.log('Parametros duplo:', req.body);


    if (estruturas.length == 0) {
        res.json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: 'Falta Parâmetros' });
        return;
    }

    const id_empresa = estruturas[0].id_empresa;
    const conta = estruturas[0].conta;
    const versao = oldVersion;

    try {

        await estruturaSrv.mudaStatus(id_empresa, conta, versao, 2);

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

            return;

        } else {

            res.status(500).json({ erro: 'BAK-END mudaStatus estrutura', tabela: 'ESTRUTURA', message: err.message });

            return;

        }
    }


    try {


        console.log('saveAllEstrutura')

        await estruturaSrv.saveAllEstrutura(estruturas)

        const par = {
            id_empresa: estruturas[0].id_empresa,
            conta: estruturas[0].conta,
            versao: estruturas[0].versao,
            subconta: '',
            descricao: '',
            nivel: 0,
            tipo: '',
            orderby: '',
            pagina: 0,
            tamPagina: 1000,
            contador: 'N',
            orderby: '',
            sharp: false,
            subcontas: false,
            projeto_in: '',
            projeto_off: '',
            id_projeto: number = 0,
            status: number = 1
        };

        const lsLista = await estruturaSrv.getEstruturas(par);

        if (lsLista == null) {
            res.status(409).json({ message: 'Estrutura Não Encontrada.' });
        } else {
            res.status(200).json(lsLista);
        }


    } catch (err) {

        console.log('Erro-> ', err);

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

router.post('/api/updateAllEstrutura', async function(req, res) {

    const estruturas = req.body.estruturas;

    if (estruturas.length == 0) {
        res.json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: 'Falta Parâmetros' });
        return;
    }

    const id_empresa = estruturas[0].id_empresa;
    const conta = estruturas[0].conta;
    const versao = estruturas[0].versao;

    try {

        await estruturaSrv.deleteAllEstrutura(id_empresa, conta, versao);

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

            return;

        } else {

            res.status(500).json({ erro: 'BAK-END delete estrutura', tabela: 'ESTRUTURA', message: err.message });

            return;

        }
    }

    try {

        await estruturaSrv.saveAllEstrutura(estruturas)

        const par = {
            id_empresa: estruturas[0].id_empresa,
            conta: estruturas[0].conta,
            versao: estruturas[0].versao,
            subconta: '',
            descricao: '',
            nivel: 0,
            tipo: '',
            pagina: 0,
            tamPagina: 1000,
            contador: 'N',
            orderby: '',
            sharp: false,
            subcontas: false,
            projeto_in: '',
            projeto_off: '',
            id_projeto: number = 0,
            status: 1
        };

        const lsLista = await estruturaSrv.getEstruturas(par);

        if (lsLista == null) {
            res.status(409).json({ message: 'Estrutura Não Encontrada.' });
        } else {
            res.status(200).json(lsLista);
        }


    } catch (err) {

        console.log('Erro-> ', err);

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});


router.post('/api/estrutura_histo', async function(req, res) {

    try {

        const par = req.body;

        console.log("estrutura_histo:", par);

        const estru = await estruturaSrv.getEstrutura_histo(par);

        if (estru == null) {
            res.status(409).json({ message: 'Estrutura Não Encontrada.' });
        } else {
            res.status(200).json(estru);
        }


    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

router.post('/api/copiaEstrutura', async function(req, res) {

    console.log('cheguei', req.body);

    const id_empresa = req.body.id_empresa;
    const conta = req.body.conta;
    const versao = req.body.versao;
    const controle = req.body.controle;
    const descricao = req.body.descricao;

    const estrutura = await estruturaSrv.Estrutura_header(id_empresa, '', versao, controle, descricao)

    try {

        console.log("Parametro Na chegada:", estrutura);

        var subconta = await shared.novaConta(estrutura.id_empresa, estrutura.conta, estrutura.versao, estrutura.subconta, estrutura.nivel);

        console.log('subconta', subconta.substring(0, 2));

        if (estrutura.conta == '') {
            estrutura.conta = subconta;
        }

        estrutura.subconta = subconta;

        console.log("Ficou assim:", estrutura);

        const par = {
            id_empresa: id_empresa,
            conta: conta,
            versao: versao,
            subconta: '',
            descricao: '',
            nivel: 0,
            tipo: '',
            pagina: 0,
            tamPagina: 1000,
            contador: 'N',
            orderby: '',
            orderby: 'Conta',
            sharp: false,
            subcontas: false,
            projeto_in: '',
            projeto_off: '',
            id_projeto: number = 0,
            status: number = 1
        };

        const lsLista = await estruturaSrv.getEstruturas(par);

        if (lsLista == null) {
            res.status(409).json({ message: 'Estrutura Original Não Encontrada.' });
        } else {

            console.log('estrutura: ', estrutura);

            for (x = 0; x < lsLista.length; x++) {
                if (x == 0) {
                    lsLista[0] = estrutura;
                } else {
                    lsLista[x].id_empresa = estrutura.id_empresa;
                    lsLista[x].conta = estrutura.conta;
                    lsLista[x].versao = estrutura.versao;
                    lsLista[x].subconta = estrutura.conta + lsLista[x].subconta.slice(2);
                }
            }

            await estruturaSrv.saveAllEstrutura(lsLista)

            res.status(200).json(lsLista);

        }

    } catch (err) {

        console.log(err);

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END Copia Estrutura', tabela: 'ESTRUTURA', message: err.message });

        }
    }


});

router.post('/api/multiEstrutura', async function(req, res) {

    console.log('cheguei multiEstrutura', req.body);

    const estruturas = req.body.estruturas;

    try {

        console.log("Parametro Na chegada:", estruturas);

        var subconta = await shared.novaConta(estruturas[0].id_empresa, estruturas[0].conta, estruturas[0].versao, estruturas[0].subconta, estruturas[0].nivel);

        var id = 0;

        if (estruturas[0].nivel == 1) {
            id = 1
        } else {
            id = subconta.substring(((estruturas[0].nivel - 1) * 2));
            id = parseInt(id);
        }

        console.log('subconta incial', subconta);


        for (x = 0; x < estruturas.length; x++) {

            if (estruturas[x].conta == '') {
                estruturas[x].conta = subconta;
            }

            subconta = subconta.substring(0, ((estruturas[x].nivel - 1) * 2)) + adicionaZero(id);
            console.log('nova subconta', subconta);
            estruturas[x].subconta = subconta;
            id++

        }

        console.log("Ficou assim:", estruturas);

        await estruturaSrv.saveAllEstrutura(estruturas)

        res.status(200).json(estruturas);

    } catch (err) {

        console.log(err);

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END Multi Estrutura', tabela: 'ESTRUTURA', message: err.message });

        }
    }


});

router.put('/api/estrutura', async function(req, res) {
    try {
        const estrutura = req.body;
        const reg = await estruturaSrv.updateEstrutura(estrutura);
        res.status(200).json({ message: 'Estrutura Alterada Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

router.delete('/api/estrutura/:id_empresa/:conta/:versao/:subconta', async function(req, res) {
    console.log('Vou deletar OK');
    try {

        await estruturaSrv.deleteEstrutura(req.params.id_empresa, req.params.conta, req.params.versao, req.params.subconta);

        res.status(200).json({ message: 'Estrutura Excluída Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

router.delete('/api/estrutura/:id_empresa/:conta/:versao', async function(req, res) {
    try {

        await estruturaSrv.deleteAllEstrutura(req.params.id_empresa, req.params.conta, req.params.versao);

        res.status(200).json({ message: 'Toda Estrutura Excluída Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

//consultas post
router.post('/api/estruturas', async function(req, res) {
    /*
       {
             "id_empresa": 0,
             "conta":     '',
             "versao":    '0101',
             "subconta":  '',
             "descricao": '',
             "nivel":  0,
             "tipo": '',
             "orderby": '',
             "sharp": false,
             "subcontas":false,
             "status:1";
        }
    */
    const params = req.body;

    console.log('estruturas-params', params);

    try {
        const lsLista = await estruturaSrv.getEstruturas(params);


        if (lsLista.length == 0) {

            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {

            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURAS', message: err.message });

        }
    }
})

router.delete('/api/estrutura/:id_empresa/:conta/:versao/:subconta', async function(req, res) {
    try {
        console.log('Cheguei para deletar..')
        await estruturaSrv.deleteEstrutura(req.params.id_empresa, req.params.conta, req.params.versao, req.params.subconta);

        res.status(200).json({ message: 'Estrutura Excluída Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});


router.delete('/api/estrutura/:id_empresa/:conta/:versao', async function(req, res) {
    try {
        console.log('Cheguei para deletar.. - deleteAllEstrutura')
        await estruturaSrv.deleteAllEstrutura(req.params.id_empresa, req.params.conta, req.params.versao);

        res.status(200).json({ message: 'Toda Estrutura Excluída Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURA', message: err.message });

        }
    }
});

//consultas post
router.post('/api/estruturas', async function(req, res) {
    /*
       {
             "id_empresa": 0,
             "conta":     '',
             "versao":    '0101',
             "subconta":  '',
             "descricao": '',
             "nivel":  0,
             "tipo": '',
             "orderby": '',
             "sharp": false,
             "subcontas":false;
        }
    */
    const params = req.body;

    console.log('params', params);

    try {
        const lsLista = await estruturaSrv.getEstruturas(params);

        if (lsLista.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsLista);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'ESTRUTURAS', message: err.message });

        }
    }
})


function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return "" + numero;
}

module.exports = router;