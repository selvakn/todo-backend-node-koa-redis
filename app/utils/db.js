'use strict';

var redis = require('redis'),
  wrapper = require('co-redis'),
  url = require('url');

var client;

if(process.env.REDISCLOUD_URL) {
  var redisURL = url.parse(process.env.REDISCLOUD_URL);
  client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  client.auth(redisURL.auth.split(":")[1]);
} else {
  client = redis.createClient(6379, '127.0.0.1', {})
}

module.exports = wrapper(client);

