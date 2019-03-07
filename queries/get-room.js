const conn = require('./config-conn.js');

let connection;

/**
 * 
 * @param {Number} roomId ID number of room.
 * @returns {Array,Boolean} If success, returns array with info, if not - returns false.
 */

async function getRoom(roomId){
    this.roomId = roomId;

    connection = await conn();

    const query = await connection.execute(`
        SELECT *
        FROM rooms
        WHERE id_rooms = ${roomId};
    `);

    if(query[0].length){
        const query2 = await connection.execute(`
                SELECT name_building
                FROM building
                WHERE id_building = ${query[0][0].building_rooms};
            `);

        if(query2[0].length){
           const res = [query[0][0].number_rooms, query2[0][0].name_building]; 
           
           return res;
        }

        return false
    }

    return false;

}

module.exports = getRoom;