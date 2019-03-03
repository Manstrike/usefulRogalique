const ejs = require('ejs');
const fs = require('fs');

class Printer{
    constructor(data){
        this.data = data;
    }

    async printList(){
        const obj = this.data;
        console.dir(obj);
        const fileList = await ejs.renderFile('./ejs/print-list.ejs',{ obj });

        fs.writeFileSync('./test.html', fileList);

        return fileList;
    }

}

module.exports = Printer;