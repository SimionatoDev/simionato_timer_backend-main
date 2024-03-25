const empresaSrv = require('../services/empresaServices');
const grupoEcoSrv = require('../services/grupoEcoServices');
const grupoUserSrv = require('../services/grupoUserServices');
const usuarioSrv = require('../services/usuarioServices');
const projetoSrv = require('../services/projetoServices');
const clienteSrv = require('../services/clienteServices');
const motivoApoSrv = require('../services/motivoApoServices');
const aponExecucaoSrv = require('../services/aponExecucaoServices');
const aponPlanejamentoSrv = require('../services/aponPlanejamentoServices');
const clientesJson = require('../util/clientes');
const estruturaSrv = require('../services/estruturasService');
const atividadeSrv = require('../services/atividadeService');
const shared = require('../util/shared');



Empresa = async function() {

    id = 0;

    empresa = {
        id: 0,
        cnpj_cpf: "",
        razao: "SIMIONATO AUDITORES INDEPENDENTES",
        fantasi: "SIMIONATO",
        inscri: "",
        cadastr: "2022-03-01",
        ruaf: "RUA RAFAEL ANDRADE DUARTE",
        nrof: "232",
        complementof: "",
        bairrof: "BAIRRO NOVA CAMPINAS",
        cidadef: "CAMPINAS",
        uff: "SP",
        cepf: "13092180",
        tel1: "1937533030",
        tel2: "",
        emailf: "marcos.falconi@simionatoauditores.com.br",
        obs: "EMPRESA PRINCIPAL"
    }

    try {

        const emp = await empresaSrv.getEmpresas();

        if (emp.length == 0) {

            try {

                retorno = await empresaSrv.insertEmpresa(empresa);

                id = retorno.id;

                console.log("Empresas INCLUIDA ID  = ", id);

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão ", err.tabela, err.message);
                }
            }
        } else {

            empresa.id = emp[0].id;

            empresa.obs = 'Empresa Alterada';

            try {

                await empresaSrv.updateEmpresa(empresa);

                id = empresa.id;

                console.log("Alteração EMPRESA: OK ID ", id);

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão<<Empresas>>...", err.message);
                }
            }

        }

    } catch (err) {

        console.log("Falha EMPRESAS..", err.message);

    }

    return id;
}

GrupoEconomico = async function(id_empresa) {

    id_grupo = 0;

    const grupoEco = {
        id_empresa: id_empresa,
        id: 0,
        razao: "GRUPO ECONOMICO"
    }

    try {

        const grupos = await grupoEcoSrv.getGrupoEcos();

        if (grupos.length == 0) {

            try {

                const retorno = await grupoEcoSrv.insertGrupoEco(grupoEco);
                console.log("Grupo Economico OK");

            } catch (err) {
                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão ", err.tabela, err.message);
                }
            }
        } else {

            console.log("Tabela de Grupos Economicos Já Existe!");
        }

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

    return id_grupo;
}

GrupoUsuarios = async function(id_empresa) {

    id_grupo = 0;

    grupoUsers = [{
            id_empresa: id_empresa,
            id: 0,
            grupo: "DIRETOR"
        },
        {
            id_empresa: id_empresa,
            id: 0,
            grupo: "SUPERVISOR"
        },
        {
            id_empresa: id_empresa,
            id: 0,
            grupo: "AUDITOR"
        },
        {
            id_empresa: id_empresa,
            id: 0,
            grupo: "TRAINEE"
        },
        {
            id_empresa: id_empresa,
            id: 0,
            grupo: "ADM"
        }
    ]

    try {

        const grupos = await grupoUserSrv.getGrupoUsers();

        if (grupos.length == 0) {

            try {

                for (const grupo of grupoUsers) {

                    try {
                        const gru = await grupoUserSrv.insertGrupoUser(grupo);
                    } catch (err) {

                        if (err.name == 'MyExceptionDB') {

                            mensagens = err.message.split('|');

                            console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                        } else {

                            console.log("Falha Na Inclusão ", err.tabela, err.message);
                        }

                    }
                };

                console.log("Grupos de usuários incluído com sucesso!");

            } catch (err) {

                console.log("Falha Na Inclusão Dos Grupos", err.message);

            }

        } else {

            console.log('Tabela de Grupos De Usuários Já Está Populada..');

        }

    } catch (err) {

        console.log("Falha Na Inclusão Dos Grupos", err.message);

    }

}

