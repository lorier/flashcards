let csvToJson = require('convert-csv-to-json');
 
let fileOneInputName = 'data/Vocabulary - UnitOne.csv'; 
let fileOneOutputName = 'data/json/unitone.json';

let fileTwoInputName = 'data/Vocabulary - UnitTwo.csv'; 
let fileTwoOutputName = 'data/json/unittwo.json';
 
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileOneInputName,fileOneOutputName);
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileTwoInputName, fileTwoOutputName);