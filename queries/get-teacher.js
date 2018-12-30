const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {Int} teacherId Id for searching.
 * @returns {Array} Array with results if success.
 * @returns {False} On failure.
 */

async function getTeacher(teacherId){
    this.teacherId = teacherId;

    connection = await conn();

    const query = await connection.execute(`
        SELECT *
        FROM teachers
        WHERE id_teachers = ${teacherId};
    `);

    if(query[0].length){
        const query2 = await connection.execute(`
            SELECT name_positions
            FROM positions
            WHERE id_positions = ${query[0][0].position_teachers};
        `);

        if(query2[0].length){
            const teacher = [`${query[0][0].lastname_teachers}`,
                             `${query[0][0].firstname_teachers}`,
                             `${query[0][0].secondname_teachers}`];
            const res = [teacher.join(' '), query2[0][0].name_positions];

            return res;
        }

        return false;
    }

    return false;

}

module.exports = getTeacher;