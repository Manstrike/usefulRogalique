const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {Int} groupId User's group ID from user.db table.
 * @returns {Object} Database object with group definition. 
 */


async function getGroup(groupId){
    this.groupId = groupId;
   
    connection = await conn();
   
    const query = await connection.execute(`
        SELECT * 
        FROM group_list
        WHERE id_groups = ${groupId};    
    `);
   
    if(query[0].length>0){
        return query[0];
    }
   console.dir(query[0]);
    return false;
}

module.exports = getGroup;