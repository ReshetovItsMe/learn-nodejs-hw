const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const inputFilePath = process.argv[2]; // input file from npm task argument
const outputFilePath = process.argv[3]; // input file from npm task argument

const readStream = fs.createReadStream(inputFilePath, { highWaterMark: 32 });
const writeStream = fs.createWriteStream(outputFilePath);

pipeline(readStream, csv(), writeStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  })