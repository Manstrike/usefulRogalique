const configConn = require('./config-conn');

let connection;

async function deleteAlert(userId){
    connection = await configConn();

    const query = connection.excutes(`
        UPDATE user
        SET subscribe = 0
        WHERE chatID = ${userId}   
    `);

    if(query[0].length > 0){
        return true;
    }

    return false;
}

module.exports = deleteAlert;