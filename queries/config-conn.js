const mysql = require('mysql2/promise');

async function connectionConfig(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Password123',
        database: 'shedulerdb',
    });

    return connection;
}

module.exports = connectionConfig;
