const conn = require('./config-conn.js');
const moment = require('moment');
const getShed = require('./get-shedule.js');

let connection;
/**
 * 
 * @param {Object} msg User's message.
 * @returns {Object} Database obj on success.
 * @returns {False} On failure.
 */

async function getShedByDay(msg){
    this.msg = msg;

    connection = await conn();
    
    const currDate = moment.unix(msg.date).format('LLLL');
    const currDay = currDate.split(', ');

    var currWeek = moment(msg.date).weeksInYear();

    if(currWeek % 2 ===0){
        currWeek = 1;
    }else{
        currWeek = 0;
    }

    const getDayID = await connection.execute(`
        SELECT id_days
        FROM days 
        WHERE name_days = '${currDay[0]}';
    `);

    const getShedule = await getShed({
        msg: msg,
        day: getDayID[0][0].id_days,
        week: currWeek,
    });
    
    if(getShedule){
        return getShedule;
    }
    
    return false;
}

module.exports = getShedByDay;