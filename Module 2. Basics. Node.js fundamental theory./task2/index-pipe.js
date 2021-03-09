const csv = require('csvtojson');
const fs = require('fs');
const byline = require('byline');

const inputFilePath = process.argv[2]; // input file from npm task argument
const outputFilePath = process.argv[3]; // input file from npm task argument

const readStream = fs.createReadStream(inputFilePath).pipe(csv());
const lineReadStream = byline.createStream(readStream)
const writeStream = fs.createWriteStream(outputFilePath);

readStream.on('error', (err) => {
  console.log('Error in read stream...', err);
});
writeStream.on('error', (err) => {
  console.log('Error in write stream...', err);
});

lineReadStream.pipe(writeStream);
