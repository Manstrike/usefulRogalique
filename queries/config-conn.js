const mysql = require('mysql2/promise');
require('dotenv').config()



async function connectionConfig(){

    let connection;

    if(!connection){
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            insecureAuth : true,
        });
        
        return connection;
    }
    

    
}

module.exports = connectionConfig;
