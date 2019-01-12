let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'data/Vocabulary - Sheet1.csv'; 
let fileOutputName = 'data/json/vocab.json';
 
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);