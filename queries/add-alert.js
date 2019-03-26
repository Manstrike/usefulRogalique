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

    const query = await connection.execute(`
        UPDATE user
        SET notif_config = '${time}', subscribe = 1    
        WHERE chatID = ${userId}
    `);
    console.dir(query)
    if(query[0].affectedRows>0){
            return true;
    }else{
        return false;
    }
        
}

module.exports = setAlertTime;