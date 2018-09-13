const fs = require('fs');
const path = require('path');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

module.exports = require('morgan')('combined', { stream: accessLogStream});