var moment = require('moment'); // require
let now = moment();
console.log(now);
now = moment().format();
console.log(now);
now = moment()
    .add(7, 'days')
    .subtract(1, 'months')
    .year(2009)
    .hours(0)
    .minutes(0)
    .seconds(0);
console.log(now);