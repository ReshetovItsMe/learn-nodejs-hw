import csv from 'csvtojson';
import readline from 'readline';
import fs from 'fs';

const inputFilePath = process.argv[2]; // input file from npm task argument
const outputFilePath = process.argv[3]; // input file from npm task argument

const readStream = fs.createReadStream(inputFilePath).pipe(csv());
const writeStream = fs.createWriteStream(outputFilePath)
readStream.on('error', (err) => {
  console.log('Error in read stream...', err);
});
writeStream.on('error', (err) => {
  console.log('Error in write stream...', err);
});

const rl = readline.createInterface({
  input: readStream
});

rl.on('line', (line) => {
  writeStream.write(`${line}\n`);
});

rl.on('close', () => {
  writeStream.close()
})