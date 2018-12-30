const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {Object} msg User's message to perform query.
 * @returns {Object} Database object.
 */

const getUser = async function getUser(msg){

    connection = await conn();
    
    this.msg = msg;
    
    const chatId = msg.chat.id;
    
    const query = await connection.execute(`
        SELECT * FROM user 
        WHERE user.chatID = ${chatId};
    `);

    if(query[0].length>0){
        return query[0];
    }
    
    return false;

}

module.exports = getUser;