const getShed = require('../queries/get-shedule.js')

async function sheduleRepair(msg){
    
    const shedule = await getShed({msg: msg});
    const structure = [];

    const days


    for (const dayOrig of shedule) {
        
        const temp = [];
        let day = dayOrig;
        console.log(day);
        while(day.length > 0){
            const lesson = day[0].l_num;
            
            const activities = day
                .filter( a => a.l_num === lesson)
                .sort((a1, a2) => a1.week - a2.week)
                .map(a=> {
                    return {
                        name: a.arr,
                        isEvenWeek: a.week === 0,
                    };
                });

                temp.push({lesson, activities});

                day = day.filter(a => a.l_num !== lesson);
        };
        structure.push(temp);
    };

   

   console.log(structure);

    return structure;
}

async function init(){
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
    const res = await sheduleRepair(msg);

};

init();
