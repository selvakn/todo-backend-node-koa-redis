'use strict';

var redis = require('redis'),
  wrapper = require('co-redis');

var db = wrapper(redis.createClient(6379, '127.0.0.1', {}));

module.exports = db;
