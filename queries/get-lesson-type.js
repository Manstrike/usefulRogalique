const conn = require('./config-conn.js');

let connection;

async function getLessType(ltId){
    this.ltId = ltId;

    connection = await conn();

    const query = await connection.execute(`
        SELECT *
        FROM lesson_type
        WHERE id_lesson_type = ${ltId};   
    `);

    if(query[0].length){
        return query[0][0].type_lesson;
    }

    return false;
}

module.exports = getLessType;