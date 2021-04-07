import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const question = () => rl.question('Please, write some words \n', (answer) => {
    console.log(`${answer.split('').reverse().join('')}\n`);
    question();
});

question();