'use strict';

var Todo = require('../models/todo'),
  helpers = require('./helpers');

module.exports = {
  all: function*() {
    return helpers.Ok(yield Todo.all());
  },
  create: function*(query, params, body, req){
    var baseUrl = 'http://' + req.header.host + '/todos/';
    return helpers.Created(yield Todo.create(body, baseUrl));
  },
  update: function*(query, params, body){
    return helpers.Ok(yield Todo.update(params.id, body));
  },
  delete: function*(query, params){
    yield Todo.delete(params.id);
    return helpers.Ok({});
  },
  show: function*(query, params){
    var todo =  yield Todo.find(params.id);
    if (todo) {
      return helpers.Ok(yield Todo.find(params.id));
    } else {
      return helpers.NotFound();
    }
  },
  deleteAll: function*(){
    yield Todo.deleteAll();
    return helpers.Ok();
  }
};
