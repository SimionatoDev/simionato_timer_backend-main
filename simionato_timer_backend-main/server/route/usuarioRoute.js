const express = require('express');
const { hash } = require('bcryptjs')
const router = express.Router();
const usuarioSrv = require('../services/usuarioServices');


router.get('/api/usuario/:id_empresa/:id_usuario', async function(req, res) {
    try {
        const lsUsuarios = await usuarioSrv.getUsuario(req.params.id_empresa, req.params.id_usuario);
        if (lsUsuarios == null) {
            res.status(409).json({ message: 'Usuario Não Encontrado.' });
        } else {
            res.status(200).json(lsUsuarios);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUARIOS', message: err.message });

        }
    }
})

router.get('/api/usuariobyemail/:id_empresa/:email', async function(req, res) {
    try {
        const lsUsuarios = await usuarioSrv.getUsuarioByEmail(req.params.id_empresa, req.params.email);
        if (lsUsuarios == null) {
            res.status(409).json({ message: 'Usuario Não Encontrado.' });
        } else {
            res.status(200).json(lsUsuarios);
        }
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUARIOS', message: err.message });

        }
    }
})

router.get('/api/usuarios', async function(req, res) {

    try {
        const lsUsuarios = await usuarioSrv.getUsuarios();

        if (lsUsuarios.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsUsuarios);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUARIOS', message: err.message });

        }
    }
})

router.post('/api/usuario', async function(req, res) {

    try {

        const usuario = req.body;

        //const passwordHash = await hash(usuario.senha, 8);

        //usuario.senha = passwordHash;

        const user = await usuarioSrv.insertUsuario(usuario);

        if (user == null) {
            res.status(409).json({ message: 'Usuario Não Encontrado!' });
        } else {
            res.status(200).json(user);
        }

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUARIOS', message: err.message });

        }
    }

});

router.put('/api/usuario', async function(req, res) {
    try {
        const usuario = req.body;
        const user = await usuarioSrv.updateUsuario(usuario);
        res.status(200).json({ message: 'Usuario Alterado Com Sucesso!' });
    } catch (err) {
        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUARIOS', message: err.message });

        }
    }
});

router.delete('/api/usuario/:id_empresa/:id_usuario', async function(req, res) {
    try {

        await usuarioSrv.deleteUsuario(req.params.id_empresa, req.params.id_usuario);

        res.status(200).json({ message: 'Usuario Excluído Com Sucesso!' });

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUARIOS', message: err.message });

        }
    }
});

//consultas post
router.post('/api/usuarios', async function(req, res) {
    /*
        {
            "id_empresa: 1", 
            "id" : 3,
            "razao" : "",
            "cnpj_cpf" : "",
            "grupo" : 0,
            "sharp" : true
        }
    */
    const params = req.body;

    console.log('params usuários:', params);

    try {

        const lsUsuarios = await usuarioSrv.getUsuarios(params);

        if (lsUsuarios.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsUsuarios);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUÁRIOS', message: err.message });

        }
    }
})

router.post('/api/usuariosbyprojeto', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
            public id_resp: number = 0;
            public id_exec: number = 0;
            public projeto_fechado:boolean = false;
            public orderby: string = '';
            public sharp: Boolean = true;
        }
    */
    const params = req.body;

    console.log('params usuários:', params);

    try {

        const lsUsuarios = await usuarioSrv.getUsuariosByProjeto(params);

        if (params.contador == "S") {

            res.status(200).json(lsEmpresas);

        } else {
            if (lsUsuarios.length == 0) {
                res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
            } else {
                res.status(200).json(lsUsuarios);
            }
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUÁRIOS', message: err.message });

        }
    }
})

router.post('/api/usariohorasexec', async function(req, res) {
    /*
        public id_empresa: number = 0;
        public id_diretor:number = 0;
        public id_resp:number = 0;
        public id_usuario: number = 0;
        public ano: string = '';
        public mes: string = '';
        public pagina: number = 0;
        public tamPagina: number = 50;
        public contador: string = 'N';
        public orderby: string = '';
        public sharp: Boolean = false;
    */
    const params = req.body;

    console.log('params usuários x horas lancadas:', params);

    try {

        const lsHoras = await usuarioSrv.usarioHorasExec(params);

        if (lsHoras.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsHoras);
        }

    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'HORAS LANÇADAS', message: err.message });

        }
    }
})

//usuarios Ponte
router.post('/api/usuariosbyponte', async function(req, res) {
    /*
        {
            public id_empresa: number = 0;
            public id: number = 0;
            public ativo: string = '';
            public razao: string = '';
            public cnpj_cpf: string = '';
            public grupo: number[] = [];
            public timer: string = '';
            public ticket: string = '';
            public flag_ponte:string = '';
            public data:string = '';
            public pagina: number = 0;
            public tamPagina: number = 50;
            public contador: string = 'N';
            public orderby: string = '';
            public sharp: Boolean = false;
        }
    */
    const params = req.body;

    console.log('params usuáriosbyponte:', params);

    try {

        const lsUsuarios = await usuarioSrv.getUsuariosByPonte(params);

        if (lsUsuarios.length == 0) {
            res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.' });
        } else {
            res.status(200).json(lsUsuarios);
        }
    } catch (err) {


        if (err.name == 'MyExceptionDB') {

            res.status(409).json(err);

        } else {

            res.status(500).json({ erro: 'BAK-END', tabela: 'USUÁRIOS', message: err.message });

        }
    }
})

module.exports = router;