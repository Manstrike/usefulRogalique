const conn = require('./config-conn.js');
/**
     * @param {Object} msg Constains user's message info from chat.
     * @param {Object} match Here user's params from message.
     * @returns {Boolean} Indicates success of inserting.
     */

let connection;

async function initDatabase(){
    connection = await conn();
};

const regUser = async function setUser(msg,match){
    await initDatabase();

    this.msg = msg;
    this.match = match;

    const chatID = msg.chat.id;

    const groupCode = Number(match[1]);

    const username = msg.from.username;

    var fullName = ``;

    if(!username){
        const fName = msg.from.first_name;
        const lName = msg.from.last_name;
        fullName = `${fName} ${lName}`;
    }

    const name = username === undefined ? fullName : username;

    console.log(name,chatID,groupCode);

    const query = await connection.execute(`
        INSERT INTO user (name, chatID, group_code)
        VALUES('${name}','${chatID}',${groupCode});
    `);

    if(query[0].affectedRows>0){
        return true;
    }else{
        return false;
    }
}

module.exports = regUser;