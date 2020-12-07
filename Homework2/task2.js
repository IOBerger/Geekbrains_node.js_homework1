'use strict';

let file = 'log.txt';
try {
    var argv = require('minimist')(process.argv.slice(2));
    //console.dir(argv);
    if (argv._[0]) file = argv._[0];
} catch (err) {
    console.log(err);
    //file = 'log.txt';
}

const { ENETUNREACH } = require('constants');
var fs = require('fs');


var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});
let rightAnswer = 0;
console.log('Please type 1 or 2 or quit');
rl.on('line', function(answer) {
    if (answer == 'quit') {
        console.log('quit');
        rl.close();
        return;
    }
    rightAnswer = Math.ceil(2 * Math.random());
    if (answer !== '1' && answer !== '2') {
        console.log('You should type only 1 or 2!');
    } else {
        if (answer == rightAnswer) {
            console.log('You win!');
            fs.appendFile(file, "Win\n", err => { if (err) throw err; });
        } else {
            console.log('You lose!');
            fs.appendFile(file, "Lose\n", err => { if (err) throw err; });
        }
    }
    console.log('Right answer was ' + rightAnswer);

});

//}