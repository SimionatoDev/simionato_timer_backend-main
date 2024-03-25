const axios = require('axios');
const crypto = require('crypto');
const tarefasSrv = require('../services/tarefaServices');

const generate = function(tam) {
    return crypto.randomBytes(30).toString('hex').substring(0, tam);
}

test('Should Save Tarefa', async function() {
    tarefa = await tarefasSrv.insertTarefa({ id_empresa: 1, codigo: 'xxxxxx', descricao: 'mndkshdjkhskjdhksjhdkjsdh' });
});


test('Should get Tarefas', async function() {
    // given - Dado que
    const tarefa1 = await tarefasSrv.insertTarefa({ id_empresa: 1, codigo: generate(6), descricao: generate(20) });
    const tarefa2 = await tarefasSrv.insertTarefa({ id_empresa: 1, codigo: generate(6), descricao: generate(20) });
    const tarefa3 = await tarefasSrv.insertTarefa({ id_empresa: 1, codigo: generate(6), descricao: generate(20) });
    // when - Quando acontecer 
    const response = await axios({
        url: 'http://localhost:3000/api/tarefas',
        method: 'get'
    });
    // then - então valide
    expect(lsTarefas).toHaveLength(3);

});