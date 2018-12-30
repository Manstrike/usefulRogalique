const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {Int} subId Subject ID
 * @returns {Object} Dataset object if success.
 * @returns {False} On failure.
 */

async function getSubject(subId){
    this.subId = subId;

    connection = await conn();

    const query = await connection.execute(`
        SELECT *
        FROM subjects
        WHERE id_subjects = ${subId};
    `);

    if(query[0].length){
        return query[0][0].name_subject;
    }

    return false;
}

module.exports = getSubject;