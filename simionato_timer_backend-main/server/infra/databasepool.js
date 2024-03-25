const pgp = require('pg-promise')();

exports.getConnect = async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        user: 'postgres',
        password: '123456',
        host: 'localhost',
        port: 5432,
        database: 'db_control_time_auditor_homologacao'
    });

    /*
        //
        pool.connect((err, client, release) => {
                if (err) {
                    return console.error('Error acquiring client', err.stack)
                }
                client.query('SELECT NOW()', (err, result) => {
                    release()
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                    console.log(result.rows)
                })
            })
    */

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}