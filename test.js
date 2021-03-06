const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const Excel = require('exceljs');
const env = require('./queries/env-db');
const userReg = require('./queries/set-user');
const userGet = require('./queries/get-user.js');
const getShed = require('./queries/get-shedule.js');
const getDailyShed = require('./queries/get-shedule-by-day.js');
const vizualizeShed = require('./user_relat/vis-shed.js');
const Printer = require('./classes/printer.js');
const getUserConfig = require('./queries/add-alert.js');
const setMark = require('./queries/set-mark');
const convertDate = require('./user_relat/convert-date');
const convertTime = require('./user_relat/convert-time');
const CronJob = require('cron').CronJob;
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

/*
 Passed
 */

 async function visualizeShedule(msg){
    const res = await vizualizeShed(msg);
    const print = new Printer(res);

    return print.printList();
}

/*
Passed
*/

async function configTime(msg){
    //const res = await userGet(msg);
    const res={
        notif_config: '01:03:00',
    }
    const job = new CronJob('* * * * * *', async()=>{
        const currTime = await convertTime();

        if(currTime === res.notif_config){
            console.log('ALERT');
            const currDate = await convertDate();
            const lastSend = `${currDate} ${currTime}`;
            const res = await setMark(msg.chat.id, lastSend);
        }
    });
    await job.start();

    return res;
}


async function testDate(){
    const date = await getDailyShed({day:4, chatId: 204521174 });
    return date;
    
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

    const checkRes = await testDate();
    console.dir(checkRes);
}
initBot();