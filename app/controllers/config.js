'use strict';

var helpers = require('./helpers');

module.exports = {
  show: function*() {
    return helpers.Ok(require('config'));
  }
};