Usuarios = async function(id_empresa) {

    id_usuario = 0;

    const usuarios = [{
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "ANDRÉ",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 2
        },
        {
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "BIANCA",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 3
        },
        {
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "SAMILA",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 5
        },
        {
            id_empresa: id_empresa,
            id: id_usuario,
            razao: "MARCOS",
            cnpj_cpf: "",
            cadastr: "2022-03-01",
            rua: "",
            nro: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            cep: "",
            tel1: "",
            tel2: "",
            email: "",
            senha: "",
            pasta: "",
            grupo: 0
        },
    ]

    try {

        const users = await usuarioSrv.getUsuarios();

        if (users.length == 0) {

            try {

                for (const usuario of usuarios) {


                    const gru = await usuarioSrv.insertUsuario(usuario);
                };

                console.log("Tabela de Usuários incluído com sucesso!");

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão ", err.tabela, err.message);
                }
            }

        } else {

            console.log('Tabela de Usuários Já Está Populada..');

        }


    } catch (err) {

        console.log("Falha Na Inclusão <<USUÁRIOS>>...", err.message);

    }

    return id_usuario;
}

Projetos = async function(id_empresa, id_cliente, id_diretor) {


    const projetos = [{
            id_empresa: id_empresa,
            id: 0,
            id_cliente: id_cliente,
            id_diretor: id_diretor,
            dataprop: Date.now() - 20,
            dataproj: Date.now() - 15,
            dataenc: null,
            descricao: "PROJETO INVENTÁRIO",
            horasve: 200,
            horasplan: 0,
            horasexec: 0,
            status: '5'
        },
        {
            id_empresa: id_empresa,
            id: 0,
            id_cliente: id_diretor,
            id_diretor: id_cliente,
            dataprop: Date.now(),
            dataproj: Date.now(),
            dataenc: null,
            descricao: "PROJETO FINANCEIRO",
            horasve: 200,
            horasplan: 0,
            horasexec: 0,
            status: '5'
        }
    ]
    try {

        const lsprojetos = await projetoSrv.getProjetos();

        try {

            if (lsprojetos.length == 0) {

                for (projeto of projetos) {

                    try {

                        await projetoSrv.insertProjeto(projeto);


                    } catch (err) {

                        if (err.name == 'MyExceptionDB') {

                            mensagens = err.message.split('|');

                            console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                        } else {

                            console.log("Falha Na Inclusão ", err.tabela, err.message);
                        }
                    }
                }

                console.log("Tabela de Projetos incluído com sucesso!");

            } else {

                console.log('Tabela de Projetos Já Está Populada..');

            }
        } catch (err) {

            console.log("Falha Na Inclusão <<PROJETOS>>...", err.message);

        }


    } catch (err) {

        console.log("Falha Na Inclusão <<PROJETOS>>...", err.message);

    }

}


Clientes = async function(id_empresa, gru_econo) {


    const clientes = [{
        id_empresa: id_empresa,
        id: 0,
        cnpj_cpf: "0123456789123",
        razao: "CLIENTE A",
        fantasi: "",
        inscri: "",
        cadastr: Date.now(),
        ruaf: "",
        nrof: "",
        complementof: "",
        bairrof: "",
        cidadef: "",
        uff: "SP",
        cepf: "",
        tel1: "",
        tel2: "",
        emailf: "",
        obs: "",
        gru_econo: gru_econo
    }]

    try {

        const clients = await clienteSrv.getClientes();

        if (clients.length == 0) {

            try {

                for (cliente of clientes) {

                    await clienteSrv.insertCliente(cliente);

                }

                console.log('Tabela de Clientes Já Está Populada..');

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão<<CLIENTES>>...", err.message);
                }

            }

        } else {

            console.log('Tabela de Clientes Já Está Populada..');

        }

    } catch (err) {

        console.log("Falha Na Inclusão <<CLIENTES>>...", err.message);

    }
}



MotivoApos = async function(id_empresa) {

    const motivoApos = [{
            id_empresa: 1,
            codigo: '001000',
            motivo: "RH",
            produtivo: 'N'
        },
        {
            id_empresa: 1,
            codigo: '002000',
            motivo: "TI",
            produtivo: 'N'
        },
        {
            id_empresa: 1,
            codigo: '003000',
            motivo: "EXECUÇÃO",
            produtivo: 'N'
        },
        {
            id_empresa: 1,
            codigo: '003001',
            motivo: "EXECUÇÃO PROJETO",
            produtivo: 'S'
        },
    ];

    try {


        const lsMotivos = await motivoApoSrv.getMotivoApos();

        if (lsMotivos.length == 0) {

            try {

                for (motivo of motivoApos) {

                    await motivoApoSrv.insertMotivoApo(motivo);

                }

                console.log("Tabela de Motivos De Apontamento incluída com sucesso!");

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão<<MOTIVO APO>>...", err.message);
                }

            }

        } else {
            console.log('Tabela de Motivo Apontamentos Já Está Populada..');
        }

    } catch (err) {

        console.log("Falha Na Inclusão <<Motivo Apontamentos>>", err.message);

    }

}


