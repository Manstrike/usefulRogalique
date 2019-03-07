const configConn = require('./config-conn');

let connection;

/**
 * 
 * @param {Number} userId User's ID.
 * @param {String} dateTime User's setting.
 * @returns {Boolean} 
 */
async function insertMark(userId, dateTime){
    connection = await configConn();

    const query = await connection.execute(`
        UPDATE user 
        SET user.last_send = '${dateTime}'
        WHERE user.chatID = ${userId};
    `);

    if(query[0].length > 0){
        return true;
    }

    return false;
}

module.exports = insertMark;