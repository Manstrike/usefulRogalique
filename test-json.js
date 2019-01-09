const shed = require('./queries/get-shedule.js');
const fs = require('fs');

async function testJSON(msg){
    const shedule = await shed({msg:msg});

    const counter = new Set(shedule.map((i=>i.day)));

    var tableRes = {
        user: msg.chat.username,
        sheduler:[]
    }


    for (const item of counter) {
         const day = shedule.map(d=>{
            if(d.day === item) return [d.l_num, d.week, d.arr];
        });

        const reducedDay = day.filter(r=>{
            if(r != undefined) return r;
        });

        for (const lesson of reducedDay) { 
            var temp ={ };
            const lessT = ["четная", "нечетная", "все"];
            temp.less_number = lesson[0];
            
            if(lesson[1] === 1){
                temp.week_type = lessT[0];
            }else if(lesson[1] === 0){
                temp.week_type = lessT[1];
            }else{
                temp.week_type = lessT[2];
            }

            temp.subs = {
                subject: lesson[2][0],
                teacher: lesson[2][1],
                room: lesson[2][2],
                building: lesson[2][3],
                type: lesson[2][4]
            }
            tableRes.sheduler.push(temp);

        }
        

        
    }
    const json = JSON.stringify(tableRes,null, "\t");
    await fs.writeFile('user_shedule.json',json,'utf8',async ()=>{});       
        
}




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

testJSON(msg);