AponExecucao = async function() {

    lsTrabalhos = await trabalhoProjetoSrv.getTrabalhoProjetosByProjeto(1, 1);

    lsLancamentos = [];

    encerramento = 'S';

    if (lsTrabalhos.length > 0) {

        for (trabalho of lsTrabalhos) {

            lsLancamentos.push({
                id_empresa: trabalho.id_empresa,
                id: 0,
                id_projeto: trabalho.id_projeto,
                id_tarefa: trabalho.id_tarefa,
                id_trabalho: trabalho.id_trabalho,
                id_resp: trabalho.id_resp,
                id_exec: trabalho.id_exec,
                inicial: Date.now(),
                final: Date.now(),
                obs: "Apontamento Execução",
                horasapon: 1,
                encerramento: encerramento
            });

            if (encerramento == 'S') encerramento = 'N';
        }

        try {

            const lsApontamentos = await aponExecucaoSrv.getAponExecucoes();

            if (lsApontamentos.length == 0) {
                try {
                    for (lancamento of lsLancamentos) {


                        await aponExecucaoSrv.insertAponExecucao(lancamento);

                    }

                    console.log("Tabela de Lançamentos De Execucao incluída com sucesso!");

                } catch (err) {
                    if (err.name == 'MyExceptionDB') {

                        mensagens = err.message.split('|');

                        console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                    } else {

                        console.log("Falha Na Inclusão<<Lançamentos De Execucao>>...", err.message);

                    }
                }

            } else {

                console.log('Tabela de Lançamentos De Execucao Já Está Populada..');
            }


        } catch (err) {

            console.log("Falha Na Inclusão<<APONEXECUCAO>>...", err.message);

        }

    }



};

AponPlanejamento = async function() {


    lsTrabalhos = await trabalhoProjetoSrv.getTrabalhoProjetosByProjeto(1, 1);

    lsLancamentos = [];

    if (lsTrabalhos.length > 0) {

        for (trabalho of lsTrabalhos) {

            lsLancamentos.push({
                id_empresa: trabalho.id_empresa,
                id: 0,
                id_projeto: trabalho.id_projeto,
                id_tarefa: trabalho.id_tarefa,
                id_trabalho: trabalho.id_trabalho,
                id_resp: trabalho.id_resp,
                id_exec: trabalho.id_exec,
                inicial: Date.now(),
                final: Date.now(),
                obs: "Apontamento Planejamento",
                horasapon: 4,
                encerra: "N"
            });

        }

        try {

            const lsApontamentos = await aponPlanejamentoSrv.getAponPlanejamentos();

            if (lsApontamentos.length == 0) {
                try {
                    for (lancamento of lsLancamentos) {


                        await aponPlanejamentoSrv.insertAponPlanejamento(lancamento);

                    }

                    console.log("Tabela de Lançamentos De Planejamento incluído com sucesso!");

                } catch (err) {
                    if (err.name == 'MyExceptionDB') {

                        mensagens = err.message.split('|');

                        console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                    } else {

                        console.log("Falha Na Inclusão<<Lançamentos De Planejamento>>...", err.message);

                    }
                }

            } else {

                console.log('Tabela de Lançamentos De Planejamento Já Está Populada..');
            }


        } catch (err) {

            console.log("Falha Na Inclusão<<APONPLANEJAMENTO>>...", err.message);

        }
    }
}




Le_AponPlanejamento = async function() {

    try {

        const lsApontamentos = await aponPlanejamentoSrv.getAponPlanejamentos();

        if (lsApontamentos.length == 0) {
            try {

                console.log("Tabela de Lançamentos Vazia");

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão<<Lançamentos De Planejamento>>...", err.message);

                }
            }

        } else {

            console.log(lsApontamentos);
        }


    } catch (err) {

        console.log("Falha Na Leitura<<APONPLANEJAMENTO>>...", err.message);

    }
}

novaConta = async function(id_empresa, conta, subconta, nivel) {

    let last = "";

    if (conta == "") {

        last = await estruturaSrv.lastConta(id_empresa);

        if (last.max == null) {
            last = '01'
        } else {
            last = shared.lastConta(last.max);
        }


        console.log('CONTA==>', conta, 'Proxima Conta ==>', last);

    } else {

        last = await estruturaSrv.lastSubConta(id_empresa, conta, subconta, nivel);

        if (last.max == null) {
            last = '01'
            const nova = subconta + last;
            console.log("Ultima SubConta ", last, "Nova Conta", nova);

        } else {
            console.log('last.max', last.max);
            const nova = shared.lastSubConta(subconta, last.max);
            console.log("Ultima SubConta ", subconta, "Nova Conta", nova);
        }


    }



}


