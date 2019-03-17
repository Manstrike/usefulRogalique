const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const getUser = require('./queries/get-user');
const setUser = require('./queries/set-user');
const schedConvert2pdf = require('./user_relat/sched-convert2pdf');
const addAlert = require('./queries/add-alert');
const deleteAlert = require('./queries/delete-alert');
const CronJob = require('cron').CronJob;
const getAllUsers = require('./queries/get-all-users');
const convertTime = require('./user_relat/convert-time');
const getSheduleByDay = require('./queries/get-shedule-by-day');
const moment = require("moment");
const convertDate = require('./user_relat/convert-date');
const setMark = require('./queries/set-mark');
require('dotenv').config();



const token  = process.env.TOKEN;
const bot = new TelegramBot(token,{polling:true});

async function botInit(){
    bot.onText(/\/start/, async (msg) =>{
        const user = await getUser(msg.chat.id);
        if(user[0] && user[0].chatID){
            await bot.sendMessage(msg.chat.id,`Даров, ${user[0].name}`);
        }
        else{
            await bot.sendMessage(msg.chat.id,`Похоже, мы с Вами еще не знакомы. Я - Рогалик. Полезный Рогалик.
                                    Чтобы продолжить, введите команду /reg и код вашей группы.
                                    Например, /reg ГГ123`);
        }
    });

    bot.onText(/\/reg (.+)/, async (msg, match) =>{
        const checkUser = await getUser(msg.chat.id);
        if(checkUser[0] && checkUser[0].chatID){
            await bot.sendMessage(msg.chat.id,`Кажется, вы уже в базе.`);
        }else{
            const tryReg = await setUser(msg, match);
            if(tryReg){
                await bot.sendMessage(msg.chat.id,`Успешно!`);
            }
        }
    });

    bot.onText(/\/review/, async (msg) =>{
        const schedule = await schedConvert2pdf(msg);
        if(schedule){
            const fileOptions = {
                filename: `Расписание`,
            }
            await bot.sendDocument(msg.chat.id,schedule,{},fileOptions);
        }else{
            await bot.sendMessage(msg.chat.id, `Неудачно`);
        }
    });

    bot.onText(/\/time (.+)/, async (msg,match)=>{
        const setTime = await addAlert(msg.chat.id, match[1]);
        if(setTime){
            await bot.sendMessage(msg.chat.id, `Установлено время оповещения: ${match[1]}`);
        }else{
            await bot.sendMessage(msg.chat.id, `Oops! Неудачно(`);
        }
    });

    bot.onText(/\/off/, async (msg) =>{
        const off = await deleteAlert(msg.chat.id);
        if(off){
            await bot.sendMessage(msg.chat.id, `Подписка на рассылку отменена.`);
        }else{
            await bot.sendMessage(msg.chat.id, `Что-то пошло не так, возможно, вы не были подписаны..`);
        }
    });

    const alert = await alertUsers();
}

async function alertUsers(){
    const userBase = await getAllUsers();
    console.dir(userBase[0]);
    const job = new CronJob('* * * * * *', async()=>{
        const currTime = await convertTime();
        console.log(currTime);
        for (const user of userBase) {
            if(currTime === user.notif_config){
                const currDay = moment().weekday();
                const dailySched = await getSheduleByDay({day: currDay, chatId: user.chatID});
                await bot.sendMessage(user.chatID, `${dailySched[0]}`);
                const currDate = await convertDate();
                const lastSend = `${currDate} ${currTime}`;
                const res = await setMark(user.chatID, lastSend);
            }
        }
        
    });
    await job.start();
    return;
}

botInit();



http.createServer(async(request, response)=>{
     
    response.end("Hello world!");
}).listen(process.env.PORT || 8080);