exports.Usuarios = function() {
    const parametros = {
        id_empresa: {
            check: true,
            require: true,
            min: 1
        },
        id: null,
        razao: {
            check: true,
            require: true,
            maxLength: 40,
        },
        cnpj_cpf: null,
        cadastr: null,
        rua: {
            check: true,
            require: true,
            maxLength: 80,
        },
        nro: {
            check: true,
            require: true,
            maxLength: 10,
        },
        complemento: {
            check: true,
            require: true,
            maxLength: 30,
        },
        bairro: {
            check: true,
            require: true,
            maxLength: 40,
        },
        cidade: {
            check: true,
            require: true,
            maxLength: 40,
        },
        uf: {
            check: true,
            require: true,
            maxLength: 2,
        },
        cep: {
            check: true,
            require: true,
            maxLength: 8,
        },
        tel1: {
            check: true,
            require: true,
            maxLength: 23
        },
        tel2: {
            check: true,
            maxLength: 23,
        },
        email: {
            check: true,
            maxLength: 100,
        },
        senha: {
            check: true,
            require: true,
            maxLength: 255,
        },
        pasta: {
            check: true,
            require: true,
            maxLength: 100,
        },
        grupo: {
            check: true,
            require: true,
            maxLength: 40,
        }
    };

    return parametros;
}

exports.Empresas = function() {

    const parametros = {
        id: { check: true, require: true },
        cnpj_cpf: { check: true, require: true, maxLength: 14 },
        razao: { check: true, require: true, maxLength: 40 },
        fantasi: { check: true, require: true, maxLength: 20 },
        inscri: { check: true, require: true, maxLength: 20 },
        cadastr: { check: true, require: true },
        ruaf: { check: true, require: true, maxLength: 80 },
        nrof: { check: true, require: true, maxLength: 10 },
        complementof: { check: true, require: true, maxLength: 30 },
        bairrof: { check: true, require: true, maxLength: 40 },
        cidadef: { check: true, require: true, maxLength: 40 },
        uff: { check: true, require: true, maxLength: 2 },
        cepf: { check: true, require: true, maxLength: 8 },
        tel1: { check: true, require: true, maxLength: 23 },
        tel2: { check: true, require: true, maxLength: 23 },
        emailf: { check: true, require: true, maxLength: 100 },
        obs: { check: true, require: true, maxLength: 200 }
    }

    return parametros;
}

exports.Tarefas = function() {
    const parametros = {
        id_empresa: {
            check: true,
            require: true,
            min: 1
        },
        codigo: {
            check: true,
            require: true,
            maxLength: 6
        },
        descricao: {
            check: true,
            require: true,
            maxLength: 40
        }
    };

    return parametros;

}

exports.Clientes = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        cnpj_cpf: { check: true, require: true, maxLength: 14 },
        razao: { check: true, require: true, maxLength: 65 },
        fantasi: { check: true, require: true, maxLength: 25 },
        inscri: { check: true, require: true, maxLength: 20 },
        cadastr: { check: true, require: true },
        ruaf: { check: true, require: true, maxLength: 80 },
        nrof: { check: true, require: true, maxLength: 10 },
        complementof: { check: true, require: true, maxLength: 30 },
        bairrof: { check: true, require: true, maxLength: 40 },
        cidadef: { check: true, require: true, maxLength: 40 },
        uff: { check: true, require: true, maxLength: 2 },
        cepf: { check: true, require: true, maxLength: 8 },
        tel1: { check: true, require: true, maxLength: 23 },
        tel2: { check: true, require: true, maxLength: 23 },
        emailf: { check: true, require: true, maxLength: 100 },
        obs: { check: true, require: true, maxLength: 200 },
        gru_econo: { check: true, require: true, min: 0 }

    };

    return parametros;
}

exports.AponExecucao = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        id_projeto: { check: true, require: true, min: 1 },
        id_conta: { check: true, require: true },
        id_subconta: { check: true, require: true },
        id_resp: { check: true, require: true, min: 1 },
        id_exec: { check: true, require: true, min: 1 },
        inicial: { check: true, require: true },
        final: { check: true, require: true },
        obs: { check: true, maxLength: 150 },
        horasapon: { check: true, require: true, novalue: 0 },
        encerramento: { check: true, require: true, maxLength: 1 }
    };

    return parametros;
};

exports.AponPlanejamento = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        id_projeto: { check: true, require: true, min: 1 },
        id_tarefa: { check: true, require: true, min: 1 },
        id_trabalho: { check: true, require: true, min: 1 },
        id_resp: { check: true, require: true, min: 1 },
        id_exec: { check: true, require: true, min: 1 },
        inicial: { check: true, require: true },
        final: { check: true, require: true },
        obs: { check: true, require: true, maxLength: 50 },
        horasapon: { check: true, require: true, min: 0.01 },
        encerra: { check: true, require: true, maxLength: 1 }
    };

    return parametros;



};

exports.TarefaProjeto = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        id_projeto: { check: true, require: true, min: 1 },
        id_tarefa: { check: true, require: true, min: 1 },
        id_resp: { check: true, require: true, min: 1 },
        seq: { check: true, require: true, min: 1 },
        inicial: { check: true, require: true },
        final: { check: true, require: true },
        obs: { check: true, require: true, maxLength: 50 },
        status: { check: true, require: true, maxLength: 1 }

    };

    return parametros;

}

exports.TrabalhoProjeto = function() {

    const parametros = {

        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        id_projeto: { check: true, require: true, min: 1 },
        id_tarefa: { check: true, require: true },
        id_trabalho: { check: true, require: true },
        seq: { check: true, require: true, min: 1 },
        id_resp: { check: true, require: true, min: 1 },
        id_exec: { check: true, require: true, min: 1 },
        inicial: { check: true, require: true },
        final: { check: true, require: true },
        obs: { check: true, require: true, maxLength: 50 },
        status: { check: true, require: true, maxLength: 1 }

    };

    return parametros;

}

exports.GrupoEco = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 0 },
        id: { check: true, require: true },
        razao: { check: true, require: true, maxLength: 20 }
    };

    return parametros;
}

exports.GrupoUser = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        grupo: { check: true, require: true, maxLength: 20 }
    };

    return parametros;
}

exports.MotivoApo = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        codigo: { check: true, require: true },
        motivo: { check: true, require: true, maxLength: 20 }
    }


    return parametros;
}

exports.Projetos = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id: { check: true, require: true },
        id_cliente: { check: true, require: true, min: 1 },
        id_diretor: { check: true, require: true, min: 1 },
        dataprop: { check: true, require: true },
        dataproj: { check: true, require: true },
        dataenc: { check: false },
        descricao: { check: true, require: true, maxLength: 50 },
        horasve: { check: true, require: true, min: 0.01 },
        status: { check: true, require: true, maxLength: 1 }
    }

    return parametros;

};

exports.Feriados = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        datafer: { check: true, require: true },
        descricao: { check: true, require: true, maxLength: 50 }
    };

    return parametros;

};

exports.Estado = function() {

    const parametos = {
        sigla: { check: true, require: true, maxLength: 2 },
        estado: { check: true, require: true, maxLength: 20 }
    };


    return parametros;
}

exports.TITULOS_PROJETO = function() {

    const parametros = {
        id_empresa: { check: true, require: true, min: 1 },
        id_projeto: { check: true, require: true, min: 1 },
        data_vencto: { check: true, require: true },
        valor: { check: true, min: 1 },
        obs: { check: true, require: true, maxLength: 100 },
    }

    return parametros;

};