exports.executa = async function() {


    id_empresa = 1;

    id_diretor = 1;

    id_cliente = 1;

    await Tarefas(id_empresa);

    await Projetos(id_empresa, id_cliente, id_diretor);

    /*

    id_empresa = 0;

    id_diretor = 1;

    id_cliente = 1;

    id_grupo_econo = 1;

    id_empresa = await Empresa();

    if (id_empresa > 0) {

        await GrupoEconomico(id_empresa);

        await GrupoUsuarios(id_empresa);

        await Usuarios(id_empresa);

        await Clientes(id_empresa, id_grupo_econo);

        await Projetos(id_empresa, id_cliente, id_diretor);

        await Tarefas(id_empresa);

        await MotivoApos(id_empresa);

        await TarefasProjetos();

        await TrabalhosProjetos();

        await AponExecucao();

        await AponPlanejamento();
    }
*/
}

GrupoEconomicoImplantacao = async function(lsLista) {


    let gruposEcos = [];

    lsLista.forEach(grupo => {
        gruposEcos.push({
            id_empresa: 1,
            id: grupo.COD,
            razao: grupo.GRUPO_ECO,
            user_insert: 1,
            user_update: 0
        })
    });

    try {

        const grupos = await grupoEcoSrv.getGrupoEcos();

        if (grupos.length == 0) {

            try {

                for (grupoEco of gruposEcos) {

                    const retorno = await grupoEcoSrv.insertGrupoEco(grupoEco);
                }
                console.log("Grupo Economico OK");

            } catch (err) {
                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão ", err.tabela, err.message);
                }
            }
        } else {

            console.log("Tabela de Grupos Economicos Já Existe!");
        }

    } catch (err) {

        console.log("Falha Na Inclusão...", err.message);

    }

}

Clientes_Implantação = async function(lsLista) {


    let clientes = [];

    lsLista.forEach(cliente => {
        clientes.push({
            id_empresa: 1,
            id: cliente.COD,
            cnpj_cpf: "",
            razao: cliente.RAZAO,
            fantasi: cliente.FANTASIA,
            inscri: "",
            cadastr: '2022-03-01',
            ruaf: "",
            nrof: "",
            complementof: "",
            bairrof: "",
            cidadef: "",
            uff: "SP",
            cepf: "",
            tel1: "",
            tel2: "",
            emailf: "",
            obs: "",
            gru_econo: cliente.COD_GRUPO,
            user_insert: 1,
            user_update: 0
        });
    })


    try {

        const clients = await clienteSrv.getClientes();

        if (clients.length == 0) {

            try {

                for (cliente of clientes) {

                    await clienteSrv.insertCliente(cliente);

                }

                console.log('Tabela de Clientes OK');

            } catch (err) {

                if (err.name == 'MyExceptionDB') {

                    mensagens = err.message.split('|');

                    console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

                } else {

                    console.log("Falha Na Inclusão<<CLIENTES>>...", err.message);
                }

            }

        } else {

            console.log('Tabela de Clientes Já Está Populada..');

        }

    } catch (err) {

        console.log("Falha Na Inclusão <<CLIENTES>>...", err.message);

    }
}

Teste_data_incluir = async function() {

    try {

        const retorno = await empresaSrv.insertData();

        console.log("Datas Incluídas");

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            mensagens = err.message.split('|');

            console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

        } else {

            console.log("Falha Na Inclusão ", err.tabela, err.message);
        }

    }

}



Teste_data_leitura = async function() {

    try {

        const retorno = await empresaSrv.getDatas();

        console.log(retorno);

    } catch (err) {

        if (err.name == 'MyExceptionDB') {

            mensagens = err.message.split('|');

            console.log(`Falha Na Inclusão ${err.tabela} Messagens: ${mensagens}`);

        } else {

            console.log("Falha Na Inclusão ", err.tabela, err.message);
        }

    }

}

Teste_setStatus = async function() {

    const ret = await atividadeSrv.setStatus(1, 1, '0601');

    console.log(ret);

}
exports.Implanta_Clientes = async function() {


    id_empresa = await Empresa();

    if (id_empresa > 0) {

        await GrupoUsuarios(id_empresa);

        await Usuarios(id_empresa);

        const lsLista = clientesJson.getClientes();

        await GrupoEconomicoImplantacao(lsLista.GRUPO);

        await Clientes_Implantação(lsLista.EMPRESAS);

    }


};


exports.le_apontamentos = async function() {

    await Le_AponPlanejamento();

}


exports.Incluir_datas = async function() {

    await Teste_data_incluir();

}

exports.Ler_datas = async function() {

    await Teste_data_leitura();

}



exports.getConta = async function() {

    console.log("Nova Conta");

    await novaConta(1, "", "", 1);

    console.log("Nova Subconta");

    await novaConta(1, "01", "01", 2);

}

exports.Teste_Status = async function() {

    await Teste_setStatus();

}