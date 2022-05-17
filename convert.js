const csvToJson = require('convert-csv-to-json');
 
const input = './database.csv'; 
const output = './public/earthquake-data.json';
 
csvToJson.fieldDelimiter(',')
         .formatValueByType()
         .generateJsonFileFromCsv(input, output);