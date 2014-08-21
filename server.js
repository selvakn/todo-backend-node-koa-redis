'use strict';

var koa = require('koa'),
  router = require('koa-router'),
  cors = require('koa-cors'),
  json = require('koa-json'),
  errorHandler = require('koa-onerror'),
  bodyParser = require('koa-body')(),
  app = koa(),
  routes = new router();


function render(controller, action) {
  var method = require('./app/controllers/' + controller)[action];
  return function*() {
    var response = yield method(this.query, this.params, this.request.body, this.request);
    this.body = response[1];
    this.status = response[0];
  };
}


/* routes start */

routes.get(  '/todos',                     render('todos',     'all'));
routes.post( '/todos',        bodyParser,  render('todos',     'create'));
routes.get(  '/todos/:id',                 render('todos',     'show'));
routes.del(  '/todos/:id',                 render('todos',     'delete'));
routes.patch('/todos/:id',    bodyParser,  render('todos',     'update'));
routes.del(  '/todos',                     render('todos',     'deleteAll'));

/* routes end */


app.use(require('./app/middlewares/request_logger')());
app.use(json());
app.use(cors({methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']}));
app.use(routes.middleware());

errorHandler(app);

app.listen(Number(process.env.PORT || 9000));
