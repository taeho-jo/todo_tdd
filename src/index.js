const _ = require('koa-route');
const Koa = require('koa');
const app = new Koa();

const Todo = require('../schemas/todo');
const bodyParser = require('koa-bodyparser');


app.use(bodyParser());

app.use(_.get('/hello', (ctx) => {
  ctx.body = "Hello world!"
}));

app.use(_.post('/todos', async (ctx) => {
  const todo = new Todo(ctx.request.body);
  const saved = await todo.save();
  ctx.body = saved._doc;
  ctx.status = 201;
}));

app.use(_.get('/todos/:id', async (ctx, id) => {
  const todo = await Todo.findOne({_id: id});
  todo.title = "TDD 공부하기";

  ctx.body = todo;
}));

app.use(_.get('/todos', async (ctx) => {
  const todo = new Todo();
  if (todo._id) {
    ctx.body = 'connection success'
  }
}));

app.use(_.del('/todos', async (ctx) => {
  const {_id} = ctx.request.query;
  const res = await Todo.deleteOne({_id});
  if (res.deletedCount > 0) ctx.body = "delete success";
  else ctx.body = 'delete fail'
}));

app.use(_.put("/todos", async (ctx) => {
  const {_id, title} = ctx.request.body.data;
  const todo = await Todo.findOne({_id});
  todo.title = title;
  ctx.body = await todo.save();
}));

app.listen(3030);
