const convertTime = require('./convert-time');

async function convertDate(){
    const date = new Date();
    const res = [date.getFullYear(),date.getMonth()+1, date.getDate()].map(String)
                                                                   .map(s=> s.padStart(2,'0'))
                                                                   .join('-');
    const currTime = await convertTime();


    return `${res} ${currTime}`;
}

module.exports = convertDate;