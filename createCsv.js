const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    header: ['title', 'links', 'phones', 'adresses'],
    path: './file.csv'
});
 
// csvWriter.writeRecords(records)       // returns a promise
//     .then(() => {
//         console.log('...Done');
//     });

const createCsv = async (data) => {
    await csvWriter.writeRecords(data);
    console.log('...Done');
}

module.exports = createCsv;