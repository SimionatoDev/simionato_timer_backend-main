dbPool = require('../infra/databasepool');

test('Teste de conexão', async function() {


    //apenas testando a conexão
    const client = await dbPool.getConnect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('select * from tarefas');
    console.log(res.rows);
    client.release();

});