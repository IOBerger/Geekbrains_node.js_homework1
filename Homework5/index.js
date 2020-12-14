var tasks = require('./models/tasks.js');
// const mysql2 = require('mysql2');
var readline = require('readline');

// const options = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "",
//     database: "homework_node",
// }

// const pool = mysql2.createPool(options).promise();

var rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});
let str_mass = [];
let text = '';
console.log('Please type instruction or quit');
rl.on('line', function(answer) {
    if (answer == 'quit') {
        console.log('quit');
        rl.close();
        //pool.end();   
        //ПОЧЕМУ ПОСЛЕ ВВОДА QUIT не закрывается приложение?
        return;
    }
    str_mass = answer.split(' ');
    switch (str_mass[0]) {
        case 'list':
            tasks.list();
            break;
        case 'add':
            for (let i = 1; i < str_mass.length; i++) {
                text += str_mass[i];
                text += ' ';
            }
            tasks.add(text);
            break;
        case 'change':
            for (let i = 2; i < str_mass.length; i++) {
                text += str_mass[i];
                text += ' ';
            }
            if (str_mass[1])
                tasks.change(Number(str_mass[1]), text);
            else
                console.log('Error: no needed aruments');
            break;
        case 'complete':
            if (str_mass[1])
                tasks.complete(Number(str_mass[1]));
            else
                console.log('Error: no needed aruments');
            break;
        case 'delete':
            if (str_mass[1])
                tasks.delete(Number(str_mass[1]));
            else
                console.log('Error: no needed aruments');

            break;

        default:
            console.log('Uncorrect input');
    }
});


// rl.on('close', pool.end);


// pool.query('select * from todo')
//     .then(([data, fields]) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//     .finally(() => {
//         pool.end();
//     });