const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const Excel = require('exceljs');
const env = require('./queries/env-db');
const userReg = require('./queries/set-user');
const userGet = require('./queries/get-user.js');
const getShed = require('./queries/get-shedule.js');
const getDailyShed = require('./queries/get-shedule-by-day.js');
const vizualizeShed = require('./user-relat/vis_shed.js');
const file = 'Sheduler.xlsx';

const token  = env.bot_token;
const bot = new TelegramBot(token,{polling:true});

/*
Passed
 */

async function registration(msg,match){
    const res = await userReg(msg,match);
    console.log(res);
   
    return true;
};

/*
Passed
*/

async function checkUser(msg){
    const res = await userGet(msg);
    
    return res;
};

/*
Passed
*/

async function getShedule(msg){
    const res = await getShed({msg: msg});
    
    if(res){
        return res;
    }
    
    return false;
};

/*
Passed
*/

async function getDailyShedule(msg){
    const res = await getDailyShed(msg);
   
    if(res){
        return res;
    }
    
    return false;
}

async function visualizeShedule(msg){
    const res = await vizualizeShed(msg);


}


async function initBot(){
    const msg = {
        date: 1545998946,
        chat: {
            id: 204521174,
            first_name: 'Alex',
            username: 'AlexDark',
        },
        from: {
            id: 204521174,
            first_name: 'Alex',
            username: 'AlexDark',
        },
        text: 'registration',
    };
    const match = [
        ``,
        `4`,
    ];

    const checkRes = await getDailyShedule(msg);
    console.log(checkRes);
}
initBot();