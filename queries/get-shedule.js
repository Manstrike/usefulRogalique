const conn = require('./config-conn.js');
const getUser = require('./get-user.js');
const getGroup = require('./get-group.js');
const getSubs = require('./get-subject.js');
const getLessType = require('./get-lesson-type.js');
const getRoom = require('./get-room.js');
const getTeacher = require('./get-teacher.js');

let connection;

/**
 * 
 * @param {Number} chatId User's message.
 * @returns {Object} Database object on success.
 * @returns {False} On failure.
 */

async function getShedule({chatId, day , week}){
    this.chatId = chatId;
    this.day = day;
    this.week = week;

    connection = await conn();
    
    const user = await getUser(chatId);
    
    if(user == false){
        return false;
    };

    if(day == undefined || week == undefined){
        const groupShedule = await connection.execute(`
            SELECT * 
            FROM sheduler
            WHERE groupID = ${user[0].group_code}
            ORDER BY day;
        `);
        
        if(groupShedule[0].length>0){
            const resObj = await getShedNames(groupShedule[0],user[0].group_code);
            return resObj;
        };
    
        return false;
    };
    
    const groupDailyShedule = await connection.execute(`
        SELECT * 
        FROM sheduler
        WHERE groupID = ${user[0].group_code}
        AND day = ${day} 
        AND week_mark LIKE '%${week}%'
        ORDER BY lesson_number;
    `);
    
    if(groupDailyShedule[0].length>0){
        const resObj = await getShedNames(groupDailyShedule[0],user[0].group_code);
        return resObj;
    }

    return false;

}   

async function getShedNames(shedule,groupCode){
    const nameShed = {};
    nameShed.group_code = groupCode;
    const resObj = [];
    var subArr = [];
    var tempObj = {};

    for (const item of shedule) {
        const subId = await getSubs(item.subject);
        
        const lessType = await getLessType(item.lesson_type);
        
        const room = await getRoom(item.room);
      
        const teacher = await getTeacher(item.teacher);

        const positionTeach = teacher[1];
        
        subArr = [subId, teacher[0], room[0], room[1],lessType];

        tempObj = {
            day: item.day,
            l_num: item.lesson_number, 
            week: item.week_mark,
            arr: subArr,
        }

        resObj.push(tempObj);
        
    }
    
    return resObj;

}

module.exports = getShedule;