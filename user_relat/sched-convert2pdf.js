const visShed = require('./vis-shed');
const Html2Pdf = require('../classes/html2Pdf');
const Printer = require('../classes/printer');



 async function visualizeShedule(msg){
    const res = await visShed(msg);

    const print = new Printer(res);
    const data = await print.printList();

    const pdf = await generatePDF(data);

    return pdf;
}

async function generatePDF(file){
    const pdf = await Html2Pdf.render({
        html: file,
        url: 'http://0.0.0.0:3000'
    }, {
        format: 'A4'
    });
    return pdf;
}

module.exports = visualizeShedule;