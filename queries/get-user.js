const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {Number} chatId User's ID.
 * @returns {Object} Database object.
 */

const getUser = async function getUser(chatId){

    connection = await conn();
    
    this.chatId = chatId;
    
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