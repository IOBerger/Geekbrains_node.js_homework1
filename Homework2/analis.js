'use strict';

// var argv = require('minimist')(process.argv.slice(2));
// //console.dir(argv);
// let file = argv._[0];
// // var fs = require('fs');
// // fs.readFile(file, function (err, data) {
// //     if (err) throw err;
// //     console.log(data.toString());
// //     });
let file = 'log.txt';
try {
    var argv = require('minimist')(process.argv.slice(2));
    //console.dir(argv);
    if (argv._[0]) file = argv._[0];
} catch (err) {
    console.log(err);
    //file = 'log.txt';
}

//Я НЕ ЗНАЮ КАК РАЗБИРАТЬ СПРОШЛОЙ ТЕКСТ ПОЭТОМУ УСТАНОВИЛА ЛАЙН БАЙ ЛАЙН
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(file);
let numberWins = 0;
let numberLoses = 0;
lr.on('line', function(line) {
    // 'line' contains the current line without the trailing newline character.
    if (line === 'Win')
        numberWins++;
    if (line === 'Lose')
        numberLoses++;
    // console.log(line);
    // console.log(numberWins);
    // console.log(numberLoses);
    //ПОЧЕМУ ВЫДАЁТ 0??????!!!!!
});
lr.on('end', function() {
    // All lines are read, file is closed now.
    console.log('Number of wins ' + numberWins);
    console.log('Number of loses ' + numberLoses);
    if (numberLoses != 0)
        console.log('Wins/Loses==' + numberWins / numberLoses);
});