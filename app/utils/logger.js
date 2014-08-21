var bunyan = require('bunyan');

var config = {name: 'service'};

module.exports = bunyan.createLogger(config);
