'use strict';

var logger = require('../utils/logger');

module.exports = function () {
  return function *(next) {
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    logger.info('%s %s - took: %s', this.method, this.url, ms);
  };
};
