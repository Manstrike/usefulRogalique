const mysql = require('mysql2/promise');
require('dotenv').config()


async function connectionConfig(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'shedulerdb',
    });

    return connection;
}

module.exports = connectionConfig;
