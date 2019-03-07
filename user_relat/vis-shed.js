const getShed = require('../queries/get-shedule.js');

/**
 * 
 * @param {Object} msg User msg for identification.
 * @returns {Array} Structurised array with shcedule
 */

async function sheduleRepair(msg){
    this.msg = msg;
    const shedule = await getShed({msg: msg});
    const structure = [];

    const result =[];
    
    const days = new Set(shedule.map(d => d.day));
    for (const item of days) {
        const arr = [];
        const temper = shedule
            .filter(b => b.day === item)
        for (const obj of temper) {
            arr.push({number: obj.l_num, week: obj.week, act: obj.arr});
        }
        structure.push({day: item, activ: arr});
    }
    //console.dir(structure, {depth: 3});

    for (const dayOrig of structure) {
        
        const temp =[];

        let day = [...dayOrig.activ];
        //console.log(day);
        while(day.length > 0){
            const lesson = day[0].number;
            
            const activities = day
                .filter( a => a.number === lesson)
                .sort((a1, a2) => a1.week - a2.week)
                .map(a=> {
                    return {
                        name: a.act,
                        isEvenWeek: a.week === 0,
                    };
                });

                temp.push({lesson, activities});

                day = day.filter(a => a.number !== lesson);
        };
        result.push(temp);
    };


    //console.dir(result,{depth: Number.POSITIVE_INFINITY});

    return result;
}


module.exports = sheduleRepair;
