const mysql = require('mysql2/promise');
const env = require('./env-db');


async function connectionConfig(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: env.db_password,
        database: 'shedulerdb',
    });

    return connection;
}

module.exports = connectionConfig;
