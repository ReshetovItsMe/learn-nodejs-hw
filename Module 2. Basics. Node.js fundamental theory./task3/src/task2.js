import csv from 'csvtojson';
import fs from 'fs';

const inputFilePath = process.argv[2]; // input file from npm task argument
const outputFilePath = process.argv[3]; // input file from npm task argument

const writeStream = fs.createWriteStream(outputFilePath);
const readStream = fs.createReadStream(inputFilePath);

readStream.on('error', (err) => {
  console.log('Error in read stream...', err);
});
writeStream.on('error', (err) => {
  console.log('Error in write stream...', err);
});

readStream.pipe(csv()).pipe(writeStream);