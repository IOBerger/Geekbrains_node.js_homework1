'use strict';

var argv = require('minimist')(process.argv.slice(2));
//console.dir(argv);
let file = argv._[0];
// var fs = require('fs');
// fs.readFile(file, function (err, data) {
//     if (err) throw err;
//     console.log(data.toString());
//     });

//Я НЕ ЗНАЮ КАК РАЗБИРАТЬ СПРОШЛОЙ ТЕКСТ ПОЭТОМУ УСТАНОВИЛА ЛАЙН БАЙ ЛАЙН
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(file);
let numberWins = 0;
let numberLoses = 0;
lr.on('line', function(line) {
    // 'line' contains the current line without the trailing newline character.
    if (line === 'Win\n')
        numberWins++;
    if (line === 'Lose\n')
        numberLoses++;
    console.log(line);
    console.log(numberWins);
    console.log(numberLoses);
    //ПОЧЕМУ ВЫДАЁТ 0??????!!!!!
});
console.log('Number of wins ' + numberWins);
console.log('Number of loses ' + numberLoses);
if (numberLoses != 0)
    console.log('Wins/Loses==' + numberWins / numberLoses);
//ЧТО С ЭТИМ ДЕЛАТЬ ЕСЛИ КОЛБЭК ЕЩЁ НЕ ВЫПОЛНИЛСЯ АСИНХРОННО!!!!