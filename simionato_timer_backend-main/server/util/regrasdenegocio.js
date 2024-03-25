const aponExecucaoSrv = require('../services/aponExecucaoServices');
const aponPlanejamentoSrv = require('../services/aponPlanejamentoServices');
const clienteSrv = require('../services/clienteServices');
const projetoSrv = require('../services/projetoServices');
const empresaSrv = require('../services/empresaServices');
const usuarioSrv = require('../services/usuarioServices');
const feriadoSrv = require('../services/feriadoServices');
const motivoApoSrv = require('../services/motivoApoServices');
const gruEcoSrv = require('../services/grupoEcoServices');
const gruUserSrv = require('../services/grupoUserServices');
const AtividadeSrv = require('../services/atividadeService');
const titulo_projetoSrv = require('../services/titulo_projetoService');
const erroDB = require('../util/userfunctiondb');
const shared = require('../util/shared');


exports.Projetos_Inclusao = async function(projeto) {

    try {

        const obj = await projetoSrv.getProjeto(projeto.id_empresa, projeto.id);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'PROJETO', message: `Projeto (${projeto.id_empresa} + ${projeto.id}) - ${projeto.descricao} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Projetos_Alteracao = async function(projeto) {

    try {

        const obj_1 = await projetoSrv.getProjeto(projeto.id_empresa, projeto.id);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'PROJETO', message: `Projeto (${projeto.id_empresa} + ${projeto.id}) - ${projeto.descricao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Projetos_Exclusao = async function(id_empresa, id_projeto) {

    try {

        const proj = await projetoSrv.getProjeto(id_empresa, id_projeto);

        if (proj == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'PROJETO', message: `Projeto: (${id_empresa} + ${id_projetoS})  Não Existe Na Base De Dados.!` }]);

        }

        const atividades = await AtividadeSrv.existeAtividadesByProj(id_empresa, id_projeto);

        if (atividades.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'PROJETO', message: `Existem Atividades Alocadas Neste Projeto!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.GrusUser_Inclusao = async function(gruUser) {

    try {

        const obj = await gruUserSrv.getGrupoUser(gruUser.id_empresa, gruUser.id);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUUSER', message: `Grupo Usuário (${gruUser.id_empresa} + ${gruUser.id}) - ${gruUser.grupo} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.GrusUser_Alteracao = async function(gruUser) {

    try {

        const obj_1 = await gruUserSrv.getGrupoUser(gruUser.id_empresa, gruUser.id);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUUSER', message: `Grupo Usuário (${gruUser.id_empresa} + ${gruUser.id}) - ${gruUser.grupo} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.GrusUser_Exclusao = async function(id_empresa, id_gruUser) {

    try {

        const gru = await gruUserSrv.getGrupoUser(id_empresa, id_gruUser);

        if (gru == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUUSER', message: `Grupo Usuario (${id_empresa} + ${id_gruUserS})  Não Existe Na Base De Dados.!` }]);

        }

        var nro = await usuarioSrv.existeUsuariosByGrupo(id_empresa, id_gruUser);

        if (nro.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'USUARIO', message: ` Grupo (${id_empresa} + ${id_gruUser})  Está Associado A Vários Usuários!` }]);
        }

    } catch (err) {

        throw err;

    }


    return
}

exports.GrusEco_Inclusao = async function(gruEco) {

    try {

        const obj = await gruEcoSrv.getGrupoEco(gruEco.id_empresa, gruEco.id);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUECO', message: `Grupo Econômico (${gruEco.id_empresa} + ${gruEco.id}) - ${gruEco.razao} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.GrusEco_Alteracao = async function(gruEco) {

    try {

        const obj_1 = await gruEcoSrv.getGrupoEco(gruEco.id_empresa, gruEco.id);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUECO', message: `Grupo Economico (${gruEco.id_empresa} + ${gruEco.id}) - ${gruEco.razao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.GrusEco_Exclusao = async function(id_empresa, id_gruEco) {

    try {

        const gru = await gruEcoSrv.getGrupoEco(id_empresa, id_gruEco);

        if (gru == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUECO', message: `Grupo Econômico (${id_empresa} + ${id_gruEco})  Não Existe Na Base De Dados.!` }]);

        }

        var nro = await clienteSrv.getClientesByGrupo(id_empresa, id_gruEco);

        if (typeof nro.count == 'string') nro = parseInt(nro.count);

        if (nro > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'GRUECO', message: `Grupo Econômico (${id_empresa} + ${id_gruEco})  Está Associado A Vários Clientes!` }]);
        }

    } catch (err) {

        throw err;

    }


    return
}

