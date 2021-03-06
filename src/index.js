const _ = require('koa-route');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Todo = require('../schemas/todo');
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
  if (todo._id) ctx.body = 'connection success'

}));

app.use(_.del('/todos/:id', async (ctx, id) => {
  const _id = id;
  const todo = await Todo.findOne({_id});
  if (todo === null || todo.isNotDone()) {
    ctx.status = 400;
    return;
  }
  const res = await Todo.deleteOne({_id});
  ctx.status = 204;

}));

app.use(_.put("/todos", async (ctx) => {
  const {_id, title} = ctx.request.body.data;
  const todo = await Todo.findOne({_id});
  todo.title = title;
  ctx.body = await todo.save();
}));

app.listen(3030);
