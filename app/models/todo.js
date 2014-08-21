'use strict';

var db = require('../utils/db'), util = require('util');

function dbKey(id){
  return 'todo:' + id;
}

function deserialize(todo){
  return JSON.parse(todo);
}

function serialize(todo){
  return JSON.stringify(todo);
}

module.exports = {
  all: function*() {
    var keys = yield db.keys(dbKey('*'));

    return (yield keys.map(function(k){
        return db.get(k);
    })).map(deserialize);
  },

  create: function*(params, baseUrl) {
    var id = yield db.incr('todo-count');

    params.id = id;
    params.completed = false;
    params.url = baseUrl + id;

    yield db.set(dbKey(id), serialize(params));
    return params;
  },

  find: function*(id){
    return deserialize(yield db.get(dbKey(id)));
  },

  update: function*(id, params) {
    var todo = yield this.find(id);
    util._extend(todo, params);
    yield db.set(dbKey(id), serialize(todo));
    return todo;
  },

  delete: function*(id) {
    yield db.del(dbKey(id));
  },

  deleteAll: function*(){
    var keys = yield db.keys(dbKey('*'));

    yield keys.map(function(k){
        return db.del(k);
    });
  }
};