exports.MotivosApo_Inclusao = async function(motivoApo) {

    try {

        const obj = await motivoApoSrv.getMotivoApo(motivoApo.id_empresa, motivoApo.id);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'MOTIVOAPOS', message: `Motivo Apontamento (${usuario.id_empresa} + ${motivoApo.id}) - ${motivoApo.motivo} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.MotivosApo_Alteracao = async function(motivoApo) {

    try {

        const obj_1 = await motivoApoSrv.getMotivoApo(motivoApo.id_empresa, motivoApo.codigo);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'MOTIVOAPOS', message: `Motivo Apontamento (${motivoApo.id_empresa} + ${motivoApo.id}) - ${motivoApo.motivo} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.MotivosApo_Exclusao = async function(id_empresa, codigo) {

    try {

        const cli = await motivoApoSrv.getMotivoApo(id_empresa, codigo);

        if (cli == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'MOTIVOAPOS', message: `Motivo Apontamento (${id_empresa} + ${codigo})  Não Existe Na Base De Dados.!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Feriados_Inclusao = async function(feriado) {
    let retorno = { 'nlanc01': 0, 'nlanc02': 0 }
    try {
        const obj = await feriadoSrv.getFeriado(feriado.id_empresa, feriado.id_usuario, feriado.id_tipo, feriado.data);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS', message: `Feriado (${feriado.data}) - ${feriado.descricao} Já Existe Na Base De Dados.!` }]);

        }

        if (feriado.lancamento01) {
            feriado.lancamento01.obs = `Ponte: ${feriado.data}-${feriado.descricao}`;
            console.log('apontamento manhã', feriado.lancamento01);

            const apon = await aponExecucaoSrv.insertAponExecucao(feriado.lancamento01);

            if (apon == null) {
                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS-APONTAMENTOS', message: `Falha Na Inclusão Lançamento Manhã!` }]);
            }


            retorno.nlanc01 = apon.id;


        }
        if (feriado.lancamento02) {
            feriado.lancamento02.obs = `Ponte: ${feriado.data}-${feriado.descricao}`;
            console.log('apontamento tarde', feriado.lancamento02);

            apon = await aponExecucaoSrv.insertAponExecucao(feriado.lancamento02);

            if (apon == null) {
                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS-APONTAMENTOS', message: `Falha Na Inclusão Lançamento Tarde!` }]);
            }

            retorno.nlanc02 = apon.id;
        }

        return retorno;

    } catch (err) {

        throw err;

    }


    return
}

exports.Feriados_Alteracao = async function(feriado) {

    try {

        const obj_1 = await feriadoSrv.getFeriado(feriado.id_empresa, feriado.id_usuario, feriado.id_tipo, feriado.data);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS', message: `Feriado ( ${feriado.data}) - ${feriado.descricao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Feriados_Alteracao_Ponte = async function(ponte) {

    try {

        const obj_1 = await feriadoSrv.getPonte(ponte.id_empresa, ponte.data);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS', message: `Ponte ( ${feriado.data}) - ${feriado.descricao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Feriados_Exclusao = async function(id_empresa, id_usuario, id_tipo, data) {

    try {

        const fer = await feriadoSrv.getFeriado(id_empresa, id_usuario, id_tipo, data);

        if (fer == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS', message: `Feriado (${data})  Não Existe Na Base De Dados.!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}


exports.Feriados_Exclusao_Ponte = async function(id_empresa, data) {

    try {

        const pontes = await feriadoSrv.getPonte(id_empresa, data);

        if (pontes == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'FERIADOS', message: `Ponte (${data})  Não Existe Na Base De Dados.!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Usuarios_Inclusao = async function(usuario) {

    try {

        const obj = await usuarioSrv.getUsuario(usuario.id_empresa, usuario.id);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'MOTIVOAPOS', message: `Usuario (${usuario.id_empresa} + ${usuario.id}) - ${usuario.razao} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Usuarios_Alteracao = async function(usuario) {

    try {

        const obj_1 = await usuarioSrv.getUsuario(usuario.id_empresa, usuario.id);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'MOTIVOAPOS', message: `Usuario (${usuario.id_empresa} + ${usuario.id}) - ${usuario.razao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Usuarios_Exclusao = async function(id_empresa, id_usuario) {

    try {

        const cli = await usuarioSrv.getUsuario(id_empresa, id_usuario);

        if (cli == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'MOTIVOAPOS', message: `Usuario (${id_empresa} + ${id_cliente})  Não Existe Na Base De Dados.!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}


exports.Clientes_Inclusao = async function(cliente) {

    try {

        const tar = await clienteSrv.getCliente(cliente.id_empresa, cliente.id);

        if (tar != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CLIENTES', message: `Cliente (${cliente.id_empresa} + ${cliente.id}) - ${cliente.razao} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Clientes_Alteracao = async function(cliente) {

    try {

        const obj_1 = await clienteSrv.getCliente(cliente.id_empresa, cliente.id);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CLIENTES', message: `Cliente (${cliente.id_empresa} + ${cliente.id}) - ${cliente.razao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Clientes_Exclusao = async function(id_empresa, id_cliente) {

    try {

        const cli = await clienteSrv.getCliente(id_empresa, id_cliente);

        if (cli == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CLIENTES', message: `Cliente (${id_empresa} + ${id_cliente})  Não Existe Na Base De Dados.!` }]);

        }

        const pro = await projetoSrv.getProjetosByIdEmpresaIdCliente(id_empresa, id_cliente);


        if (pro.length > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CLIENTES', message: `Cliente (${id_empresa} + ${id_cliente}) - Existe Em Outros Projetos ` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Empresas_Inclusao = async function(empresa) {

    try {

        const tar = await empresaSrv.getEmpresa(empresa.id);

        if (tar != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'EMPRESAS', message: `Empresa (${empresa.id}) - ${empresa.razao} Já Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Empresas_Alteracao = async function(empresa) {

    try {

        const obj_1 = await empresaSrv.getEmpresa(empresa.id);

        if (obj_1 == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'EMPRESAS', message: `Empresa ( ${empresa.id}) - ${empresa.razao} Não Existe Na Base De Dados.!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Empresas_Exclusao = async function(id_empresa) {

    try {

        const obj = await empresaSrv.getEmpresa(id_empresa);

        if (obj == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'EMPRESAS', message: `Empresa (${id_empresa})  Não Existe Na Base De Dados.!` }]);

        }

        const cli = await clienteSrv.existeClientes(id_empresa);


        if (cli.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CLIENTES', message: `Existem Clientes Para Esta Empresa.! ` }]);

        }


        const pro = await projetoSrv.getProjetosByIdEmpresa(id_empresa);


        if (pro.length > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'CONTRATOS', message: `Existem Contratos Para Esta Empresa.!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Apons_Execucao_Inclusao = async function(aponExecucao) {

    try {

        const apon = await aponExecucaoSrv.getAponExecucao(aponExecucao.id_empresa, aponExecucao.id);

        if (apon != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Execucao  (${aponExecucao.id_empresa} + ${aponExecucao.codigo}) - ${aponExecucao.descricao} Já Existe Na Base de Dados!` }]);

        }

        if (aponExecucao.id_projeto != 900000) {

            const nlanc = await aponExecucaoSrv.ExisteLancamentoNestaHora(aponExecucao, 'I');


            if (nlanc.total > 0) {

                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Execucao Sobreposição de horários para este lançamento!` }]);

            }


            const nlanc2 = await aponExecucaoSrv.ExisteLancamentoNestaHoraExato(aponExecucao, 'I');


            if (nlanc2.total > 0) {

                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Execucao Sobreposição de horários para este lançamento!` }]);

            }
        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Apons_Execucao_Alteracao = async function(aponExecucao) {

    try {

        const apon = await aponExecucaoSrv.getAponExecucao(aponExecucao.id_empresa, aponExecucao.id);

        if (apon == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: `APONTAMENTOS DE EXECUCAO', message: 'Apontamento de Execucao  (${aponExecucao.id_empresa} + ${aponExecucao.id}) - ${aponExecucao.descricao} Não Existe Na Base de Dados!` }]);

        }

        if (aponExecucao.id_projeto != 900000) {

            const nlanc = await aponExecucaoSrv.ExisteLancamentoNestaHora(aponExecucao, 'E');

            if (nlanc.total > 0) {

                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Execucao Sobreposição de horários para este lançamento!` }]);

            }

            const nlanc2 = await aponExecucaoSrv.ExisteLancamentoNestaHoraExato(aponExecucao, 'E');


            if (nlanc2.total > 0) {

                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Execucao Sobreposição de horários para este lançamento!` }]);

            }
        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Apons_Execucao_Exclusao = async function(id_empresa, id) {

    try {

        const tar = await aponExecucaoSrv.getAponExecucao(id_empresa, id);

        if (tar == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Execucao  (${id_empresa} + ${id}) Não Existe Na Base De Dados!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Apons_Execucao_ExclusaoByNlanc = async function(id_empresa, nlanc) {

    try {

        if (nlanc <= 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Banco (${id_empresa} + ${nlanc}) Nro Lançamento Zerado!` }]);

        }

        const lanc = await aponExecucaoSrv.getAponExecucaoByNlanc(id_empresa, nlanc);

        if (lanc == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE EXECUCAO', message: `Apontamento de Banco (${id_empresa} + ${nlanc}) Não Existe Na Base De Dados!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}


exports.Apons_Planejamento_Inclusao = async function(aponsPlanejamento) {

    try {

        const tar = await aponPlanejamentoSrv.getAponPlanejamento(aponsPlanejamento.id_empresa, aponsPlanejamento.id);

        if (tar != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE planejamento', message: `Apontamento de Planejamento  (${aponsPlanejamento.id_empresa} + ${aponsPlanejamento.id}) - ${aponsPlanejamento.descricao} Já Existe Na Base de Dados!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Apons_Planejamento_Alteracao = async function(aponsPlanejamento) {

    try {

        const tar = await aponPlanejamentoSrv.getAponPlanejamento(aponsPlanejamento.id_empresa, aponsPlanejamento.id);

        if (tar == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: `APONTAMENTOS DE PLANEJAMENTO', message: 'Apontamento de Execucao  (${aponsPlanejamento.id_empresa} + ${aponsPlanejamento.id}) - ${aponsPlanejamento.descricao} Não Existe Na Base de Dados!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Apons_Planejamento_Exclusao = async function(id_empresa, id) {

    try {

        const tar = await aponPlanejamentoSrv.getAponPlanejamento(id_empresa, id);

        if (tar == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'APONTAMENTOS DE planejamento', message: `Apontamento de Planejamento  (${id_empresa} + ${id}) Não Existe Na Base De Dados!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Atividades_Inclusao = async function(id_empresa, conta, versao, id_projeto) {

    try {

        const obj = await AtividadeSrv.existeAtividade(id_empresa, conta, versao, id_projeto);

        if (obj.total != 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: ` Atividade (${conta} Versão:${versao}Já Está Anexada Neste Projeto!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Atividade_Exclusao = async function(id_empresa, id_projeto, conta, versao, subconta) {

    try {

        console.log('par=>', id_empresa, id_projeto, conta, versao, subconta);

        const obj = await AtividadeSrv.existeAtividade(id_empresa, id_projeto, conta, versao, subconta);

        console.log('obj.total', obj.total);

        if (obj.total == 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta} Versão: ${versao} Não Está Anexada Neste Projeto!` }]);

        }

        const ct_pl = await aponPlanejamentoSrv.existeAponPlanejamentoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta)


        console.log('ct_pl', ct_pl.total);

        if (ct_pl.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta} Versão: ${versao} Possui Lançamentos De Planejamento` }]);

        }


        const ct_ex = await aponExecucaoSrv.existeAponExecucaoAtividadeUnica(id_empresa, id_projeto, conta, versao, subconta)


        console.log('ct_ex', ct_ex.total);

        if (ct_ex.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta} Versão: ${versao} Possui Lançamentos De Executação` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Atividades_Exclusao = async function(id_empresa, conta, versao, id_projeto) {

    try {

        const obj = await AtividadeSrv.existeAtividades(id_empresa, id_projeto, conta, versao);

        if (obj.total == 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta} Versão: ${versao} Não Está Anexada Neste Projeto!` }]);

        }

        const ct_pl = await aponPlanejamentoSrv.existeAponPlanejamentoAtividade(id_empresa, id_projeto)

        if (ct_pl.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta} Versão: ${versao} Possui Lançamentos De Planejamento` }]);

        }


        const ct_ex = await aponExecucaoSrv.existeAponExecucaoAtividade(id_empresa, id_projeto)

        if (ct_ex.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta} Versão: ${versao} Possui Lançamentos De Executação` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Atividades_Delete_Estrutura = async function(id_empresa, conta, versao) {

    try {

        const obj = await AtividadeSrv.existeAtividadesEstrutura(id_empresa, conta, versao);

        if (obj.total > 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Existem Atividades Anexadas Nesta Estrutura!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Atividades_Delete_SubConta = async function(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel) {

    try {

        const obj = await AtividadeSrv.existeLancamentosSubconta(id_empresa, id_projeto, id_conta, id_conta_versao, id_subconta, nivel);

        if (obj.length == 2 && (obj[0].total > 0 || obj[1].total > 0)) {

            let men = "";

            men += (obj[0].total + obj[1].total) > 0 ? "Existem " : "";

            men += obj[0].total > 0 ? `${obj[0].total} Lanç. De Execução} ` : ``;

            men += obj[1].total > 0 ? `${obj[1].total} Lanç. De Planejamento}` : ``;

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: men }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Estruturas_Inclusao = async function(id_empresa, conta, versao, id_projeto) {

    try {

        const obj = await AtividadeSrv.existeAtividade(id_empresa, conta, versao, id_projeto);

        if (obj.total != 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: ` Atividade (${conta} ${versao} Já Está Anexada Neste Projeto!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Estruturas_Exclusao = async function(id_empresa, conta, id_projeto) {

    try {

        const obj = await AtividadeSrv.existeAtividade(id_empresa, conta, id_projeto);

        if (obj.total == 0) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'ATIVIDADE', message: `Estrutura (${conta}  Não Está Anexada Neste Projeto!` }]);

        }


    } catch (err) {

        throw err;

    }


    return
}

exports.Titulo_Projeto_Inclusao = async function(titulo) {
    console.log('Titulo_Projeto_Inclusao =>', titulo);
    let erro_data = '';
    const data_vencto = new Date(shared.formatDateYYYYMMDD(titulo.data_vencto));
    if (titulo.data_pagto !== '') {
        const data_pagto = new Date(shared.formatDateYYYYMMDD(titulo.data_pagto));
        const time_pagto = data_pagto.getTime();
        if (time_pagto < data_vencto.getTime()) {
            erro_data = 'Data De Pagamento Deverá Ser Maior Ou Igual A Data De Vencto!'
        }
    }
    try {

        if (erro_data != '') {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TITULOS', message: `${erro_data}` }]);
        }


        const obj = await titulo_projetoSrv.getTitulo_Projeto(titulo.id_empresa, titulo.id_projeto, titulo.data_vencto);

        if (obj != null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TITULOS', message: ` Titulo Já Cadastrado!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Titulo_Projeto_Alteracao = async function(titulo) {
    console.log('Titulo_Projeto_Alteracao =>', titulo);
    let erro_data = '';
    const data_vencto = new Date(shared.formatDateYYYYMMDD(titulo.data_vencto));
    if (titulo.data_pagto !== '') {
        const data_pagto = new Date(shared.formatDateYYYYMMDD(titulo.data_pagto));
        const time_pagto = data_pagto.getTime();
        if (time_pagto < data_vencto.getTime()) {
            erro_data = 'Data De Pagamento Deverá Ser Maior Ou Igual A Data De Vencto!'
        }
    }
    console.log('Regra de negocio alteração =>', titulo);
    try {

        if (erro_data != '') {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TITULOS', message: `${erro_data}` }]);
        }

        const obj = await titulo_projetoSrv.getTitulo_Projeto(titulo.id_empresa, titulo.id_projeto, titulo.data_vencto);

        if (obj == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TITULOS', message: ` Titulo  Não Cadastrado!` }]);

        }

    } catch (err) {

        throw err;

    }


    return
}

exports.Titulo_Projeto_Exclusao = async function(id_empresa, id_projeto, data_vencto) {
    try {

        const obj = await titulo_projetoSrv.getTitulo_Projeto(id_empresa, id_projeto, data_vencto);

        if (obj == null) {

            throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TITULOS', message: ` Titulo ${data_vencto} Não Está Cadastrado!` }]);

        }

        if (obj != null) {

            if (obj.data_pagto != null) {
                throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TITULOS', message: ` Titulo ${data_vencto} Está Baixado. Não Posso Excluí-lo!` }]);
            }

        }


    } catch (err) {

        throw err;

    }


    return
}