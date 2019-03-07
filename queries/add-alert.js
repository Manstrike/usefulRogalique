const configConn = require('./config-conn');

let connection;

/**
 * 
 * @param {Number} userId User's ID.
 * @param {String} time Setting for the alert. 
 * @returns {Boolean} Operation done/undone.
 */

async function setAlertTime(userId, time){
    connection = await configConn();

    const query = connection.execute(`
        UPDATE user
        SET notif_config = '${time}', subscribe = 1    
        WHERE chatID = ${userId}
    `);

    if(query[0].length > 0){
        return true;
    }

    return false;
}

module.exports = setAlertTime;