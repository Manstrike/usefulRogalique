const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {String} groupId User's group ID from user.db table.
 * @returns {Object} Database object with group definition. 
 */


async function getGroupId(group){
    this.group = group;
   
    connection = await conn();
   
    const query = await connection.execute(`
        SELECT * 
        FROM group_list
        WHERE code_groups LIKE'%${group}';    
    `);
    console.dir(query[0]);
    if(query[0].length>0){
        return query[0][0].id_groups;
    }
   
    return false;
}

module.exports = getGroupId;