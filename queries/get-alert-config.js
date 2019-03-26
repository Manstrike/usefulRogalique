const configConn = require('./config-conn');

let connection;
/**
 * @returns {Object} Object which contains every single setting.
 */
async function getAlertConfig(){
    connection = await configConn();

    const query = await connection.execute(`
        SELECT notif_config 
        FROM user
        WHERE subscribe = 1
    `);

    return query[0];
}

module.exports = getAlertConfig;