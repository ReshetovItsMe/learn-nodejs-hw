const stdin = process.stdin;
stdin.resume();
stdin.setEncoding('utf8');

process.stdout.write('Use ctrl+d to close app. \nType something... \n');
stdin.on('data', (key) => {
    if (key && key.ctrl && key.name == 'd') {
        process.exit();
    }

    process.stdout.write(`${key.split('').reverse().join('')}\n`);
});