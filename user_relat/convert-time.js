async function convertTime(){
    const date = new Date();

    const hours = date.getHours();
    const hoursStr = hours.toString().padStart(2, '0');

    const minutes = date.getMinutes();
    const minutesStr = minutes.toString().padStart(2, '0');

    const seconds = date.getSeconds();
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

module.exports = convertTime;