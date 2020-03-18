const moment = require('moment');
const secs = 300;

const formatted = moment.utc(secs * 1000).format('mm:ss');
console.log(formatted);
