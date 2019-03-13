const TelegramBot = require('node-telegram-bot-api');
const env = require('./queries/env-db');
const getUser = require('./queries/get-user');
const setUser = require('./queries/set-user');
const schedConvert2pdf = require('./user_relat/sched-convert2pdf');



const token  = env.bot_token;
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
    })
}

botInit();